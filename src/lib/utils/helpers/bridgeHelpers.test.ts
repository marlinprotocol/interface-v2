// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { getAmountPrecision } from './bridgeHelpers';

describe('getAmountPrecision', () => {
	it('should return the precision for pond', () => {
		expect(getAmountPrecision('pond')).toBe(2);
	});
	it('should return the precision for mPond', () => {
		expect(getAmountPrecision('mPond')).toBe(6);
	});
	it('should return the default precision for an unknown token', () => {
		expect(getAmountPrecision('unknown')).toBe(4);
	});
});
