import type {
	AppVariant,
	ButtonModel,
	CommonVariant,
	DividerDirection,
	InputCardVariant,
	TextModel
} from '$lib/types/componentTypes';
import infoCircle from 'svelte-awesome/icons/infoCircle';
import checkCircle from 'svelte-awesome/icons/checkCircle';
import warning from 'svelte-awesome/icons/warning';
import timesCircle from 'svelte-awesome/icons/timesCircle';
import { staticImages } from '$lib/components/images/staticImages';
import { copyTextToClipboard } from './commonHelper';
import { addToast } from '$lib/data-stores/toastStore';
import { buttonClasses } from '$lib/atoms/componentClasses';

// -------------------------------------------- IMAGE HELPERS --------------------------------------
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
			return '';
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

// -------------------------------------------- CLASS HELPERS --------------------------------------
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
		case 'grey':
			return 'grey-img';
		default:
			return 'primary-img';
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
			return '';
	}
};

// -------------------------------------------- COLOR HELPERS --------------------------------------
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
			return '';
	}
};

// these color codes are part of the design system, we assume number of rows to be 10 adding more rows would require adding more colors
export const getColorHexForTableRow = (index: number) => {
	const remainder = Math.abs(index) % 10;
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

// -------------------------------------------- BUTTON HELPERS --------------------------------------
export const getButtonStyles = (variant: ButtonModel['variant']) => {
	switch (variant) {
		case 'filled':
			return buttonClasses.filled;
		case 'outlined':
			return buttonClasses.outlined;
		case 'error':
			return buttonClasses.error;
		case 'text':
			return buttonClasses.text;
		case 'info':
			return buttonClasses.lightblueFilled;
		case 'greyFilled':
			return buttonClasses.greyFilled;
		case 'whiteFilled':
			return buttonClasses.whiteFilled;
		case 'tableConvertButton':
			return buttonClasses.tableConvertButton;
		default:
			return buttonClasses.filled;
	}
};

export const getButtonSize = (size: ButtonModel['size']) => {
	switch (size) {
		case 'tiniest':
			return '';
		case 'tiny':
			return 'h-8';
		case 'smaller':
			return 'h-9';
		case 'small':
			return 'h-10';
		case 'medium':
			return 'h-12';
		case 'large':
			return 'h-14 text-base font-semibold';
		default:
			return undefined;
	}
};

// -------------------------------------------- INPUT CARD HELPERS ----------------------------------
export const getInputCardVariant = (variant: InputCardVariant | undefined) => {
	switch (variant) {
		case 'primary':
			return 'bg-white px-6 py-[30px] rounded-3xl border border-[#D9DADE]';

		case 'primary-mini':
			return 'bg-base-200 py-2 px-4';

		case 'warning':
			return 'bg-red-100 px-4 py-1';

		case 'none':
			return '';

		case 'search':
			return 'bg-[#dfedf9] px-4 py-2.5';

		default:
			return 'bg-base-200 p-4';
	}
};

// -------------------------------------------- CHIP HELPERS -----------------------------------------
export const getChipVariant = (variant: AppVariant) => {
	switch (variant) {
		case 'primary':
			return 'bg-base-200 text-primary font-semibold';

		case 'secondary':
			return 'bg-grey-200 text-[#6f6f71]';
	}
};

// -------------------------------------------- DIVIDER HELPERS --------------------------------------
export const getDividerColor = (variant: DividerDirection) => {
	switch (variant) {
		case 'divider-horizontal':
			return 'bg-black/[0.1]';
		case 'divider-vertical':
			return 'bg-grey-500';
	}
};

export const getDividerWidth = (variant: DividerDirection) => {
	switch (variant) {
		case 'divider-horizontal':
			return 'w-full';
		case 'divider-vertical':
			return 'w-[1px]';
	}
};

export const getDividerHeight = (variant: DividerDirection) => {
	switch (variant) {
		case 'divider-horizontal':
			return 'h-[1px]';
		case 'divider-vertical':
			return 'h-4';
	}
};

// -------------------------------------------- FONT HELPERS ----------------------------------------
export const getFontSize = (variant: TextModel['variant']) => {
	switch (variant) {
		case 'h1':
			return 'text-4xl';
		case 'h2':
			return 'text-3xl';
		case 'h3':
			return 'text-2xl';
		case 'h4':
			return 'text-xl';
		case 'h5':
			return 'text-lg';
		case 'h6':
		case 'body':
			return 'text-base';
		case 'small':
			return 'text-sm';
		case 'tiny':
			return 'text-xs';
		case 'nav':
			return 'text-sm';
	}
};

export const getDefaultFontWeight = (variant: TextModel['variant'] | undefined) => {
	switch (variant) {
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
			return 'font-bold';
		case 'h6':
			return 'font-semibold';
		case 'body':
		case 'small':
		case 'tiny':
			return 'font-normal';
		case 'nav':
			return 'font-semibold';
		default:
			return 'font-normal';
	}
};

// -------------------------------------------- USER INTERACTION HELPERS ----------------------------------------
export const handleCopyClick = (text: string | undefined, successMessage: string) => {
	if (text) {
		copyTextToClipboard(text);
		addToast({ message: successMessage, variant: 'success' });
	}
};
