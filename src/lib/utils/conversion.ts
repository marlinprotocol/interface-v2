import { BigNumber, ethers } from 'ethers';
import { BigNumberZero } from './constants/constants';

export const hundredYears = 60 * 60 * 24 * 365 * 100;

/**
 * Returns duration string for a epoch
 * @param epoch epoch
 * @param mini boolean optional default as false. if true, returns only months, days, hours, mins, secs
 * @returns string
 * @example 12334422 => 4 months 22 days 18 hours 13 mins 42 secs
 */
export const epochToDurationString = (epoch: number, mini = false) => {
	if (epoch >= hundredYears) return '100+ years';
	const seconds = epoch % 60;
	const minutes = Math.floor(epoch / 60) % 60;
	const hours = Math.floor(epoch / (60 * 60)) % 24;
	const days = Math.floor(epoch / (60 * 60 * 24)) % 30;
	const months = Math.floor(epoch / (60 * 60 * 24 * 30));

	let durationString = '';
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
	if (minutes > 0) {
		durationString += minutes + (minutes > 1 ? ' mins ' : ' min ');
		if (mini) return durationString;
	}
	if (seconds > 0) {
		durationString += seconds.toFixed() + ' secs';
		if (mini) return durationString;
	}

	return durationString;
};

function roundNumberString(numString: string, decimals = 2) {
	const num = Number(numString);
	const roundedNum = num.toFixed(decimals);
	return roundedNum;
}

/**
 * Returns comma separated string with set of decimals for a big number
 * @param value big number
 * @param decimals decimals of the fractional part
 * @returns string
 */
export const bigNumberToCommaString = (value: BigNumber, decimals = 2) => {
	let result = ethers.utils.formatEther(value);

	// Replace 0.0 by an empty value
	if (result === '0.0') return '0';

	if (value.gt(10 ** (decimals - 1))) {
		result = ethers.utils.commify(roundNumberString(result, decimals));
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
 * @returns string
 */
export const bigNumberToString = (value: BigNumber, bigNumberDecimal = 18) => {
	if (!value) return '0.00';
	let ret = ethers.utils.formatUnits(value, bigNumberDecimal);
	//if decimal count is less than 2, pad end it with 0
	if (ret.split('.')[1].length < 2) {
		ret = ret.split('.')[0] + '.' + ret.split('.')[1].padEnd(2, '0');
	}
	return ret;
};

//return bignumber from string with decimal
export const stringToBigNumber = (value: string, bigNumberDecimal = 18) => {
	if (!value) return BigNumberZero;
	let newValue = value;
	// eslint-disable-next-line prefer-const
	let [integer, fraction] = value.split('.');

	if (fraction && fraction.length > bigNumberDecimal) {
		fraction = fraction.slice(0, bigNumberDecimal);
		newValue = integer + '.' + fraction;
	}
	return ethers.utils.parseUnits(newValue, bigNumberDecimal);
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

export const mPondToPond = (mPond: BigNumber) => {
	//one mPond is 10^6 pond
	return mPond.mul(ethers.BigNumber.from(10).pow(6));
};

export const pondToMPond = (pond: BigNumber) => {
	//one pond is 10^-6 mPond
	return pond.div(ethers.BigNumber.from(10).pow(6));
};
