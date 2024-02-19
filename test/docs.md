# Testing Documentation  

We are using `playwright` to test the UI and to interact with Metamask we are using `synpress`.

### Setting up .env  
VITE_DEMO_CP_URL= YOUR_CP_URL
VITE_WALLET_PASSWORD= YOUR_WALLET_PASSWORD
VITE_SEED_PHRASE= YOUR_SEED_PHRASE

### Installing dependencies.  

`npm i` should install synpress and playwright.
By default playwright tests runs on Chromium.
to configure/install more browser refer to [Playwright Docs](https://playwright.dev/docs/browsers)

### Learn more about playwright and synpress
https://synpress.io/
https://playwright.dev/