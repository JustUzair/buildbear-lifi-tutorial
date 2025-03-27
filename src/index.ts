import "dotenv/config";
import { Interface, parseEther } from "ethers";
import axios from "axios";
import { writeFileSync } from "fs";
import { maxUint256 } from "viem";

// Tenderly API URL for simulation
const TENDERLY_API_URL = `https://api.tenderly.co/api/v1/account/${process.env.TENDERLY_USER}/project/${process.env.TENDERLY_PROJECT}/simulate-bundle`;

// Get a quote for your desired transfer
const getQuote = async (
  fromChain: any,
  toChain: any,
  fromToken: any,
  toToken: any,
  fromAmount: any,
  fromAddress: any
) => {
  try {
    const result = await axios.get(`https://li.quest/v1/quote`, {
      params: {
        fromChain,
        toChain,
        fromToken,
        toToken,
        fromAmount,
        fromAddress,
      },
    });
    return result.data;
  } catch (error: any) {
    console.error("LI.FI API Error Details:", {
      status: error.response?.status,
      data: error.response?.data,
      params: {
        fromChain,
        toChain,
        fromToken,
        toToken,
        fromAmount,
        fromAddress,
      },
    });
    throw error;
  }
};

const getTxSequence = async (
  transactionRequest: any
): Promise<{ from: any; to: any; input: any }[]> => {
  const fromChain = "ETH";
  const fromToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const toChain = "POL";
  const toToken = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
  const fromAmount = "10000000000";
  const fromAddress = "0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341";

  const quote = await getQuote(
    fromChain,
    toChain,
    fromToken,
    toToken,
    fromAmount,
    fromAddress
  );

  const encodeApprovalCallData = (spender: any, amount: any) => {
    const iface = new Interface([
      "function approve(address spender, uint256 amount)",
    ]);
    return iface.encodeFunctionData("approve", [spender, amount]);
  };

  return [
    {
      from: fromAddress,
      to: quote.action.fromToken.address,
      input: encodeApprovalCallData(
        quote.transactionRequest.to,
        parseEther("1000").toString()
      ),
    },
    {
      from: transactionRequest.from,
      to: transactionRequest.to,
      input: transactionRequest.data,
    },
  ];
};

const printEventLogs = (simulation: any, simulationName: string) => {
  console.log(`\n🔹 ${simulationName} Logs:\n`);

  simulation.transaction.transaction_info.call_trace.logs.forEach(
    (log: any, index: number) => {
      console.log(`Event ${index + 1}: ${log.name}`);
      console.log("  Address:", log.raw.address);
      log.inputs.forEach((input: any) => {
        console.log(
          `  ${input.soltype.name}: ${JSON.stringify(input.value, null, 2)}`
        );
      });
      console.log("\n---------------------------------");
    }
  );
};

// Simulate the transaction using Tenderly
const simulateTransaction = async (transactionRequest: any) => {
  try {
    const response = await axios.post(
      TENDERLY_API_URL,
      {
        simulations: (
          await getTxSequence(transactionRequest)
        ).map((transaction: any) => ({
          network_id: "1", // network to simulate on
          save: true,
          save_if_fails: true,
          simulation_type: "full",
          ...transaction,
        })),
      },
      {
        headers: {
          "X-Access-Key": process.env.TENDERLY_ACCESS_KEY,
        },
      }
    );

    const approvalSimulation = response.data.simulation_results[0];
    const bridgeSimulation = response.data.simulation_results[1];

    // Print event logs immediately
    printEventLogs(approvalSimulation, "Approval Simulation");
    printEventLogs(bridgeSimulation, "Bridge Simulation");
    return response.data;
  } catch (error: any) {
    console.error("Tenderly Simulation Error:", {
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

const run = async (quote: any) => {
  try {
    await simulateTransaction(quote.transactionRequest);
  } catch (error: any) {
    console.error("Error occurred:");
    console.error("Message:", error.message);
    console.error(error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Status:", error.response.status);
    }
  }
};

const fromChain = "ETH";
const fromToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const toChain = "POL";
const toToken = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
const fromAmount = "10000000000";
const fromAddress = "0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341";

const quote = await getQuote(
  fromChain,
  toChain,
  fromToken,
  toToken,
  fromAmount,
  fromAddress
);
await run(quote);
