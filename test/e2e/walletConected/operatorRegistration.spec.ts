import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress'
import BasicSetup from '../../wallet-setup/basic.setup'
import { OYSTER_OPERATOR_URL } from '../../../src/lib/utils/constants/urls';
import { MESSAGES } from '../../../src/lib/utils/constants/messages';
import { loginToMetamask } from '../../helpers/metamask';

const test = testWithSynpress(BasicSetup, unlockForFixture)
const { expect } = test;
const TEST_CP_URL_1 = process.env.VITE_TEST_CP_URL_1 || '';
const TEST_CP_URL_2 = process.env.VITE_TEST_CP_URL_2 || '';


test('Operator Registation', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page);

    const hasText = await page.textContent('text=Operator Registration');
    expect(hasText).toBeTruthy();

    const addressInput = page.getByPlaceholder('Enter your address here');
    expect(addressInput).toBeDisabled();

    const labelSelector = `label[for="disconnect-wallet-modal"]`;
    await page.waitForSelector(labelSelector);

    // Click the label
    await page.click(labelSelector);
    await page.textContent('text=Your wallet');
    const walletAddress = await page.getByTestId('wallet-address').innerText();

    await page.getByAltText('Close').click();
    expect(addressInput).toHaveValue(walletAddress);
    await page.waitForTimeout(5000);
    const [unregisterButton] = await page.$$('button:has-text("UNREGISTER")');
    if (unregisterButton) test.skip();

    const [registerButton] = await page.$$('button:has-text("REGISTER")');

    if (registerButton) {
        expect(await registerButton.isDisabled()).toBeTruthy()
        // await page.getByTestId('container-card-body').getByRole('button').first().click();
        const cpURLInput = page.getByPlaceholder('Paste URL here');
        expect(cpURLInput).toHaveValue('');
        expect(cpURLInput).toBeEnabled();

        await cpURLInput.fill(TEST_CP_URL_1);

        await page.waitForSelector('text=Instance Type');

        await page.getByTestId('collapse-button').click();

        expect(await registerButton.isDisabled()).toBeFalsy();
        await registerButton.click();

        await metamask.confirmTransactionAndWaitForMining();
    } else {
        test.skip();
    }
})

test('Operator Unregistration', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page);

    const hasText = await page.textContent('text=Operator Registration');
    expect(hasText).toBeTruthy();

    const addressInput = page.getByPlaceholder('Enter your address here');
    expect(addressInput).toBeDisabled();

    const labelSelector = `label[for="disconnect-wallet-modal"]`;
    await page.waitForSelector(labelSelector);

    // Click the label
    await page.click(labelSelector);
    await page.textContent('text=Your wallet');
    const walletAddress = await page.getByTestId('wallet-address').innerText();

    await page.getByAltText('Close').click();
    expect(addressInput).toHaveValue(walletAddress);

    const [unregisterButton] = await page.$$('button:has-text("UNREGISTER")');
    if (!unregisterButton) test.skip();
    expect(await unregisterButton.isDisabled()).toBeFalsy();
    await unregisterButton.click();
    await metamask.confirmTransactionAndWaitForMining();
    await page.waitForSelector(`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.REMOVE.REMOVED}`)

})

test('Operator Edit', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page);

    const hasText = await page.textContent('text=Operator Registration');
    expect(hasText).toBeTruthy();

    const addressInput = page.getByPlaceholder('Enter your address here');
    expect(addressInput).toBeDisabled();

    await page.waitForTimeout(1000);
    const cpURLInput = page.getByPlaceholder('Paste URL here');
    await page.getByTestId('container-card-body').getByRole('button').first().click();
    await cpURLInput.fill(TEST_CP_URL_2);

    await page.waitForSelector('text=Instance Type');
    const [updateButton] = await page.$$('button:has-text("UPDATE")');
    await updateButton.click();
    await metamask.confirmTransactionAndWaitForMining();
    await page.waitForSelector(`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.UPDATE.UPDATED}`)

})

test('Operator Registation and Unregistration', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page);

    const hasText = await page.textContent('text=Operator Registration');
    expect(hasText).toBeTruthy();

    const addressInput = page.getByPlaceholder('Enter your address here');
    expect(addressInput).toBeDisabled();

    const labelSelector = `label[for="disconnect-wallet-modal"]`;
    await page.waitForSelector(labelSelector);

    // Click the label
    await page.click(labelSelector);
    await page.textContent('text=Your wallet');
    const walletAddress = await page.getByTestId('wallet-address').innerText();

    await page.getByAltText('Close').click();
    expect(addressInput).toHaveValue(walletAddress);

    const [registerButton] = await page.$$('button:has-text("REGISTER")');
    expect(await registerButton.isDisabled()).toBeTruthy()
    // await page.getByTestId('container-card-body').getByRole('button').first().click();

    const cpURLInput = page.getByPlaceholder('Paste URL here');
    expect(cpURLInput).toHaveValue('');
    expect(cpURLInput).toBeEnabled();

    await cpURLInput.fill(TEST_CP_URL_1);

    await page.waitForSelector('text=Instance Type');

    await page.getByTestId('collapse-button').click();

    expect(await registerButton.isDisabled()).toBeFalsy();
    await registerButton.click();

    await metamask.confirmTransactionAndWaitForMining();

    // Editing -- need another CP url to test editing.
    // await page.waitForTimeout(1000);
    // await page.getByTestId('container-card-body').getByRole('button').first().click();
    // await cpURLInput.fill(CP_URL + '...');
    // await cpURLInput.fill(CP_URL);
    // await page.waitForSelector('text=Instance Type');
    // const [updateButton] = await page.$$('button:has-text("UPDATE")');
    // await updateButton.click();
    // await metamask.confirmTransactionAndWaitForMining();


    // Unregister
    await page.waitForSelector('text=UNREGISTER');
    const [unregisterButton] = await page.$$('button:has-text("UNREGISTER")');
    expect(await unregisterButton.isDisabled()).toBeFalsy();
    await unregisterButton.click();
    await metamask.confirmTransactionAndWaitForMining();
    await page.waitForSelector(`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.REMOVE.REMOVED}`)
})