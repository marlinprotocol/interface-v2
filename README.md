# Marlin - Frontend

## 📝 Setting up the project

- Clone the project and install dependencies via `npm install` (or `pnpm install` or `yarn`).
- Create a [WalletConnect account](https://cloud.walletconnect.com) and copy the Project ID.
- Create a `.env` file in the root of the project and add the above. You can use the `.env.example` file as a template.
  ```.env
  PUBLIC_NODE_ENV='development'
  VITE_PROJECT_ID='<your_walletconnect_project_id>'
  ```

## ⚒️ Developing

This project is powered by [SvelteKit](https://kit.svelte.dev/). To learn more about SvelteKit, check out the [documentation](https://kit.svelte.dev/docs).
Start a development server:

> use node version >= 16.16.0, you can check your node version by running `node -v` in your terminal/cmd.

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You should see a prompt that looks like this:

```bash
 VITE v4.4.11  ready in 773 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

> The port number and VITE version can be different for you.

## 🧑‍💻 Building

> Make sure that `PUBLIC_NODE_ENV='arb_mainnet'` in `.env` for building the mainnet version of the app.

To create a production version of your app you can run:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

> To deploy your app in a different environment such cloudflare, vercel or netlify, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. We use [static-adapter](https://kit.svelte.dev/docs/adapter-static) for this project

## 🏗️ Project Structure

This is a top-level overview of how this project is structured.

```bash
├── src/
│   ├── lib/
│   ├── logos/
│   ├── routes/
│   ├── app.css
│   └── app.html
├── static/
├── .env.example
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── README.md
├── svelte.config.js
├── tailwind.config.cjs
├── tsconfig.json
└── vite.config.ts
```

- `src/`: This is the heart of the project, inside it we have the `lib/` and the `routes/` folder. All routing, utils, components, pages and etc. reside in here.
- `static/`: Any static assets like images and logos.
- `.env.example`: contains an example `.env` file that needs to be added to ensure that the project runs runs correctly.
- `.eslintignore`: Files and folders to ignore while linting.
- `.eslintrc.cjs`: Configuration file for ESLint.
- `.gitignore`: Git files and folders to ignore.
- `.npmrc`: contains config for customizing npm behaviour.
- `.prettierignore`: contains glob patterns to ignore files/directories in your working directory while formatting code.
- `.prettierrc`: Configuration file for customisizing code formatting rules for prettier.
- `package-lock.json`: Dependancy tree generated based on `package.json`.
- `package.json`: Project dependencies and scripts.
- `postcss.config.cjs`: Configuration file for postcss.
- `svelte.config.js`: Configuration file for svelte and sveltekit.
- `tailwind.config.cjs`: Configuration file for tailwind css.
- `tsconfig.json`: Configuration file containing typechecking rules for TypeScript.
- `vite.config.ts`: Configuration file for vite.

> Check out other `README.md`'s for more details.
>
> - [lib](/src/lib/README.md)
> - [routes](/src/routes/README.md)
> - [controllers](/src/lib/controllers/README.md)
> - [utils](/src/lib/utils/README.md)

## 📦 Dependencies

Here are some of the main dependancies of the projects:

- [ethers](https://docs.ethers.org/v6/): A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.
- [daisyui](https://daisyui.com/docs/install/): A component library for tailwind css.
- [svelte-awesome](https://docs.robbrazier.com/svelte-awesome/icons): Icon library for svelte.
- [web3onboard](https://onboard.blocknative.com/docs/overview/introduction): A library for connecting and managing web3 wallets for dapps.

> For a full list of dependencies, check `package.json`.
