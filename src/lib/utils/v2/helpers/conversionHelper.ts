import {
	DEFAULT_CURRENCY_DECIMALS,
	DEFAULT_PRECISION,
	SECONDS_IN_HOUR
} from '$lib/utils/constants/constants';
import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';

import { ethers } from 'ethers';

/**
 * Returns duration string for a epoch
 * @param epoch epoch
 * @param mini boolean optional default as false. if true, returns only months, days, hours, mins, secs
 * @param uptoHoursOnly boolean optional default as false. if true, does not return mins and secs
 * @returns string
 * @example 12334422 => 4 months 22 days 18 hours 13 mins 42 secs
 */

export const epochToDurationString = (epoch: number, mini = false) => {
	const SECONDS_IN_MINUTE = 60;
	const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
	const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
	const SECONDS_IN_MONTH = SECONDS_IN_DAY * 30; // Approximate a month as 30 days
	const SECONDS_IN_YEAR = SECONDS_IN_MONTH * 12;
	const SECONDS_IN_HUNDRED_YEARS = SECONDS_IN_YEAR * 100;

	if (epoch >= SECONDS_IN_HUNDRED_YEARS) return '+100 Y'; // Changed 'years' to 'Y'
	const seconds = epoch % SECONDS_IN_MINUTE;
	const minutes = Math.floor(epoch / SECONDS_IN_MINUTE) % 60;
	const hours = Math.floor(epoch / SECONDS_IN_HOUR) % 24;
	const days = Math.floor(epoch / SECONDS_IN_DAY) % 30;
	const months = Math.floor(epoch / SECONDS_IN_MONTH) % 12;
	const years = Math.floor(epoch / SECONDS_IN_YEAR);
	let count = 0;
	let durationString = '';
	if (years > 0) {
		durationString += years + 'Y ';
		if (mini) return durationString.trimEnd();
		count++;
	}
	if (months > 0) {
		durationString += months + 'M ';
		if (mini && days === 0) return durationString.trimEnd();
		count++;
	}
	if (count >= 2) return durationString.trimEnd();
	if (days > 0) {
		durationString += days + 'D ';
		if (mini && hours === 0) return durationString.trimEnd();
		count++;
	}
	if (count >= 2) return durationString.trimEnd();
	if (hours > 0) {
		durationString += hours + 'H ';
		if (mini && minutes === 0) return durationString.trimEnd();
		count++;
	}
	if (count >= 2) return durationString.trimEnd();
	if (minutes > 0) {
		durationString += minutes + 'M ';
		if (mini && seconds === 0) return durationString.trimEnd();
		count++;
	}
	if (count >= 2) return durationString.trimEnd();
	if (seconds > 0) {
		durationString += seconds + 'S';
		if (mini) return durationString;
		count++;
	}
	return durationString.trimEnd();
};

/**
 * Returns string for a bigInt
 * @param value: bigInt
 * @param bigNumberDecimal: decimal of the token, default set to 18
 * @param precision: number of digits after the decimal point, default set to 2
 * @param commify: default set to true
 * @returns string
 */
export const bigNumberToString = (
	value: bigint,
	bigNumberDecimal = DEFAULT_CURRENCY_DECIMALS,
	precision = DEFAULT_PRECISION,
	commify = true
) => {
	if (value === undefined || value === null) {
		throw new Error('Invalid value');
	}
	if (value === 0n) {
		return '0.00';
	}

	const formattedValue = ethers.formatUnits(value, bigNumberDecimal);
	const [integerPart, decimalPart] = formattedValue.split('.');
	const commifiedIntegerPart = commify ? BigInt(integerPart).toLocaleString() : integerPart;
	const truncatedDecimalPart = decimalPart.slice(0, precision).padEnd(precision, '0');

	return `${commifiedIntegerPart}.${truncatedDecimalPart}`;
};

//return bignumber from string with decimal
export const stringToBigNumber = (value: string, bigNumberDecimal = DEFAULT_CURRENCY_DECIMALS) => {
	if (!value) return 0n;
	if (!isInputAmountValid(value)) return 0n;
	let newValue = value;
	// eslint-disable-next-line prefer-const
	let [integer, fraction] = value.split('.');

	if (fraction && fraction.length > bigNumberDecimal) {
		fraction = fraction.slice(0, bigNumberDecimal);
		newValue = integer + '.' + fraction;
	}
	return ethers.parseUnits(newValue, bigNumberDecimal);
};

export const epochSecToString = (date: number) => {
	return new Date(date * 1000).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC' // This option specifies the time zone to use
	});
};

export const dateToString = (date: Date) => {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
};

//short text with ellipsis in the middle
export const shortenText = (text: string, first = 6, last = 4) => {
	if (text.length <= first + last) {
		return text;
	}
	return text.slice(0, first) + '...' + text.slice(text.length - last);
};

export const mPondToPond = (mPond: bigint) => {
	//one mPond is 10^6 pond
	return mPond * BigInt(10) ** BigInt(6);
};

export const pondToMPond = (pond: bigint) => {
	//one pond is 10^-6 mPond
	return pond / BigInt(10) ** BigInt(6);
};

export const convertRateToPerHourString = (
	rate: bigint,
	decimal = DEFAULT_CURRENCY_DECIMALS,
	precision = DEFAULT_PRECISION
) => {
	const rateInHour = rate * BigInt(SECONDS_IN_HOUR);
	return bigNumberToString(rateInHour, decimal, precision);
};

export const convertHourlyRateToSecondlyRate = (rate: bigint) => {
	return rate / BigInt(SECONDS_IN_HOUR);
};
