import "dotenv/config";
import { ethers, Interface, parseEther, parseUnits } from "ethers";
import axios from "axios";
import {
  maxUint256,
  defineChain,
  createPublicClient,
  http,
  erc20Abi,
} from "viem";

// BuildBear API Configuration
// # Note : Replace from-sandbox-id & to-sandbox-id with actual sandbox id from BuildBear
// # Note : from-sandbox-id is the sandbox id of the source chain
// # Note : to-sandbox-id is the sandbox id of the destination chain
const API_URL =
  "https://api.buildbear.io/{from-sandbox-id}/plugin/lifi/{to-sandbox-id}";
const RPC_URL = "https://rpc.dev.buildbear.io/shaky-wong-9d048597";
const SANDBOX_ID = "shaky-wong-9d048597"; // Replace with your sandbox id

const BBSandboxNetwork = /*#__PURE__*/ defineChain({
  id: 1, // IMPORTANT : replace this with your sandbox's chain id
  name: "BuildBear x Mainnet Sandbox", // name your network
  nativeCurrency: { name: "BBETH", symbol: "BBETH", decimals: 18 }, // native currency of forked network
  rpcUrls: {
    default: {
      http: [RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "BuildBear x Mainnet Scan", // block explorer for network
      url: `https://explorer.buildbear.io/${SANDBOX_ID}}`,
    },
  },
});

export const publicClient = createPublicClient({
  chain: BBSandboxNetwork,
  transport: http(RPC_URL), //@>>> Put in buildbear rpc
});

// Get a quote for your desired transfer
const getQuote = async (
  fromChain: string | number,
  toChain: string | number,
  fromToken: string,
  toToken: string,
  fromAmount: string,
  fromAddress: string
) => {
  try {
    const result = await axios.get(`https://li.quest/v1/quote`, {
      // const result = await axios.get(`${API_URL}/quote`, {
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
  transactionRequest: { to: string; data: string; gasLimit?: `0x${string}` },
  isApproval = false
) => {
  try {
    signer.connect(provider);

    const tx = await signer.sendTransaction(
      transactionRequest.gasLimit
        ? {
            to: transactionRequest.to,
            data: transactionRequest.data,
            gasLimit: parseInt(transactionRequest.gasLimit, 16).toString(),
          }
        : { to: transactionRequest.to, data: transactionRequest.data }
    );
    await tx.wait();

    console.log(
      `${
        isApproval ? "Approval" : "LiFi Aggregator/Bridging"
      } Transaction Sent!\n Hash: ${
        tx.hash
      }\n View on Explorer: https://explorer.dev.buildbear.io/${SANDBOX_ID}/tx/${
        tx.hash
      }`
    );
    console.log("Waiting for confirmation...");

    const receipt = await provider.getTransactionReceipt(tx.hash);
    console.log("Transaction Confirmed!");
    return receipt;
  } catch (error) {
    console.error("Transaction Error:", error);
    throw error;
  }
};

// Main Execution Flow
const run = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  // ----------- WETH Bridge Ethereum to Polygon -----------
  // const fromChain = 1; // Ethereum
  // const fromToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
  // const toChain = 137; // Polygon
  // const toToken = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; // WETH
  // const fromAmount = parseUnits(
  //   "1",
  //   await getTokenDecimals(fromToken)
  // ).toString();

  // ----------- Lifi aggregator swap DAI to USDC on Polygon -----------

  const fromChain = "ETH"; // Ethereum
  const fromToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC
  const toChain = "ETH"; // Ethereum
  const toToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
  const fromAmount = parseUnits(
    "100",
    await getTokenDecimals(fromToken)
  ).toString();
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

async function getTokenDecimals(tokenAddress: `0x${string}`): Promise<number> {
  let res = await publicClient.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
  });
  return res as number;
}

run().then(() => console.log("✅ DONE!"));
