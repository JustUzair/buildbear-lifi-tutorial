import "dotenv/config";
import { ethers, Interface, parseEther } from "ethers";
import axios from "axios";
import { maxUint256 } from "viem";

// BuildBear API Configuration
// # Note : Replace from-sandbox-id & to-sandbox-id with actual sandbox id from BuildBear
// # Note : from-sandbox-id is the sandbox id of the source chain
// # Note : to-sandbox-id is the sandbox id of the destination chain
const API_URL =
  "https://api.buildbear.io/{from-sandbox-id}/plugin/lifi/{to-sandbox-id}";
const RPC_URL = "https://rpc.buildbear.io/{from-sandbox-id}";

// Get a quote for your desired transfer
const getQuote = async (
  fromChain: string,
  toChain: string,
  fromToken: string,
  toToken: string,
  fromAmount: string,
  fromAddress: string
) => {
  try {
    const result = await axios.get(`${API_URL}/quote`, {
      params: {
        fromChain,
        toChain,
        fromToken,
        toToken,
        fromAmount,
        fromAddress,
      },
    });
    console.log("=============LIFI QUOTE===============");
    console.log(result.data);
    console.log("====================================");
    return result.data;
  } catch (error: any) {
    console.error(
      "LI.FI API Error Details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Encode ERC20 Approval Transaction
const encodeApprovalCallData = (spender: string, amount: string) => {
  const iface = new Interface([
    "function approve(address spender, uint256 amount)",
  ]);
  return iface.encodeFunctionData("approve", [spender, amount]);
};

// Send and confirm transactions
const sendTransaction = async (
  provider: ethers.JsonRpcProvider,
  signer: ethers.Wallet,
  transactionRequest: { to: string; data: string; gasLimit: `0x${string}` },
  isApproval = false
) => {
  try {
    const tx = await signer.sendTransaction({
      to: transactionRequest.to,
      data: transactionRequest.data,
      gasLimit: parseInt(transactionRequest.gasLimit, 16).toString(),
    });

    console.log(`Transaction Sent! Hash: ${tx.hash}`);
    console.log("Waiting for confirmation...");

    const receipt = await provider.getTransactionReceipt(tx.hash);
    while (!receipt) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    console.log("Transaction Confirmed!");
    printEventLogs(receipt, isApproval);
    return receipt;
  } catch (error) {
    console.error("Transaction Error:", error);
    throw error;
  }
};

// Extract and log emitted events
const printEventLogs = (
  receipt: ethers.TransactionReceipt,
  isApproval: boolean
) => {
  console.log(`\n🔹 ${isApproval ? "Approval" : "Bridge"} Transaction Logs:\n`);

  const iface = new Interface([
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event LiFiTransferStarted(bytes32 transactionId, string bridge, string integrator, address referrer, address sendingAssetId, address receiver, uint256 minAmount, uint256 destinationChainId, bool hasSourceSwaps, bool hasDestinationCall)",
  ]);

  receipt.logs.forEach((log, index) => {
    try {
      const parsedLog = iface.parseLog(log);
      console.log(`Event ${index + 1}: ${parsedLog?.name}`);
      parsedLog?.args.forEach((arg, key) => {
        console.log(`  ${key}: ${arg.toString()}`);
      });
      console.log("---------------------------------");
    } catch (err) {
      console.log(`Unrecognized Log: ${JSON.stringify(log, null, 2)}`);
    }
  });
};

// Main Execution Flow
const run = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const fromChain = "ETH";
  const fromToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const toChain = "POL";
  const toToken = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
  const fromAmount = "10000000000";
  const fromAddress = signer.address;

  const quote = await getQuote(
    fromChain,
    toChain,
    fromToken,
    toToken,
    fromAmount,
    fromAddress
  );

  const approvalTxRequest = {
    to: quote.action.fromToken.address,
    data: encodeApprovalCallData(
      quote.transactionRequest.to,
      maxUint256.toString()
    ),
  };

  // Execute Approval Transaction
  await sendTransaction(provider, signer, approvalTxRequest, true);

  // Execute Bridging Transaction
  await sendTransaction(provider, signer, quote.transactionRequest, false);
};

run().then(() => console.log("✅ DONE!"));
