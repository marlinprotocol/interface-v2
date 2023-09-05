import {
	BIG_NUMBER_ZERO,
	DEFAULT_CURRENCY_DECIMALS,
	DEFAULT_PRECISION,
	SECONDS_IN_HOUR,
	SECONDS_IN_HUNDRED_YEARS
} from '$lib/utils/constants/constants';

import { ethers } from 'ethers';

/**
 * Returns duration string for a epoch
 * @param epoch epoch
 * @param mini boolean optional default as false. if true, returns only months, days, hours, mins, secs
 * @returns string
 * @example 12334422 => 4 months 22 days 18 hours 13 mins 42 secs
 */
export const epochToDurationString = (epoch: number, mini = false, uptoHoursOnly = false) => {
	if (epoch >= SECONDS_IN_HUNDRED_YEARS) return '100+ years';
	const seconds = epoch % 60;
	const minutes = Math.floor(epoch / 60) % 60;
	const hours = Math.floor(epoch / (60 * 60)) % 24;
	const days = Math.floor(epoch / (60 * 60 * 24)) % 30;
	const months = Math.floor(epoch / (60 * 60 * 24 * 30)) % 12;
	const years = Math.floor(epoch / (60 * 60 * 24 * 30 * 12));

	let durationString = '';
	if (years > 0) {
		durationString += years + (years > 1 ? ' years ' : ' year ');
		if (mini) return durationString;
	}
	if (months > 0) {
		durationString += months + (months > 1 ? ' months ' : ' month ');
		if (mini) return durationString;
	}
	if (days > 0) {
		durationString += days + (days > 1 ? ' days ' : ' day ');
		if (mini) return durationString;
	}
	if (hours > 0) {
		durationString += hours + (hours > 1 ? ' hours ' : ' hour ');
		if (mini) return durationString;
	}
	if (!uptoHoursOnly) {
		if (minutes > 0) {
			durationString += minutes + (minutes > 1 ? ' mins ' : ' min ');
			if (mini) return durationString;
		}
		if (seconds > 0) {
			durationString += seconds.toFixed() + ' secs';
			if (mini) return durationString;
		}
	}

	return durationString;
};

function roundNumberString(numString: string, decimals = DEFAULT_PRECISION) {
	const num = Number(numString);
	const roundedNum = num.toFixed(decimals);
	return roundedNum;
}

// TODO: remove this function and use bigNumberToString instead
/**
 * Returns comma separated string with set of decimals for a big number
 * @param value big number
 * @param decimals decimals of the fractional part
 * @returns string
 */
export const bigNumberToCommaString = (value: bigint, decimals = DEFAULT_PRECISION) => {
	let result = ethers.formatEther(value);

	// Replace 0.0 by an empty value
	if (result === '0.0') return '0';

	let compareNum = BIG_NUMBER_ZERO;

	try {
		compareNum = BigInt(10) ** BigInt(DEFAULT_CURRENCY_DECIMALS - decimals);
	} catch (e) {
		console.log('e :>> ', e);
	}

	if (value > compareNum) {
		result = roundNumberString(result, decimals).toLocaleString();
		//add 0 to the end if decimal count is less than 2
		if (result.split('.')[1]?.length < 2) {
			result = result + '0';
		}
		return result;
	} else {
		return '0' + '.' + '0'.repeat(decimals);
	}
};

/**
 * Returns string for a big number
 * @param value: big number
 * @param bigNumberDecimal: decimal of the big number, default set to 18
 * @param precision: number of digits after the decimal point, default set to 2
 * @param commify: boolean, default set to true
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

	const formattedValue = ethers.formatUnits(value, bigNumberDecimal);

	if (!formattedValue.includes('.')) {
		// Integer value, no decimal part
		return BigInt(formattedValue).toLocaleString('en-US') + '.' + '0'.repeat(precision);
	}

	const [integerPart, decimalPart] = formattedValue.split('.');
	const commifiedIntegerPart = commify ? BigInt(integerPart).toLocaleString() : integerPart;
	const truncatedDecimalPart = decimalPart.slice(0, precision).padEnd(precision, '0');

	return `${commifiedIntegerPart}.${truncatedDecimalPart}`;
};

//return bignumber from string with decimal
export const stringToBigNumber = (value: string, bigNumberDecimal = DEFAULT_CURRENCY_DECIMALS) => {
	if (!value) return BIG_NUMBER_ZERO;
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
		day: 'numeric'
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
	return text.slice(0, first) + '...' + text.slice(-last);
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
