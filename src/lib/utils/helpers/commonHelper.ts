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
