// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, expect, it } from 'vitest';
import {
	bigNumberToString,
	convertHourlyRateToSecondlyRate,
	convertRateToPerHourString,
	dateToString,
	epochSecToString,
	epochToDurationString,
	mPondToPond,
	shortenText,
	stringToBigNumber
} from './conversionHelper';

describe('epochToDurationString', () => {
	it('should return the default conversion of epoch when duration is less than 100 years and mini is false', () => {
		expect(epochToDurationString(0)).toBe('');
		expect(epochToDurationString(1)).toBe('1 secs');
		expect(epochToDurationString(59)).toBe('59 secs');
		expect(epochToDurationString(60)).toBe('1 min');
		expect(epochToDurationString(61)).toBe('1 min 1 secs');
		expect(epochToDurationString(3599)).toBe('59 mins 59 secs');
		expect(epochToDurationString(3600)).toBe('1 hour');
		expect(epochToDurationString(3601)).toBe('1 hour 1 secs');
		expect(epochToDurationString(86399)).toBe('23 hours 59 mins 59 secs');
		expect(epochToDurationString(86400)).toBe('1 day');
		expect(epochToDurationString(86401)).toBe('1 day 1 secs');
		expect(epochToDurationString(2591999)).toBe('29 days 23 hours 59 mins 59 secs');
		expect(epochToDurationString(2592000)).toBe('1 month');
		expect(epochToDurationString(2592001)).toBe('1 month 1 secs');
		expect(epochToDurationString(31103999)).toBe('11 months 29 days 23 hours 59 mins 59 secs');
		expect(epochToDurationString(31104000)).toBe('1 year');
		expect(epochToDurationString(31104001)).toBe('1 year 1 secs');
		expect(epochToDurationString(311039999)).toBe(
			'9 years 11 months 29 days 23 hours 59 mins 59 secs'
		);
		expect(epochToDurationString(311040000)).toBe('10 years');
		expect(epochToDurationString(311040001)).toBe('10 years 1 secs');
		expect(epochToDurationString(3110399999)).toBe(
			'99 years 11 months 29 days 23 hours 59 mins 59 secs'
		);
		expect(epochToDurationString(3110400000)).toBe('100 years');
		expect(epochToDurationString(3110400001)).toBe('100 years 1 secs');
		expect(epochToDurationString(12334422)).toBe('4 months 22 days 18 hours 13 mins 42 secs');
	});

	it('should return 100+ years when duration greater than 100 years', () => {
		expect(epochToDurationString(31104000000)).toBe('100+ years');
	});

	it('should return the minified version of epoch conversion when mini is true', () => {
		expect(epochToDurationString(1, true)).toBe('1 secs');
		expect(epochToDurationString(60, true)).toBe('1 min');
		expect(epochToDurationString(3599, true)).toBe('59 mins');
		expect(epochToDurationString(3600, true)).toBe('1 hour');
		expect(epochToDurationString(3601, true)).toBe('1 hour');
		expect(epochToDurationString(86399, true)).toBe('23 hours');
		expect(epochToDurationString(86400, true)).toBe('1 day');
		expect(epochToDurationString(86401, true)).toBe('1 day');
		expect(epochToDurationString(2591999, true)).toBe('29 days');
		expect(epochToDurationString(2592000, true)).toBe('1 month');
		expect(epochToDurationString(2592001, true)).toBe('1 month');
		expect(epochToDurationString(31103999, true)).toBe('11 months');
		expect(epochToDurationString(31104000, true)).toBe('1 year');
		expect(epochToDurationString(31104001, true)).toBe('1 year');
		expect(epochToDurationString(311039999, true)).toBe('9 years');
		expect(epochToDurationString(311040000, true)).toBe('10 years');
		expect(epochToDurationString(311040001, true)).toBe('10 years');
		expect(epochToDurationString(3110399999, true)).toBe('99 years');
		expect(epochToDurationString(3110400000, true)).toBe('100 years');
		expect(epochToDurationString(3110400001, true)).toBe('100 years');
		expect(epochToDurationString(31104000000, true)).toBe('100+ years');
	});
});

describe('bigNumberToString', () => {
	it('should throw error when argument is undefined or null', () => {
		expect(() => bigNumberToString(null)).toThrowError('Invalid value');
		expect(() => bigNumberToString(undefined)).toThrowError('Invalid value');
	});

	it('should return 0.00 when argument is 0', () => {
		expect(bigNumberToString(0n)).toBe('0.00');
	});

	it('should consider 18 decimals and 4 precision with default arguments with commification', () => {
		expect(bigNumberToString(1000000000000000000000000n)).toBe('1,000,000.0000');
		expect(bigNumberToString(1000000000000000000000n)).toBe('1,000.0000');
		expect(bigNumberToString(100000000000000000000n)).toBe('100.0000');
		expect(bigNumberToString(10000000000000000000n)).toBe('10.0000');
		expect(bigNumberToString(1000000000000000000n)).toBe('1.0000');
		expect(bigNumberToString(100000000000000000n)).toBe('0.1000');
		expect(bigNumberToString(10000000000000000n)).toBe('0.0100');
		expect(bigNumberToString(1000000000000000n)).toBe('0.0010');
		expect(bigNumberToString(100000000000000n)).toBe('0.0001');
		expect(bigNumberToString(10000000000000n)).toBe('0.0000');
	});

	it('should consider passed decimals and precisions arguments with commification', () => {
		expect(bigNumberToString(1000000000n, 6, 2)).toBe('1,000.00');
	});
});

