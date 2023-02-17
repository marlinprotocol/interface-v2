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
 * checks and returns if the address is valid or not
 * @param address
 * @returns
 */
export function isAddressValid(address: string): boolean {
	return /^0x[a-fA-F0-9]{40}$/.test(address);
}
