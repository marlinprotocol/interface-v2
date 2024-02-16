import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress'
import BasicSetup from '../../wallet-setup/basic.setup'
import { OYSTER_MARKETPLACE_URL, OYSTER_OWNER_INVENTORY_URL } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';


const test = testWithSynpress(BasicSetup, unlockForFixture)
const { expect } = test

test('connect wallet -> deploy a job -> check if it navigated to inventory', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page)


    const hasText = await page.textContent('text=Infrastructure Providers');
    expect(hasText).toBeTruthy();


    // sort by rate.
    const rateHeader = page.locator('th:has-text("RATE")');
    await rateHeader.click();



    // Select and click the 'DEPLOY' button within the first row
    await page.locator('tbody tr.main-row:first-child td:nth-of-type(8)').click();

    // Make sure the modal opened.
    await page.waitForSelector('text=CREATE ORDER');
    // Wait for the modal to be visible if it is not immediately so
    await page.waitForSelector('.modal-body');

    // Duration
    await page.locator('div:nth-child(2) > div:nth-child(2) > #pond-input-amount').first().fill('1');

    // duration in minutes
    await page.locator('div:nth-child(4) > .search-container > .btn').first().click();
    await page.getByRole('button', { name: 'Minutes' }).click();

    // Bandwidth
    await page.locator('div:nth-child(5) > div > div:nth-child(2) > #pond-input-amount').first().fill('9');


    // Fill the enclave image url.
    await page.locator('.px-4 > div:nth-child(2) > #address-display').first().fill('https://example.com')

    const approveButton = page.locator('.btn-block').first();
    const text = await approveButton.innerText();
    await approveButton.click();

    if (text === 'APPROVE') {
        await metamask.notificationPage.approveTokenPermission(extensionId);
        await page.waitForTimeout(5_000);
        await approveButton.click();
        await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
    } else {
        await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
    }

    await page.waitForURL(OYSTER_OWNER_INVENTORY_URL + '/');

})