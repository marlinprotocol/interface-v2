import { expect, test } from 'vitest';
import { minifyAddress } from './commonHelper';

test('minify address without any arguments', () => {
	expect(minifyAddress()).toBe('0x0000...0000');
});
