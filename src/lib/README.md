# Overview guide for `$lib`

## ⚒️ Usage

To import any module of `lib` inside `.svelte` files we can use svelte's `$` notation to refer to the `src/lib` folder. For example:

```tsx
import { someFunctionOrModule } from '$lib/whatever/folder/module.ts';
```

This way we don't need to take care of absolute paths.

## 🏗️ Folder Structure

```bash
└── lib/
    ├── atoms/
    ├── chains/
    ├── components/
    ├── controllers/
    ├── data-stores/
    ├── environments/
    ├── page-components/
    ├── types/
    └── utils/
```

## 📖 Description

- `atoms/`: These are the smallest functional UI unit of our application. Atoms are built with modularity and code reusability as their most important guiding principles. Boilerplate stuff like `Buttons`, `Tooltips`, `Modals`, etc. have their functional definitions in here. Atoms don't have any business logics in them. When writing markup, as a rule of you should first look in `components/` to check if the markup (along with the desired logic) you want to write has already been written, if not, then you should be able to contruct a component yourself from existing atoms. If that doesn't sit well, only then you should add in a new atom. One more case when you might add stuff in the atoms folder is if you want to extend an atom, like a new button, or a new kind of card.
- `chains/`: This folder contains chain configs for each chain that our application supports (testnet included). If we need to support another chain in our application one would create a new file in this folder, add the required config details in it based on the routes it will support and update the respective environment file.
- `components/`: These are reusable pieces of markup and logic that are mainly constructed with two or more atoms. They solve a specific purpose but are general enough to be re-used throughout the application provided the use case fits.
- `controllers/`: Our application has to communicate with various things such as HTTPS endpoints, subgraphs, contracts, etc. to provide a dynamic experience to the user. Any such communication which doesn't fall under conventional component interaction resides in this folder, in its respective `.ts` file.
- `data-stores/`: This folder contains all the major svelte-stores, and their helpers that we might need in our component/pages to render markup. Each major route has a separate file for its stores, and some functionalities might also have their separate file.
- `environments/`: This folder contains the finer environment level configuration details for each respective environment separately.
- `page-components/`: Think of this as a step above components and atoms, here we tweak components or may even use a combination of components, while introducing some business logic to fit in our use case for a particular page. This folder contains multiple other folders corresponding to the respective page it is built for.
- `types/`: Contains files for storing custom type-definitions used throughout our application.
- `utils/`: Contains all other stuff that doesn't fall under any of the categories defined above. Stuff like helper functions, constants, conversions, etc.
