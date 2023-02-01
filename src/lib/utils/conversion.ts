import { ethers, type BigNumber } from 'ethers';

export const amountDivideByPow18 = (amount: number) => {
	return amount / Math.pow(10, 18);
};

export const bigNumbertoString = (amount: BigNumber) => {
	// TODO: add precision to 2 decimal places
	return parseFloat(ethers.utils.formatEther(amount)).toLocaleString();
};

export const bigNumbertoNumber = (amount: BigNumber) => {
	return parseFloat(ethers.utils.formatEther(amount));
};

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
