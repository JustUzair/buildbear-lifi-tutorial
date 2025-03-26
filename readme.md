# Installation & Executing the script

Clone the repository, install the required dependencie, and run the script

```bash
npm i
npm start
```

## Environment Variable

```bash
PRIVATE_KEY=
```

If script is setup correctly, and all environment variables are setup correctly, an output similar to the ones below can be observed

```bash
$ npm start

> start
> npx tsx src/index.ts

=============LIFI QUOTE===============
{
  type: 'lifi',
  id: 'e5aa58b8-a564-481e-8d28-7488f4bf4ab2:0',
  tool: 'relay',
  toolDetails: {
    key: 'relay',
    name: 'Relay',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/bridges/relay.svg'
  },
  action: {
    fromToken: {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      chainId: 1,
      symbol: 'USDC',
      decimals: 6,
      name: 'USD Coin',
      coinKey: 'USDC',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
      priceUSD: '0.9998000399920016'
    },
    fromAmount: '10000000000',
    toToken: {
      address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      chainId: 137,
      symbol: 'USDC',
      decimals: 6,
      name: 'USD Coin',
      coinKey: 'USDC',
      logoURI: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
      priceUSD: '0.9998000399920016'
    },
    fromChainId: 1,
    toChainId: 137,
    slippage: 0.005,
    fromAddress: '0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341',
    toAddress: '0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341'
  },
  estimate: {
    tool: 'relay',
    approvalAddress: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE',
    toAmountMin: '9949999433',
    toAmount: '9999999430',
    fromAmount: '10000000000',
    feeCosts: [ [Object] ],
    gasCosts: [ [Object] ],
    executionDuration: 24,
    fromAmountUSD: '9998.0004',
    toAmountUSD: '9997.9998'
  },
  includedSteps: [
    {
      id: '7ef80221-c73e-44f0-9d91-649d509364f1',
      type: 'cross',
      action: [Object],
      estimate: [Object],
      tool: 'relay',
      toolDetails: [Object]
    }
  ],
  integrator: 'lifi-api',
  transactionRequest: {
    value: '0x0',
    to: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE',
    data: '0xae32859000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000200bec670deb174d28880fd6a4d63cf244737fa314cc60e6e830b4e69e29a5310ed000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000037305b1cd40574e4c5ce33f8e8306be057fd734100000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000000000008900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000572656c617900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086c6966692d617069000000000000000000000000000000000000000000000000b4d206da76d0c180d4d7edc6fbffc9d8c92a9ad7b605cc281f8a0a9872695b6c00000000000000000000000037305b1cd40574e4c5ce33f8e8306be057fd73410000000000000000000000003c499c542cef5e3811e1192ce70d8cc03d5c3359000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000418fcea72731dfaad54a7dde32c0e14595ec1f02695270ee84ae7495263a85c3315c003d5303b44346e4a279ba52087e606f3e120999187c2e78eaf873a96c96ca1c00000000000000000000000000000000000000000000000000000000000000',
    from: '0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341',
    chainId: 1,
    gasPrice: '0x1abb948c',
    gasLimit: '0x35b23'
  }
}
====================================

🔹 Approval Simulation Logs:

Event 1: Approval
  Address: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
  owner: "0x37305b1cd40574e4c5ce33f8e8306be057fd7341"
  spender: "0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae"
  value: "1000000000000000000000"

---------------------------------

🔹 Bridge Simulation Logs:

Event 1: Transfer
  Address: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
  from: "0x37305b1cd40574e4c5ce33f8e8306be057fd7341"
  to: "0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae"
  value: "10000000000"

---------------------------------
Event 2: Transfer
  Address: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
  from: "0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae"
  to: "0xf70da97812cb96acdf810712aa562db8dfa3dbef"
  value: "10000000000"

---------------------------------
Event 3: LiFiTransferStarted
  Address: 0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae
  bridgeData: {
  "transactionId": "0xad16d229e85a57e2e042ccb7cbd353bf63be1b22555bd8e49089840948edb247",
  "bridge": "relay",
  "integrator": "lifi-api",
  "referrer": "0x0000000000000000000000000000000000000000",
  "sendingAssetId": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "receiver": "0x37305b1cd40574e4c5ce33f8e8306be057fd7341",
  "minAmount": "10000000000",
  "destinationChainId": "137",
  "hasSourceSwaps": false,
  "hasDestinationCall": false
}

---------------------------------
```
