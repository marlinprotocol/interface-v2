import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
	bigIntAbs,
	capitalizeFirstLetter,
	checkValidURL,
	getCurrentEpochCycle,
	getTxnUrl,
	inputAmountInValidMessage,
	isInputAmountValid,
	minifyAddress
} from './commonHelper';

describe('getCurrentEpochCycle', () => {
	beforeEach(() => {
		// tell vitest we use mocked time
		vi.useFakeTimers();
	});

	afterEach(() => {
		// restoring date after each test run
		vi.useRealTimers();
	});

	it('should return 0 if epochLength is 0', () => {
		expect(getCurrentEpochCycle(0, 0)).toBe(0);
		expect(getCurrentEpochCycle(100000000000, 0)).toBe(0);
		expect(getCurrentEpochCycle(512331, 0)).toBe(0);
	});

	it('should return 0 if epochStartTime is in future', () => {
		// all dates for this it are now mocked to 1702453671, i.e. any Date.getTime() call is now set to 1702453.671
		const mockDate = new Date(1702453671);
		vi.setSystemTime(mockDate);

		expect(getCurrentEpochCycle(1702453.672, 1)).toBe(0);
		expect(getCurrentEpochCycle(1702453.681, 1)).toBe(0);
		expect(getCurrentEpochCycle(1702453.691, 10)).toBe(0);
		expect(getCurrentEpochCycle(1702953.691, 10)).toBe(0);
		expect(getCurrentEpochCycle(1702953.691, 100)).toBe(0);
		expect(getCurrentEpochCycle(1702953.691, 100)).toBe(0);
	});

	it('should return the epoch value when provided with legitimate values', () => {
		// all dates for this it are now mocked to 1702453671, i.e. any Date.getTime() call is now set to 1702453.671
		const currentEpochMock = new Date(1702453671);
		vi.setSystemTime(currentEpochMock);

		expect(getCurrentEpochCycle(1702353.77, 1)).toBe(100);
		expect(getCurrentEpochCycle(1702353.77, 100)).toBe(1);
		expect(getCurrentEpochCycle(1702453, 1)).toBe(1);
	});
});

describe('minifyAddress', () => {
	it('should return first 6 (without considering 0x) and last 4 characters of 0x0000000000000000 without any arguments', () => {
		expect(minifyAddress()).toBe('0x000000...0000');
	});

	it('should return first 6 (without considering 0x) and last 4 characters of the address provided as the argument', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890')).toBe('0x123456...7890');
	});

	it('should return first n number of characters (withouth considering 0x) and last 4 charaters when given the first argument', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 0)).toBe('0x...7890');
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 1)).toBe('0x1...7890');
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 5)).toBe('0x12345...7890');
	});

	it('should return minified address according to both arguments', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 0, 0)).toBe('0x...');
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 3, 2)).toBe('0x123...90');
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 3, 2)).toBe('0x123...90');
	});

	it('should return an empty string when first argument or the second argument is less than 0', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890', -1, 4)).toBe('');
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 4, -1)).toBe('');
		expect(minifyAddress('0x1234567890123456789012345678901234567890', -1, -1)).toBe('');
	});

	it('with argument sum greater than address length', () => {
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 41, 4)).toBe(
			'0x1234567890123456789012345678901234567890'
		);
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 4, 41)).toBe(
			'0x1234567890123456789012345678901234567890'
		);
		expect(minifyAddress('0x1234567890123456789012345678901234567890', 41, 41)).toBe(
			'0x1234567890123456789012345678901234567890'
		);
	});
});

