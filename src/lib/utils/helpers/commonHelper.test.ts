import { describe, expect, test } from 'vitest';
import {
	bigIntAbs,
	capitalizeFirstLetter,
	checkValidURL,
	getTxnUrl,
	inputAmountInValidMessage,
	isInputAmountValid,
	minifyAddress
} from './commonHelper';

describe('minifyAddress', () => {
	test('should return first 6 and last 4 characters of 0x0000000000000000 without any arguments', () => {
		expect(minifyAddress()).toBe('0x0000...0000');
	});

	test('should return first 6 and last 4 characters of the address provided as the argument', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890')).toBe('0x1234...7890');
	});

	test('with first argument', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 3)).toBe('0x1...7890');
	});

	test('with both arguments', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 3, 2)).toBe('0x1...90');
	});

	test('with argument sum greater than address length', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 41, 4)).toBe(
			'0x1234567890123456789012345678901234567890'
		);
	});
});

describe('isInputAmountValid', () => {
	test('for amount which evaluates to zero', () => {
		expect(isInputAmountValid('0')).toBe(false);
		expect(isInputAmountValid('0.00')).toBe(false);
		expect(isInputAmountValid('.00')).toBe(false);
	});

	test('for 0 and positive integer strings', () => {
		expect(isInputAmountValid('1')).toBe(true);
		expect(isInputAmountValid('12345678901234567890')).toBe(true);
	});

	test('for valid amount with decimals upto 18 decimals', () => {
		expect(isInputAmountValid('1.1')).toBe(true);
	});

	test('for valid amount with 18 decimals', () => {
		expect(isInputAmountValid('1.123456789012345678')).toBe(true);
	});

	test('for negative amount', () => {
		expect(isInputAmountValid('-1')).toBe(false);
	});

	test('for amount having more than 18 decimals', () => {
		expect(isInputAmountValid('1.1234567890123456789')).toBe(false);
	});

	test('for amount having more than 50 digits', () => {
		expect(isInputAmountValid('123456789012345678901234567890123456789012345678901')).toBe(false);
	});

	test('for amount having invalid characters', () => {
		expect(isInputAmountValid('1a')).toBe(false);
		expect(isInputAmountValid('1$')).toBe(false);
		expect(isInputAmountValid('1*')).toBe(false);
	});
});

describe('inputAmountInValidMessage', () => {
	test('for amount which is 0', () => {
		expect(inputAmountInValidMessage('0')).toBe('Amount should be greater than 0.');
	});

	test('for amount having more than 50 digits', () => {
		expect(inputAmountInValidMessage('123456789012345678901234567890123456789012345678901')).toBe(
			'Amount is too big.'
		);
	});

	test('for amount having more than 18 decimals', () => {
		expect(inputAmountInValidMessage('1.1234567890123456789')).toBe(
			'Amount can have a maximum of 18 decimals only.'
		);
	});

	test('for amount having invalid characters', () => {
		expect(inputAmountInValidMessage('1a')).toBe('Amount has invalid characters.');
		expect(inputAmountInValidMessage('1$')).toBe('Amount has invalid characters.');
		expect(inputAmountInValidMessage('1*')).toBe('Amount has invalid characters.');
	});

	test('for valid amount', () => {
		expect(inputAmountInValidMessage('1')).toBe('');
		expect(inputAmountInValidMessage('1.1')).toBe('');
		expect(inputAmountInValidMessage('1.123456789012345678')).toBe('');
	});
});

describe('capitalizeFirstLetter', () => {
	test('for empty string', () => {
		expect(capitalizeFirstLetter('')).toBe('');
	});

	test('for single character string', () => {
		expect(capitalizeFirstLetter('a')).toBe('A');
	});

	test('for string with multiple characters', () => {
		expect(capitalizeFirstLetter('abc')).toBe('Abc');
	});
});

describe('getTxnUrl', () => {
	test('for explorer and txnHash', () => {
		expect(getTxnUrl('https://explorer.com', '0x1234567890123456789012345678901234567890')).toBe(
			'https://explorer.com/tx/0x1234567890123456789012345678901234567890'
		);
	});
});

describe('bigIntAbs', () => {
	test('positive number', () => {
		expect(bigIntAbs(1n)).toBe(1n);
	});

	test('negative number', () => {
		expect(bigIntAbs(-1n)).toBe(1n);
	});

	test('zero', () => {
		expect(bigIntAbs(0n)).toBe(0n);
	});
});

describe('checkValidURL', () => {
	test('for valid url', () => {
		expect(checkValidURL('https://example.com')).toBe(true);
		expect(checkValidURL('https://example.com/path')).toBe(true);
	});

	test('for valid ip address', () => {
		expect(checkValidURL('http://3.108.237.212:8080')).toBe(true);
	});

	test('with trailing slash', () => {
		expect(checkValidURL('https://example.com/')).toBe(false);
	});

	test('with no https:// or http:// at the start', () => {
		expect(checkValidURL('https://example.com/')).toBe(false);
	});
});
