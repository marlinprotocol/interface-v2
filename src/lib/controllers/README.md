# Overview guide for `controllers`

## 🕹️ What are controllers?

Controllers are the modules that are responsible for communicating with the outside world. Any form of communication which makes the application dynamic for the user, for example fetching data from the subgraph, or the blockchain.

## 🏗️ Folder Structure

```bash
└── controllers/
    ├── contract/
    │   ├── bridge.ts
    │   ├── oyster.ts
    │   ├── receiverRewards.ts
    │   ├── receiverStaking.ts
    │   ├── token.ts
    │   └── usdc.ts
    ├── httpController.ts
    ├── subgraphController.ts
    ├── walletController.ts
    └── web3Controller.ts
```

## 📖 Description

- `contract/`: This folder contains all the modules that are responsible for communicating with the blockchain. Each contract has its own file, and each file has its own set of functions that are responsible for communicating with the contract. For example, `bridge.ts` has functions that are responsible for communicating with the bridge contract. Each function in these files is also responsible for showing the user a toast message if the transaction is successful or not.
- `httpController.ts`: This file contains all the modules that are responsible for communicating with the backend via HTTP requests. For example, `getProvidersNameJSON()` is a function that is responsible for fetching the names associated with provider addresses.
- `subgraphController.ts`: This file contains all the modules that are responsible for communicating with the subgraph. For example, `getOysterJobsFromSubgraph(address: Address)` is a function that is responsible for fetching oyster jobs created by a user from the subgraph. Each function in `subgraphController.ts` is also responsible for showing the user an error toast message if the call fails.
- `walletController.ts`: This file contains logic that drives the localalized state of the wallet i.e. the state of stores inside our application. For example, `createEthersProviderAndSigner(provider: EIP1193Provider)` is a function that is responsible for creating an ethers provider and signer when passed a provider.
- `web3OnboardController.ts`: This file contains all the logic associated with web3Onboard library we use to manage the users wallet connections.