describe('isInputAmountValid', () => {
	it('should return false for amount which evaluates to zero', () => {
		expect(isInputAmountValid('0')).toBe(false);
		expect(isInputAmountValid('0.00')).toBe(false);
		expect(isInputAmountValid('.00')).toBe(false);
	});

	it('should return true positive integer strings', () => {
		expect(isInputAmountValid('1')).toBe(true);
		expect(isInputAmountValid('12345678901234567890')).toBe(true);
	});

	it('should return true for valid amount with decimals upto 18 decimals', () => {
		expect(isInputAmountValid('1.0')).toBe(true);
		expect(isInputAmountValid('1.000000000000000000')).toBe(true);
		expect(isInputAmountValid('1.1')).toBe(true);
		expect(isInputAmountValid('1.000000001')).toBe(true);
		expect(isInputAmountValid('1.000000000000000001')).toBe(true);
		expect(isInputAmountValid('1.123456789')).toBe(true);
		expect(isInputAmountValid('1.123456789012345678')).toBe(true);
	});

	it('should return true for valid amount with 18 decimals', () => {
		expect(isInputAmountValid('1.123456789012345678')).toBe(true);
	});

	it('should return false for negative amount', () => {
		expect(isInputAmountValid('-1')).toBe(false);
	});

	it('should return false for amount having more than 18 decimals', () => {
		expect(isInputAmountValid('1.1234567890123456789')).toBe(false);
	});

	it('should return false for amount having more than 50 digits', () => {
		expect(isInputAmountValid('123456789012345678901234567890123456789012345678901')).toBe(false);
	});

	it('should return false for amount having invalid characters', () => {
		expect(isInputAmountValid('1a')).toBe(false);
		expect(isInputAmountValid('1$')).toBe(false);
		expect(isInputAmountValid('1*')).toBe(false);
	});
});

describe('inputAmountInValidMessage', () => {
	it('should return message that amount should be greater than 0, when amount is 0', () => {
		expect(inputAmountInValidMessage('0')).toBe('Amount should be greater than 0.');
	});

	it('should return message that amount is too big, when amount has more than 50 digits', () => {
		expect(inputAmountInValidMessage('123456789012345678901234567890123456789012345678901')).toBe(
			'Amount is too big.'
		);
	});

	it('should return message that amount can have 18 decimals only, when amount has more than 18 decimals', () => {
		expect(inputAmountInValidMessage('1.1234567890123456789')).toBe(
			'Amount can have a maximum of 18 decimals only.'
		);
	});

	it('should return message for amount having invalid characters, when amount has invalid characters', () => {
		expect(inputAmountInValidMessage('1a')).toBe('Amount has invalid characters.');
		expect(inputAmountInValidMessage('1$')).toBe('Amount has invalid characters.');
		expect(inputAmountInValidMessage('1*')).toBe('Amount has invalid characters.');
	});

	it('should return an empty string when amount is valid', () => {
		expect(inputAmountInValidMessage('1')).toBe('');
		expect(inputAmountInValidMessage('1.1')).toBe('');
		expect(inputAmountInValidMessage('1.123456789012345678')).toBe('');
	});
});

describe('capitalizeFirstLetter', () => {
	it('should return an empty string when argument is an empty string', () => {
		expect(capitalizeFirstLetter('')).toBe('');
	});

	it('should return an capitalized string when argument is a single character string', () => {
		expect(capitalizeFirstLetter('a')).toBe('A');
	});

	it('should return the string with first letter capitalized when argument is a string with multiple characters', () => {
		expect(capitalizeFirstLetter('abc')).toBe('Abc');
	});
});

describe('getTxnUrl', () => {
	it('should return the URL for for explorer and txnHash', () => {
		expect(getTxnUrl('https://explorer.com', '0x1234567890123456789012345678901234567890')).toBe(
			'https://explorer.com/tx/0x1234567890123456789012345678901234567890'
		);
	});
});

describe('bigIntAbs', () => {
	it('should return a positive bigInt for a positive bigInt', () => {
		expect(bigIntAbs(1n)).toBe(1n);
	});

	it('should return a positive bigInt for a negative bigInt', () => {
		expect(bigIntAbs(-1n)).toBe(1n);
	});

	it('should return zero for zero', () => {
		expect(bigIntAbs(0n)).toBe(0n);
	});
});

describe('checkValidURL', () => {
	it('should return true for valid url', () => {
		expect(checkValidURL('https://example.com')).toBe(true);
		expect(checkValidURL('https://example.com/path')).toBe(true);
	});

	it('should return true for valid ip address', () => {
		expect(checkValidURL('http://3.108.237.212:8080')).toBe(true);
	});

	it('return false for url or ip address with trailing slash', () => {
		expect(checkValidURL('https://example.com/')).toBe(false);
		expect(checkValidURL('http://3.108.237.212:8080/')).toBe(false);
	});

	it('should return false with no https:// or http:// at the start', () => {
		expect(checkValidURL('example.com')).toBe(false);
		expect(checkValidURL('3.108.237.212:8080')).toBe(false);
	});
});
