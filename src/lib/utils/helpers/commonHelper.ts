import { checkIfSignerExistsInSubgraph } from '$lib/controllers/subgraphController';
import { shortenText } from '$lib/utils/helpers/conversionHelper';

export function copyTextToClipboard(text: string) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
	}
}

export function getCurrentEpochCycle(epochStartTime: number, epochLength: number): number {
	const currentEpoch = new Date().getTime() / 1000;

	//if epoch start time is in future, then epoch cycle is 0
	if (currentEpoch <= epochStartTime) {
		return 0;
	}
	const epochCycle = Math.floor((currentEpoch - epochStartTime) / epochLength) + 1;
	return epochCycle;
}
/**
 * closes modal based on the id that is passed in <label for={modalId}> by setting the respective checkbox to true
 * @param modalId
 */
export function openModal(modalId: string) {
	const modalCheckboxInput = document.getElementById(modalId) as HTMLInputElement;
	modalCheckboxInput.checked = true;
}

/**
 * closes modal based on the id that is passed in <label for={modalId}> by setting the respective checkbox to false
 * @param modalId
 */
export function closeModal(modalId: string) {
	const modalCheckboxInput = document.getElementById(modalId) as HTMLInputElement;
	modalCheckboxInput.checked = false;
}

/**
 * checks and returns if the amount is valid or not
 */
export function isInputAmountValid(amount: string): boolean {
	if (!amount) return true;
	// regex to check if the amount is a valid number which is greater than 0 and has 18 decimal places and has less than 50 digits
	return /^(?!0\d)(?!.*(?:\..*){2})\d{1,50}(?:\.\d{1,18})?$/.test(amount);
}

/**
 * Returns error message if the amount is not valid
 */
export function inputAmountInValidMessage(amount: string): string {
	const isValid = isInputAmountValid(amount);
	if (isValid) return '';
	let message = '';

	if (amount === '0') {
		message = 'Amount should be greater than 0.';
	} else if (amount.split('.')[0].length > 50) {
		message = 'Amount is too big.';
	} else if (amount.split('.')[1] && amount.split('.')[1].length > 18) {
		message = 'Amount can have a maximum of 18 decimals only.';
	} else if (!/^\d+(\.\d{0,1})?$/.test(amount)) {
		message = 'Amount has invalid characters.';
	} else if (!isValid) {
		message = 'Amount is invalid.';
	}

	return message;
}

/**
 * returns the minified address
 * @param address
 * @param first
 * @param last
 * @example minifyAddress('0x1234567890123456789012345678901234567890') => 0x1234...1234
 * @example minifyAddress('0x1234567890123456789012345678901234567890', 3, 2) => 0x1...34
 */

export function minifyAddress(
	address = '0x0000000000000000000000000000000000000000',
	first = 6,
	last = 4
): string {
	return shortenText(address, first, last);
}

/**
 * checks and returns an array of booleans signifying all the validations that the address has passed
 */
export async function isAddressValid(address: string): Promise<boolean[]> {
	const validCharacters = /^0x[a-fA-F0-9]{40}$/.test(address);
	if (!validCharacters) return [false, false];

	const addressExistsAsSigner = await checkIfSignerExistsInSubgraph(address);
	if (!addressExistsAsSigner) return [true, false];
	return [true, true];
}

/**
 * capitalizes the first letter of the string
 * @param string
 * @returns
 * @example capitalizeFirstLetter('hello') => 'Hello'
 */
export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * returns true is the url is valid
 * @param string
 * @returns
 * @example checkValidURL('https://google.com') => true
 * @example checkValidURL('http://3.108.237.212:8080') => true
 * @example checkValidURL('http://example.com/path') => true
 * @example checkValidURL('http://example.com/') => false as it has an ending slash at the end
 * @example checkValidURL('example.com') => false as it has no http:// or https:// at the start
 */
export function checkValidURL(url: string) {
	const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
	const ipv6Regex = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/;
	const urlRegex = /^(http|https):\/\/[\w.-]+(:\d+)?(\/\S*)?[^/]$/;

	const hasValidProtocolAndHostname = urlRegex.test(url);
	const hasNoTrailingSlashOrTrailingColon = !url.endsWith('/') && !url.endsWith(':');

	let isValid = hasValidProtocolAndHostname && hasNoTrailingSlashOrTrailingColon;

	if (!isValid) {
		return false;
	}

	const ipv4Match = ipv4Regex.test(url);
	const ipv6Match = ipv6Regex.test(url);

	if (ipv4Match || ipv6Match) {
		const urlWithoutProtocol = url.split('://')[1];
		const urlWithoutProtocolAndPath = urlWithoutProtocol.split('/')[0];
		const hostnameOrIP = urlWithoutProtocolAndPath.split(':')[0];

		if (ipv4Match) {
			const groups = hostnameOrIP.split('.');
			isValid =
				groups.length === 4 &&
				groups.every((group) => parseInt(group) >= 0 && parseInt(group) <= 255);
		} else {
			isValid = true;
		}
		return isValid;
	}

	return true;
}

export const goerliArbiUrl = (txnHash: string) => {
	return `https://goerli.arbiscan.io/tx/${txnHash}`;
};

export const doNothing = () => {
	// do nothing
};
