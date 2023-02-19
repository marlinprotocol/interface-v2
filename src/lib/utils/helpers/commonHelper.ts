export function copyTextToClipboard(text: string) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
	}
}

export function getCurrentEpochCycle(epochStartTime: number, epochLength: number): number {
	const currentEpoch = new Date().getTime() / 1000;
	const epochCycle = Math.floor((currentEpoch - epochStartTime) / epochLength) + 1;
	return epochCycle;
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
	// regex to check if the amount is a valid number which is greater than 0 and has 18 decimal places and has less than 50 digits
	// return /^([1-9][0-9]|0)?(\.[0-9]{1,18})?$/.test(amount);
	return /^(?!0\d)(?!.*(?:\..*){2})\d{1,50}(?:\.\d{1,18})?$/.test(amount);
}

/**
 * Returns error message if the amount is not valid
 */
export function inputAmountInValidMessage(amount: string): string {
	const isValid = isInputAmountValid(amount);

	let message = '';
	if (!amount) {
		message = 'Please enter an amount upto 18 decimal places';
	} else if (amount === '0') {
		message = 'Amount should be greater than 0';
	} else if (amount.split('.')[0].length > 50) {
		message = 'Amount is too big';
	} else if (amount.split('.')[1] && amount.split('.')[1].length > 18) {
		message = 'Amount should have 18 decimal places or less';
	} else if (!/^\d+(\.\d{0,1})?$/.test(amount)) {
		message = 'Amount has invalid characters';
	} else if (!isValid) {
		message = 'Amount is invalid';
	}

	return message;
}

/**
 * checks and returns if the address is valid or not
 */
export function isAddressValid(address: string): boolean {
	return /^0x[a-fA-F0-9]{40}$/.test(address);
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
	return address.slice(0, first) + '...' + address.slice(-last);
}
