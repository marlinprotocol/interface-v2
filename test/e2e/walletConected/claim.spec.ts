import { testWithSynpress, metaMaskFixtures, MetaMask } from '@synthetixio/synpress';
import BasicSetup from '../../wallet-setup/basic.setup';
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';
import {
	COMMON_TXN_MESSAGES,
	OYSTER_TXN_MESSAGES
} from '../../../src/lib/utils/constants/messages';
import { confirmPageTitle } from '../../helpers/common';

const test = testWithSynpress(metaMaskFixtures(BasicSetup));
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
				`text=${COMMON_TXN_MESSAGES.SUCCESS.description} ${OYSTER_TXN_MESSAGES.SETTLE_JOB.SUCCESS.description}`
			);
		}
	} else {
		test.skip();
	}
});
