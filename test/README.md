# Testing Documentation

We are using `playwright` to test the UI and to interact with Metamask we are using `synpress`.

### Setting up .env

```sh
VITE_WALLET_PASSWORD="YOUR_WALLET_PASSWORD"
VITE_SEED_PHRASE="YOUR_SEED_PHRASE"
VITE_TEST_CP_URL_1="VITE_TEST_CP_URL_1"
VITE_TEST_CP_URL_2="VITE_TEST_CP_URL_2"
VITE_WALLET_ADDRESS="YOUR_WALLET_ADDRESS"
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
