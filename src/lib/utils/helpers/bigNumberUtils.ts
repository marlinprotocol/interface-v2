import { BigNumber, utils } from 'ethers';

export class BigNumberUtils {
	protected oneBN: BigNumber = utils.parseUnits('1', 18);
	constructor() {}

	public multiply(bn: BigNumber | string, number: number): BigNumber {
		const bnForSure = BigNumber.from(bn);
		const numberBN = utils.parseUnits(number.toString(), 18);

		return bnForSure.mul(numberBN).div(this.oneBN);
	}

	public divide(bn: BigNumber | string, number: number): BigNumber {
		const bnForSure = BigNumber.from(bn);
		const numberBN = utils.parseUnits(number.toString(), 18);

		return bnForSure.div(numberBN).div(this.oneBN);
	}
}
