// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, expect, test } from 'vitest';
import { getAmountPrecision } from './bridgeHelpers';

describe('getAmountPrecision', () => {
	test('should return the precision for pond', () => {
		expect(getAmountPrecision('pond')).toBe(2);
	});
	test('should return the precision for mPond', () => {
		expect(getAmountPrecision('mPond')).toBe(6);
	});
	test('should return the default precision for an unknown token', () => {
		expect(getAmountPrecision('unknown')).toBe(4);
	});
});
