import { ethers } from 'ethers';

export class BigNumberUtils {
	protected oneBN: bigint = ethers.parseUnits('1', 18);
	constructor() {}

	public multiply(bn: bigint | string, number: number): bigint {
		const bnForSure = BigInt(bn);
		const numberBN = ethers.parseUnits(number.toString(), 18);

		return (bnForSure * numberBN) / this.oneBN;
	}

	public divide(bn: bigint | string, number: number): bigint {
		const bnForSure = BigInt(bn);
		const numberBN = ethers.parseUnits(number.toString(), 18);

		return bnForSure / numberBN / this.oneBN;
	}
}
