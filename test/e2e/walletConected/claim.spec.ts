import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress'
import BasicSetup from '../../wallet-setup/basic.setup'
import { OYSTER_OPERATOR_JOBS_URL } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';
import { MESSAGES } from '../../../src/lib/utils/constants/messages';

const test = testWithSynpress(BasicSetup, unlockForFixture)
const { expect } = test;

test('Claim Job Reward', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_OPERATOR_JOBS_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page);

    const hasText = await page.textContent('text=My Job List');
    expect(hasText).toBeTruthy();

    // Fetch all the rows 
    const completedRows = await page.$$eval('tbody tr', rows => rows);

    if (completedRows.length > 0) {
        const claimButton = await page.$('tbody tr:nth-child(1) td:last-child button');
        if (claimButton && !(await claimButton.isDisabled())) {
            await claimButton.click();
            await metamask.confirmTransactionAndWaitForMining();
            await page.waitForSelector(`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLED}`)
        }
    }
    else {
        test.skip()
    }


})