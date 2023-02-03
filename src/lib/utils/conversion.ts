import { ethers, type BigNumber } from 'ethers';

/**
 * Returns duration string for a epoch
 * @param epoch: epoch
 * @returns string
 * @example 12334422 => 4 months 22 days 18 hours 13 mins 42 secs
 */
export const epochToDurationString = (epoch: number) => {
	var seconds = epoch % 60;
	var minutes = Math.floor(epoch / 60) % 60;
	var hours = Math.floor(epoch / (60 * 60)) % 24;
	var days = Math.floor(epoch / (60 * 60 * 24)) % 30;
	var months = Math.floor(epoch / (60 * 60 * 24 * 30));

	var durationString = '';
	if (months > 0) {
		durationString += months + (months > 1 ? ' months ' : ' month ');
	}
	if (days > 0) {
		durationString += days + (days > 1 ? ' days ' : ' day ');
	}
	if (hours > 0) {
		durationString += hours + (hours > 1 ? ' hours ' : ' hour ');
	}
	if (minutes > 0) {
		durationString += minutes + (minutes > 1 ? ' mins ' : ' min ');
	}
	if (seconds > 0) {
		durationString += seconds.toFixed() + ' secs';
	}

	return durationString;
};

/**
 * Returns comma separated string for a number
 * @param value: number
 * @returns string
 * @example 1234567 => 1,234,567
 */
export const intStringToCommaString = (value: string) => {
	return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Returns comma separated string with set of decimals for a big number
 * @param value: big number
 * @param decimals: decimals of the fractional part
 * @param bigNumberDecimal: decimal of the big number, default set to 18
 * @returns string
 */
export const bigNumberToCommaString = (
	value: BigNumber,
	decimals: number,
	bigNumberDecimal: number = 18
) => {
	let result = ethers.utils.formatUnits(value, bigNumberDecimal);
	let [integer, fraction] = result.split('.');
	const fractionTrim = fraction?.length > decimals ? fraction.slice(0, decimals) : fraction;
	return intStringToCommaString(integer) + '.' + fractionTrim;
};
