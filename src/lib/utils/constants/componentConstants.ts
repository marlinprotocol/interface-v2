import type { CommonVariant } from '$lib/types/componentTypes';
import infoCircle from 'svelte-awesome/icons/infoCircle';
import checkCircle from 'svelte-awesome/icons/checkCircle';
import warning from 'svelte-awesome/icons/warning';
import timesCircle from 'svelte-awesome/icons/timesCircle';

export const getIconbyVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'success':
			return checkCircle;
		case 'info':
			return infoCircle;
		case 'warning':
			return warning;
		case 'error':
			return timesCircle;
		default:
			return infoCircle;
	}
};

export const getColorClassByVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'success':
			return 'primary-content';
		case 'info':
			return 'primary-content';
		case 'warning':
			return 'primary-content';
		case 'error':
			return 'error-content';
		default:
			return 'primary-content';
	}
};

export const getTextColorClassByVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'primary':
			return 'text-primary';
		case 'secondary':
			return 'text-secondary';
		case 'success':
			return 'text-success';
		case 'info':
			return 'text-grey-500';
		case 'warning':
			return 'text-warning';
		case 'error':
			return 'text-error';
		case 'disabled':
			return 'text-primary opacity-40';
		default:
			return '';
	}
};

export const getImageClassByVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'primary':
			return 'primary-img';
		case 'info':
		case 'secondary':
			return 'secondary-img';
		case 'warning':
			return 'warning-img';
		case 'error':
			return 'error-img';
		case 'success':
			return 'success-img';
		case 'disabled':
			return 'disabled-img';
		default:
			return 'primary-img';
	}
};

export const getImagebyWalletProvider = (walletProvider: string) => {
	switch (walletProvider?.toLowerCase()) {
		case 'metamask':
			return '/images/metamaskicon.svg';
		case 'walletconnect':
			return '/images/walleticon.svg';
		default:
			return '';
	}
};
