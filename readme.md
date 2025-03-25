# Installation & Executing the script

Clone the repository, install the required dependencie, and run the script

```bash
git clone https://github.com/JustUzair/buildbear-lifi-tutorial.git
npm i
npm start
```

## Environment Variable

```bash
PRIVATE_KEY=
TENDERLY_PROJECT =<PROJECT-NAME>
TENDERLY_ACCESS_KEY =<ACCESS-KEY>
TENDERLY_USER =<USERNAME>
```

If script is setup correctly, and all environment variables are setup correctly, an output similar to the ones below can be observed

```bash
$ npm start

> start
> npx tsx src/index.ts


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
  "transactionId": "0x4536c140a6f66712f18c74175eec385bf2c1cf267e15cf3de802bf0cfadcfd1e",
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
