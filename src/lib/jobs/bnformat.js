import { BigNumber as BN } from 'ethers';

export function bnToText(dec) {
	return (bn) => {
		if (bn === undefined) return undefined;
		let str = bn.toString();
		if (str.length < 1 + dec) str = '0'.repeat(1 + dec - str.length) + str;
		str = str.slice(0, str.length - dec) + '.' + str.slice(str.length - dec);
		return str;
	};
}

export function textToBN(dec) {
	return (v) => {
		if (v === undefined) return undefined;

		// compute decimal pos
		let dotPos = v.indexOf('.');

		// handle no decimal
		if (dotPos == -1) {
			dotPos = v.length;
			v += '.0';
		}

		if (v[v.length - 1] === '.') v = v + '0';

		// calculate existing decimals
		let decimals = v.length - dotPos - 1;

		// slice around . and add trailing zeros
		v = v.slice(0, dotPos) + v.slice(dotPos + 1) + '0'.repeat(dec - decimals);

		// trim leading zeros
		v = v.replace(/^0+(\d)$/g, '$1');

		return BN.from(v);
	};
}
