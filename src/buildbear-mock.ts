import axios from "axios";
import { ethers, Interface } from "ethers";
import dotenv from "dotenv";
import { maxUint256 } from "viem";
dotenv.config();

// LI.FI API URL
const API_URL = "https://api.buildbear.io/{sandbox-id}/plugin/lifi";
const RPC_URL = "https://rpc.buildbear.io/{sandbox-id}";

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

    console.log("=============LiFi Quote=============");
    console.log(result.data);
    console.log("====================================");
    return result.data;
  } catch (err: any) {
    console.log("====================================");
    console.log(`🔴 ${err.message}`);
    console.log(err.data);
    console.log("====================================");
  }
};

// ERC20 Approve function selector and encoding
const encodeApprovalCallData = (spender: string, amount: string) => {
  const iface = new Interface([
    "function approve(address spender, uint256 amount)",
  ]);
  return iface.encodeFunctionData("approve", [spender, amount]);
};

const sendTransaction = async (transactionRequest: any, isApproval = false) => {
  const payload = {
    network_id: "1", // Use the appropriate network ID
    from: transactionRequest.from,
    to: transactionRequest.to,
    input: transactionRequest.data,
  };

  console.log(
    `============ ${
      isApproval ? "Approval" : "Bridge"
    } Tx Simulate Payload ============`
  );
  console.log(payload);
  console.log("===========================================");

  const response = await axios.post(RPC_URL, payload);

  return response.data;
};

const run = async () => {
  const provider = new ethers.JsonRpcProvider(
    "https://go.getblock.io/aefd01aa907c4805ba3c00a9e5b48c6b",
    1
  );
  const fromChain = "ETH";
  const fromToken = "USDC";
  const toChain = "POL";
  const toToken = "USDC";
  const fromAmount = "10000000000";
  const fromAddress = `0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341`;

  const quote = await getQuote(
    fromChain,
    toChain,
    fromToken,
    toToken,
    fromAmount,
    fromAddress
  );

  const approvalTxRequest = {
    from: fromAddress,
    to: quote.action.fromToken.address,
    data: encodeApprovalCallData(
      quote.transactionRequest.to,
      maxUint256.toString()
    ),
  };
  // Simulate approval transaction
  const approvalSimulation = await sendTransaction(approvalTxRequest, true);
  console.log("Approval Simulation Result:", approvalSimulation);

  const txResult = await sendTransaction(quote.transactionRequest, false);

  console.log("Transaction Result:", txResult);
};
run().then(() => {
  console.log("DONE!");
});
