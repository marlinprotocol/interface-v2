# Testing Documentation

We are using `playwright` to test the UI and to interact with Metamask we are using `synpress`.

### Setting up .env

```sh
VITE_DEMO_CP_URL="YOUR_CP_URL"
VITE_WALLET_PASSWORD="YOUR_WALLET_PASSWORD"
VITE_SEED_PHRASE="YOUR_SEED_PHRASE"
```

### Installing dependencies

`npm i` should install synpress and playwright.

> By default playwright tests runs on **Chromium**, to configure/install more browsers refer to [Playwright Docs](https://playwright.dev/docs/browsers)

### Setting up cache

running the script `npm run test:integration` will create .cache-synpress folder which will have cache for wallet setup files (named as [file-name].setup.js).

For the first time, you'll need to run the development server separately and then run `npm run test:integration`.
after that no need to run the development server separately.

### Config

Configuration for playwright can be found in `playwright.config.js`

### Learn more

[Synpress](https://synpress.io/)
[Playwright](https://playwright.dev/)