describe('stringToBigNumber', () => {
	it('should return 0n for empty string', () => {
		expect(stringToBigNumber('')).toBe(0n);
	});

	it('should return a bigInt with default decimals', () => {
		expect(stringToBigNumber('1')).toBe(1000000000000000000n);
		expect(stringToBigNumber('0.1')).toBe(100000000000000000n);
		expect(stringToBigNumber('1.0')).toBe(1000000000000000000n);
		expect(stringToBigNumber('12.0')).toBe(12000000000000000000n);
		expect(stringToBigNumber('12.000000000000000001')).toBe(12000000000000000001n);
	});

	it('should return a bigInt with passed decimals', () => {
		expect(stringToBigNumber('1', 6)).toBe(1000000n);
		expect(stringToBigNumber('1.0', 6)).toBe(1000000n);
		expect(stringToBigNumber('1.000001', 6)).toBe(1000001n);
		expect(stringToBigNumber('1.0000011', 6)).toBe(1000001n);
		expect(stringToBigNumber('12.0', 6)).toBe(12000000n);
		expect(stringToBigNumber('12', 1)).toBe(120n);
		expect(stringToBigNumber('12.0', 1)).toBe(120n);
		expect(stringToBigNumber('12.0', 0)).toBe(12n);
		expect(stringToBigNumber('1.2', 0)).toBe(1n);
	});

	it('should return 0n if the string is a non-numeric/invalid value', () => {
		expect(stringToBigNumber('abc')).toBe(0n);
		expect(stringToBigNumber('12.^')).toBe(0n);
		expect(stringToBigNumber('abc', 6)).toBe(0n);
		expect(stringToBigNumber('1.1.1', 6)).toBe(0n);
		expect(stringToBigNumber('1000.0 ')).toBe(0n);
	});
});

describe('epochSecToString', () => {
	it('should return a formatted date string when supplied with an unix time', () => {
		expect(epochSecToString(1629753600)).toBe('Aug 24, 2021');
	});
});

describe('dateToString', () => {
	it('should return a formatted date string when supplied with a date object', () => {
		expect(dateToString(new Date('2021-08-24T00:00:00.000Z'))).toBe('Aug 24, 2021');
	});
});

describe('shortenText', () => {
	it('should return the shortened text with default arguments when second and third arguments are not passed', () => {
		expect(shortenText('thisisaverylongtextthatneedstobeshortened')).toBe('thisis...ened');
		expect(shortenText('123456789012')).toBe('123456...9012');
	});

	it('should return the shortend text with first n letters when passed in as the second argument', () => {
		expect(shortenText('thisisaverylongtextthatneedstobeshortened', 2)).toBe('th...ened');
		expect(shortenText('123456789', 3)).toBe('123...6789');
	});

	it('should return the same text when length of text is less than sum of second and third arguments', () => {
		expect(shortenText('thisistext')).toBe('thisistext');
		expect(shortenText('1234567890')).toBe('1234567890');
		expect(shortenText('thisisanotherlongtextbutsumofargumentsisalsolarge', 50, 50)).toBe(
			'thisisanotherlongtextbutsumofargumentsisalsolarge'
		);
	});

	it('should return trimmed text when lenght of text is greater than sum of second and third arguments', () => {
		expect(shortenText('thisistext', 2, 3)).toBe('th...ext');
		expect(shortenText('1234567890', 2, 2)).toBe('12...90');
		expect(shortenText('thisisanotherlongtextbutsumofargumentsisalsolarge')).toBe('thisis...arge');
	});
});

describe('mPondToPond', () => {
	it('should return converted POND value', () => {
		expect(mPondToPond(1000000000000000000n)).toBe(1000000000000000000000000n);
		expect(mPondToPond(1000000000000n)).toBe(1000000000000000000n);
		expect(mPondToPond(1n)).toBe(1000000n);
	});
});

describe('pondToMPond', () => {
	it('should return converted POND value', () => {
		expect(mPondToPond(1000000000000000000n)).toBe(1000000000000000000000000n);
		expect(mPondToPond(1000000000000n)).toBe(1000000000000000000n);
		expect(mPondToPond(1n)).toBe(1000000n);
	});
});
describe('convertRateToPerHourString', () => {
	it('should convert the rate from bigInt to a string considering passed decimals and precisions', () => {
		expect(convertRateToPerHourString(810833333333333n)).toBe('2.9189');
		expect(convertRateToPerHourString(24083333333333n)).toBe('0.0866');
		expect(convertRateToPerHourString(10000n)).toBe('0.0000');
		expect(convertRateToPerHourString(1n)).toBe('0.0000');
	});

	it('should convert the rate from bigInt to a string considering passed decimals and default precisions when third argument is not passed', () => {
		expect(convertRateToPerHourString(810833333333333n, 6)).toBe('2,918,999,999,999.9988');
		expect(convertRateToPerHourString(24083333333333n, 6)).toBe('86,699,999,999.9988');
		expect(convertRateToPerHourString(10000n, 6)).toBe('36.0000');
		expect(convertRateToPerHourString(1n, 6)).toBe('0.0036');
	});
});

describe('convertHourlyRateToSecondlyRate', () => {
	it('should convert hourly rate to rate per second', () => {
		expect(convertHourlyRateToSecondlyRate(810833333333333n)).toBe(225231481481n);
		expect(convertHourlyRateToSecondlyRate(24083333333333n)).toBe(6689814814n);
		expect(convertHourlyRateToSecondlyRate(10000n)).toBe(2n);
		expect(convertHourlyRateToSecondlyRate(1n)).toBe(0n);
	});
});
