import { buttonClasses } from '$lib/atoms/v2/componentClasses';
import type { InputCardVariant } from '$lib/types/componentTypes';
import type { ButtonModel } from '$lib/types/v2/componentTypes';

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

export const getInputCardVariant = (variant: InputCardVariant | undefined) => {
	switch (variant) {
		case 'primary':
			return 'bg-base-200 p-4';

		case 'primary-mini':
			return 'bg-base-200 py-2 px-4';

		case 'warning':
			return 'bg-red-100 px-4 py-1';

		case 'none':
			return '';

		case 'search':
			return 'bg-transparent px-4 py-2.5 rounded-[100px]';

		default:
			return 'bg-base-200 p-4';
	}
};
