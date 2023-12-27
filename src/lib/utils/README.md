# Overview guide for `utils`

## 🕹️ What are utils?

Utils is an umbrella term that we use for modules that contain utilities and tools to make our code more structured, maintainable and re-usable. It contains modules that hold constants, services, helper functions and other modifiers that help us keep the code clean. We club them according to the problems they help solve.

## 🏗️ Folder Structure

```bash
└── utils/
    ├── abis/
    │   ├── bridge.ts
    │   ├── clusterRegistry.ts
    │   ├── erc20.ts
    │   ├── mpond.ts
    │   ├── oysterMarket.ts
    │   ├── receiverStaking.ts
    │   ├── rewardDelegators.ts
    │   └── stakeManager.ts
    ├── constants/
    │   ├── bridgeConstants.ts
    │   ├── constants.ts
    │   ├── messages.ts
    │   ├── oysterConstants.ts
    │   ├── regionNameConstants.ts
    │   ├── storeDefaults.ts
    │   ├── subgraphQueries.ts
    │   └── urls.ts
    ├── data-modifiers/
    │   ├── oysterModifiers.ts
    │   └── subgraphModifier.ts
    ├── helpers/
    │   ├── bridgeHelpers.ts
    │   ├── commonHelper.ts
    │   ├── componentHelper.ts
    │   ├── contractHelpers.ts
    │   ├── conversionHelper.ts
    │   ├── httpHelper.ts
    │   ├── networkHelper.ts
    │   └── oysterHelpers.ts
    └── services/
        ├── oysterServices.ts
        └── receiverRewardServices.ts
```

## 📖 Description

- `abis/`: This folder contains all the contract ABIs that are used in the project.
  Each file contains the ABI of a single contract. For example, `bridge.ts` contains the ABI of the `Bridge` contract. These are used by the contract controller of their respective contract.
- `constants/`: This folder contains all the constants that are used inside the project. Each file contains the constants of a single type. For example, `bridgeConstants.ts` contains the constants related to the `Bridge` route. As a rule of thumb if something is not going to change in the future and does not depend on which chain the user is on, or is a default value it should reside here.
- `data-modifiers/`: This folder contains all the modifiers that are used to modify raw data into a more structured format . Each file contains the modifiers of a single type. For example, `oysterModifiers.ts` contains the modifiers related to the `Oyster` route. Modifiers may introduce new properties to the data inorder to make it easier to consume.
- `helpers/`: This folder contains all the helper functions that are used inside the project. These are functions/logic that are being used in multiple places and are grouped by the common use case they adher to. For example, `conversionHelpers.ts` contains the helpers related to conversion of data from one format to other.
- `services/`: This folder making contract calls and updating the local state of the app simultaneously. Each file contains the services for a single parent route. For example, `oysterServices.ts` contains the services related to the `Oyster` route.
