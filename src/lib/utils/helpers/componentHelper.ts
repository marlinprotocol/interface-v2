import type { CommonVariant } from '$lib/types/componentTypes';
import infoCircle from 'svelte-awesome/icons/infoCircle';
import checkCircle from 'svelte-awesome/icons/checkCircle';
import warning from 'svelte-awesome/icons/warning';
import timesCircle from 'svelte-awesome/icons/timesCircle';
import { staticImages } from '$lib/components/images/staticImages';
import { copyTextToClipboard } from './commonHelper';
import { addToast } from '$lib/data-stores/toastStore';

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
			return 'text-primary-content';
		case 'info':
			return 'text-primary-content';
		case 'warning':
			return 'text-primary-content';
		case 'error':
			return 'text-error-content';
		case 'disabled':
			return 'text-primary opacity-40';
		case 'grey':
			return 'text-grey-500';
		default:
			return 'text-primary-content';
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
		case 'grey':
			return 'grey-img';
		default:
			return 'primary-img';
	}
};

export const getImagebyWalletProvider = (walletProvider: string) => {
	switch (walletProvider?.toLowerCase()) {
		case 'metamask':
			return staticImages.Metamask;
		case 'walletconnect':
			return staticImages.WalletConnect;
		default:
			return '';
	}
};

export const getColorHexByVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'primary':
			return '#0F62FE';
		case 'secondary':
			return '#6F6F6F';
		case 'success':
			return '#24A148';
		case 'info':
			return '#0062FF';
		case 'warning':
			return '#f1861b';
		case 'error':
			return '#DA1E28';
		case 'disabled':
			return '#0F62FE';
		case 'grey':
			return '#6F6F6F';
		default:
			return '#0F62FE';
	}
};

export const getColorHexForTableRow = (index: number) => {
	const remainder = index % 10;
	switch (remainder) {
		case 0:
			return '#AF2EFF';
		case 1:
			return '#9868FF';
		case 2:
			return '#4171EA';
		case 3:
			return '#4FA0FF';
		case 4:
			return '#4FC0FF';
		case 5:
			return '#25CFDA';
		case 6:
			return '#19CDB7';
		case 7:
			return '#1EC086';
		case 8:
			return '#3DAE56';
		case 9:
			return '#D8D013';
	}
};

export const handleCopyClick = (text: string | undefined, successMessage: string) => {
	if (text) {
		copyTextToClipboard(text);
		addToast({ message: successMessage, variant: 'success' });
	}
};
