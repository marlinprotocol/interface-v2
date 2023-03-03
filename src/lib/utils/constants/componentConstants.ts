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
		case 'success':
			return 'text-primary-content';
		case 'info':
			return 'text-primary-content';
		case 'warning':
			return 'text-primary-content';
		case 'error':
			return 'text-error-content';
		default:
			return 'text-primary-content';
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
