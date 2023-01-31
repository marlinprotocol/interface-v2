import type { CommonVariant } from '$lib/types/componentTypes';

export const getIconbyVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'success':
			return './images/check-circle.svg';
		case 'info':
			return './images/infoSecondary.svg';
		case 'warning':
			return './images/warning.svg';
		case 'error':
			return './images/error.svg';
		default:
			return './images/infoSecondary.svg';
	}
};

export const getColorClassByVariant = (variant: CommonVariant | undefined) => {
	switch (variant) {
		case 'success':
			return 'text-primary-content';
		case 'info':
			return '';
		case 'warning':
			return 'text-primary-content';
		case 'error':
			return 'text-error-content';
		default:
			return '';
	}
};
