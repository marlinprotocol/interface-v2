import { buttonClasses } from '$lib/atoms/v2/componentClasses';
import { staticImages } from '$lib/components/images/staticImages';
import { addToast } from '$lib/data-stores/toastStore';
import type { ButtonModel, CommonVariant, InputCardVariant } from '$lib/types/v2/componentTypes';
import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';

export const getButtonStyles = (variant: ButtonModel['variant']) => {
	switch (variant) {
		case 'filled':
			return buttonClasses.filled;
		case 'outlined':
			return buttonClasses.outlined;
		case 'greyOutlined':
			return buttonClasses.greyOutlined;
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

export const getInputCardVariant = (variant: InputCardVariant | undefined) => {
	switch (variant) {
		case 'primary':
			return 'bg-white px-6 py-[30px] rounded-3xl border border-[#D9DADE]';
		case 'primary-mini':
			return 'bg-base-200 py-2 px-4';
		case 'warning':
			return 'bg-red-100 px-4 py-1';
		case 'yellow':
			return 'bg-[#EDBE59]';
		case 'green':
			return 'bg-[#68A843]';
		case 'none':
			return '';
		case 'search':
			return 'bg-white px-4 py-2.5 rounded-[100px]';
		case 'v2Input':
			return 'relative border border-[#D9DADE] bg-white py-[20px] px-[18px] rounded-full';
		default:
			return 'bg-base-200 p-4';
	}
};

export const getColorClassByVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'success':
			return 'bg-[#F4F9F0]';
		case 'warning':
			return 'bg-[#FCEFD4]';
		case 'error':
			return 'bg-[#FEE6E6]';
		default:
			return '';
	}
};

export const getIconbyVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'success':
			return staticImages.toastSuccessAlert;
		case 'warning':
			return staticImages.toastWarningAlert;
		case 'error':
			return staticImages.toastErrorAlert;
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
			return '';
	}
};
export const getColorHexByVariantForTag = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'primary':
			return '#0F62FE23';
		case 'success':
			return '#F4F9F0';
		case 'warning':
			return '#FCEFD4';
		case 'error':
			return '#FEE6E6';
		default:
			return '';
	}
};

// -------------------------------------------- USER INTERACTION HELPERS ----------------------------------------
export const handleCopyClick = (text: string | undefined, successMessage: string) => {
	if (text) {
		copyTextToClipboard(text);
		addToast({ message: successMessage, variant: 'success' });
	}
};
