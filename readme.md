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
  id: 'e40446a8-aaad-48dc-9a9b-4174c50b2d1a:0',
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
    toAmountMin: '9949999415',
    toAmount: '9999999412',
    fromAmount: '10000000000',
    feeCosts: [ [Object] ],
    gasCosts: [ [Object] ],
    executionDuration: 24,
    fromAmountUSD: '9998.0004',
    toAmountUSD: '9997.9998'
  },
  includedSteps: [
    {
      id: '31eed79c-d930-454b-bc5f-632c408804b8',
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
    data: '0xae32859000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000200a0365bdd79653ad5a0638708ae623fa4b806c835b3d76e772b64dde6038cde41000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000037305b1cd40574e4c5ce33f8e8306be057fd734100000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000000000008900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000572656c617900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086c6966692d6170690000000000000000000000000000000000000000000000007b3242a6cb51c5af29a45c950088a15470fb0a67623cb58b1f6050ce5c1dd77000000000000000000000000037305b1cd40574e4c5ce33f8e8306be057fd73410000000000000000000000003c499c542cef5e3811e1192ce70d8cc03d5c335900000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000041a15458e685af096b72fd8c49b5f040498b0da9e21d5772d59c2188a93314a9f31a72b749e2de121102573e3fd54b66262c85cff15fc642b66ce30981f97b759c1c00000000000000000000000000000000000000000000000000000000000000',
    from: '0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341',
    chainId: 1,
    gasPrice: '0x1a848057',
    gasLimit: '0x35b23'
  }
}
====================================
=============LIFI QUOTE===============
{
  type: 'lifi',
  id: '91228b69-0322-4d7b-8e16-26d3de6d7761:0',
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
    toAmountMin: '9949999417',
    toAmount: '9999999414',
    fromAmount: '10000000000',
    feeCosts: [ [Object] ],
    gasCosts: [ [Object] ],
    executionDuration: 24,
    fromAmountUSD: '9998.0004',
    toAmountUSD: '9997.9998'
  },
  includedSteps: [
    {
      id: '0b964633-ab06-443f-9d0c-4092ed56f8fe',
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
    data: '0xae32859000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000200509011842c40148a1901d67dfe9a4056b1209d41e1ea63984e41c298f00bc3f9000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000037305b1cd40574e4c5ce33f8e8306be057fd734100000000000000000000000000000000000000000000000000000002540be400000000000000000000000000000000000000000000000000000000000000008900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000572656c617900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086c6966692d617069000000000000000000000000000000000000000000000000141d330cfb3adebc2bba1e4f1e252d301f83fccf0fecd432ac564e4aee68be6b00000000000000000000000037305b1cd40574e4c5ce33f8e8306be057fd73410000000000000000000000003c499c542cef5e3811e1192ce70d8cc03d5c335900000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000041ca2efb8f760d4afc1b95598465ac4c2b3f02597123f195ebe8608f63e0d71e63110d3617988dcc4e181cd5f4e812eb552cb1037eae4059546553f8d9692c991c1c00000000000000000000000000000000000000000000000000000000000000',
    from: '0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341',
    chainId: 1,
    gasPrice: '0x1a848057',
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
  "transactionId": "0xa0365bdd79653ad5a0638708ae623fa4b806c835b3d76e772b64dde6038cde41",
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
