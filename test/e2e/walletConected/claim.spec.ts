import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress';
import BasicSetup from '../../wallet-setup/basic.setup';
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';
import { MESSAGES } from '../../../src/lib/utils/constants/messages';
import { confirmPageTitle } from '../../helpers/common';

const test = testWithSynpress(BasicSetup, unlockForFixture);
const { expect } = test;

test('Claim Job Reward', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_JOBS_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	expect(await confirmPageTitle(page)).toBeTruthy();

	// // Fetch all the rows
	const completedRows = await page.$$eval('tbody tr', (rows) => rows);

	if (completedRows.length > 0) {
		const claimButton = await page.$('tbody tr:nth-child(1) td:last-child button');
		if (claimButton && !(await claimButton.isDisabled())) {
			await claimButton.click();
			await metamask.confirmTransactionAndWaitForMining();
			await page.waitForSelector(
				`text=${
					MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLED
				}`
			);
		}
	} else {
		test.skip();
	}
});
