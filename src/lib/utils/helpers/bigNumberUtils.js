import { BigNumber, utils } from 'ethers';
export class BigNumberUtils {
    oneBN = utils.parseUnits('1', 18);
    constructor() { }
    multiply(bn, number) {
        const bnForSure = BigNumber.from(bn);
        const numberBN = utils.parseUnits(number.toString(), 18);
        return bnForSure.mul(numberBN).div(this.oneBN);
    }
    divide(bn, number) {
        const bnForSure = BigNumber.from(bn);
        const numberBN = utils.parseUnits(number.toString(), 18);
        return bnForSure.div(numberBN).div(this.oneBN);
    }
}
//# sourceMappingURL=bigNumberUtils.js.map