# Introduction

This tutorial repo contains the steps and necessary code to swap on BuildBear Lifi Plugin with lifi aggregator as well as configurations to intiate a cross chain bridge using similar steps.

You will learn to:

- Install & configure LiFi Plugin on BuildBear Sandbox
- Call LiFi Plugin API URL to get swap/bridge quotes
- Use quote results to populate a transaction
- Send transaction to initiate a swap/bridge on BuildBear with LiFi Plugin

# Installation & Executing the script

Clone the repository, install the required dependencie, and run the script

```bash
git clone https://github.com/JustUzair/buildbear-lifi-tutorial.git
cd buildbear-lifi-tutorial
npm i
npm start
```

## Environment Variable

Any one of the below variables need to be defined:

```bash
PRIVATE_KEY=
MNEMONIC=""
```

If script is setup correctly, and all environment variables are setup correctly, an output similar to the ones below can be observed

```bash
$ npm start

> start
> npx tsx src/index.ts

=============LIFI QUOTE===============
{
  type: 'lifi',
  id: '287e0eff-fb5d-4c87-b3f6-5ec4fe5514e6:0',
  tool: 'lifidexaggregator',
  toolDetails: {
    key: 'lifidexaggregator',
    name: 'LI.FI DEX Aggregator',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/exchanges/lifidexaggregator.svg'
  },
  action: {
    fromToken: {
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      chainId: 137,
      symbol: 'DAI',
      decimals: 18,
      name: '(PoS) DAI Stablecoin',
      coinKey: 'DAI',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
      priceUSD: '1'
    },
    fromAmount: '1000000000000000000',
    toToken: {
      address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      chainId: 137,
      symbol: 'USDC',
      decimals: 6,
      name: 'USD Coin',
      coinKey: 'USDC',
      logoURI: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
      priceUSD: '0.9997000899730081'
    },
    fromChainId: 137,
    toChainId: 137,
    slippage: 0.005,
    fromAddress: '0x1308cA04d6E6243F65D73101B5a23BB6Fb587233',
    toAddress: '0x1308cA04d6E6243F65D73101B5a23BB6Fb587233'
  },
  estimate: {
    tool: 'lifidexaggregator',
    approvalAddress: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE',
    toAmountMin: '995123',
    toAmount: '1000124',
    fromAmount: '1000000000000000000',
    feeCosts: [],
    gasCosts: [ [Object] ],
    executionDuration: 30,
    fromAmountUSD: '1.0000',
    toAmountUSD: '0.9998'
  },
  includedSteps: [
    {
      id: 'f2e32f84-2678-4bf4-87b9-43c9128a517c',
      type: 'swap',
      action: [Object],
      estimate: [Object],
      tool: 'lifidexaggregator',
      toolDetails: [Object]
    }
  ],
  integrator: 'lifi-api',
  transactionRequest: {
    value: '0x0',
    to: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE',
    data: '0x4666fc804ec8d8114c285c2422176cbff7e80d8eedcf10ff9b07a700f02f415ddd5daff200000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000001308ca04d6e6243f65d73101b5a23bb6fb58723300000000000000000000000000000000000000000000000000000000000f2f33000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000086c6966692d617069000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a307830303030303030303030303030303030303030303030303030303030303030303030303030303030000000000000000000000000000000000000000000000000000000000000000000006140b987d6b51fd75b66c3b07733beb5167c42fc0000000000000000000000006140b987d6b51fd75b66c3b07733beb5167c42fc0000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a0630000000000000000000000003c499c542cef5e3811e1192ce70d8cc03d5c33590000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001442646478b0000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a0630000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000003c499c542cef5e3811e1192ce70d8cc03d5c335900000000000000000000000000000000000000000000000000000000000f2f330000000000000000000000001231deb6f5749ef6ce6943a275a1d3e7486f4eae00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000042028f3cf7ad23cd3cadbd9735aff958023239c6a06301ffff01bc8f3da0bd42e1f2509cd8671ce7c7e5f7fd39c8001231deb6f5749ef6ce6943a275a1d3e7486f4eae00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    chainId: 137,
    gasPrice: '0x6fe5ea3ea',
    gasLimit: '0x9e1c8',
    from: '0x1308cA04d6E6243F65D73101B5a23BB6Fb587233'
  }
}
====================================
Approval Transaction Sent! Hash: 0xbfd2dd308993fcaf790fb91a3d28a39eee697398e0169a09aeb508b745f70ea3
Waiting for confirmation...
Transaction Confirmed!
LiFi Aggregator/Bridging Transaction Sent! Hash: 0xcc78b9adc819132e64a93bb21bd6519e4241630163964ca674b8819ee27991c7
Waiting for confirmation...
Transaction Confirmed!
✅ DONE!
```
