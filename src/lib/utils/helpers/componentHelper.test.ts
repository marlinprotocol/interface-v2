import { buttonClasses } from '$lib/atoms/componentClasses';
import { staticImages } from '$lib/components/images/staticImages';
import {
	getButtonStyles,
	getTextColorClassByVariant,
	getColorHexForTableRow,
	getInputCardVariant,
	getColorClassByVariant,
	getIconbyVariant,
	getImageClassByVariant,
	getColorHexByVariant,
	getColorHexByVariantForTag,
	getButtonSize
} from './componentHelper';

describe('getButtonStyles', () => {
	it('should return correct styles for each variant', () => {
		expect(getButtonStyles('filled')).toBe(buttonClasses.filled);
		expect(getButtonStyles('outlined')).toBe(buttonClasses.outlined);
		expect(getButtonStyles('greyOutlined')).toBe(buttonClasses.greyOutlined);
		expect(getButtonStyles('error')).toBe(buttonClasses.error);
		expect(getButtonStyles('text')).toBe(buttonClasses.text);
		expect(getButtonStyles('info')).toBe(buttonClasses.lightblueFilled);
		expect(getButtonStyles('greyFilled')).toBe(buttonClasses.greyFilled);
		expect(getButtonStyles('whiteFilled')).toBe(buttonClasses.whiteFilled);
		expect(getButtonStyles('tableConvertButton')).toBe(buttonClasses.tableConvertButton);
		expect(getButtonStyles('icon')).toBe(buttonClasses.icon);
	});

	it('should default to filled style for unknown variants', () => {
		expect(getButtonStyles('unknownVariant')).toBe(buttonClasses.filled);
	});
});

describe('getTextColorClassByVariant', () => {
	it('should return correct text color classes for each variant', () => {
		expect(getTextColorClassByVariant('primary')).toBe('text-primary');
		expect(getTextColorClassByVariant('secondary')).toBe('text-secondary');
		expect(getTextColorClassByVariant('success')).toBe('text-primary-content');
		expect(getTextColorClassByVariant('info')).toBe('text-primary-content');
		expect(getTextColorClassByVariant('warning')).toBe('text-primary-content');
		expect(getTextColorClassByVariant('error')).toBe('text-error-content');
		expect(getTextColorClassByVariant('disabled')).toBe('text-primary opacity-40');
		expect(getTextColorClassByVariant('grey')).toBe('text-grey-500');
	});

	it('should return empty string for undefined variant', () => {
		expect(getTextColorClassByVariant(undefined)).toBe('');
	});
});

describe('getColorHexForTableRow', () => {
	it('should return correct color hex codes for each index', () => {
		expect(getColorHexForTableRow(0)).toBe('#AF2EFF');
		expect(getColorHexForTableRow(1)).toBe('#9868FF');
		expect(getColorHexForTableRow(2)).toBe('#4171EA');
		expect(getColorHexForTableRow(3)).toBe('#4FA0FF');
		expect(getColorHexForTableRow(4)).toBe('#4FC0FF');
		expect(getColorHexForTableRow(5)).toBe('#25CFDA');
		expect(getColorHexForTableRow(6)).toBe('#19CDB7');
		expect(getColorHexForTableRow(7)).toBe('#1EC086');
		expect(getColorHexForTableRow(8)).toBe('#3DAE56');
		expect(getColorHexForTableRow(9)).toBe('#D8D013');
	});
});

describe('getInputCardVariant', () => {
	it('should return correct styles for each variant', () => {
		expect(getInputCardVariant('primary')).toBe(
			'bg-white px-6 py-[30px] rounded-3xl border border-[#D9DADE]'
		);
		expect(getInputCardVariant('primary-mini')).toBe('bg-base-200 py-2 px-4');
		expect(getInputCardVariant('warning')).toBe('bg-red-100 px-4 py-1');
		expect(getInputCardVariant('yellow')).toBe('bg-[#EDBE59]');
		expect(getInputCardVariant('green')).toBe('bg-[#68A843]');
		expect(getInputCardVariant('none')).toBe('');
		expect(getInputCardVariant('search')).toBe('bg-white px-4 py-2.5 rounded-[100px]');
		expect(getInputCardVariant('v2Input')).toBe(
			'relative border border-[#D9DADE] bg-white py-2.5 px-4 rounded-full'
		);
	});

	it('should return default style for undefined variant', () => {
		expect(getInputCardVariant(undefined)).toBe('bg-base-200 p-4');
	});
});

describe('getColorClassByVariant', () => {
	it('should return correct background color classes for each variant', () => {
		expect(getColorClassByVariant('success')).toBe('bg-[#F4F9F0]');
		expect(getColorClassByVariant('warning')).toBe('bg-[#FCEFD4]');
		expect(getColorClassByVariant('error')).toBe('bg-[#FEE6E6]');
	});

	it('should return empty string for undefined variant', () => {
		expect(getColorClassByVariant(undefined)).toBe('');
	});
});

describe('getIconbyVariant', () => {
	it('should return correct static images for each variant', () => {
		expect(getIconbyVariant('success')).toBe(staticImages.toastSuccessAlert);
		expect(getIconbyVariant('warning')).toBe(staticImages.toastWarningAlert);
		expect(getIconbyVariant('error')).toBe(staticImages.toastErrorAlert);
	});

	it('should return empty string for undefined variant', () => {
		expect(getIconbyVariant(undefined)).toBe('');
	});
});

describe('getImageClassByVariant', () => {
	it('should return correct image class names for each variant', () => {
		expect(getImageClassByVariant('primary')).toBe('primary-img');
		expect(getImageClassByVariant('info')).toBe('secondary-img');
		expect(getImageClassByVariant('secondary')).toBe('secondary-img');
		expect(getImageClassByVariant('warning')).toBe('warning-img');
		expect(getImageClassByVariant('error')).toBe('error-img');
		expect(getImageClassByVariant('success')).toBe('success-img');
		expect(getImageClassByVariant('disabled')).toBe('disabled-img');
		expect(getImageClassByVariant('grey')).toBe('grey-img');
	});

	it('should return primary image class for undefined variant', () => {
		expect(getImageClassByVariant(undefined)).toBe('primary-img');
	});
});

describe('getColorHexByVariant', () => {
	it('should return correct color hex codes for each variant', () => {
		expect(getColorHexByVariant('primary')).toBe('#0F62FE');
		expect(getColorHexByVariant('secondary')).toBe('#6F6F6F');
		expect(getColorHexByVariant('success')).toBe('#24A148');
		expect(getColorHexByVariant('info')).toBe('#0062FF');
		expect(getColorHexByVariant('warning')).toBe('#f1861b');
		expect(getColorHexByVariant('error')).toBe('#DA1E28');
		expect(getColorHexByVariant('disabled')).toBe('#0F62FE');
		expect(getColorHexByVariant('grey')).toBe('#6F6F6F');
	});

	it('should return empty string for undefined variant', () => {
		expect(getColorHexByVariant(undefined)).toBe('');
	});
});

describe('getColorHexByVariantForTag', () => {
	it('should return correct color hex codes for each variant', () => {
		expect(getColorHexByVariantForTag('primary')).toBe('#0F62FE23');
		expect(getColorHexByVariantForTag('success')).toBe('#F4F9F0');
		expect(getColorHexByVariantForTag('warning')).toBe('#FCEFD4');
		expect(getColorHexByVariantForTag('error')).toBe('#FEE6E6');
	});

	it('should return empty string for undefined variant', () => {
		expect(getColorHexByVariantForTag(undefined)).toBe('');
	});
});

describe('getButtonSize', () => {
	it('should return correct CSS classes for each size', () => {
		expect(getButtonSize('tiniest')).toBe('');
		expect(getButtonSize('tiny')).toBe('h-8');
		expect(getButtonSize('smaller')).toBe('h-9');
		expect(getButtonSize('small')).toBe('h-10');
		expect(getButtonSize('medium')).toBe('h-12');
		expect(getButtonSize('large')).toBe('h-14 text-base font-normal');
	});

	it('should return undefined for undefined size', () => {
		expect(getButtonSize(undefined)).toBe(undefined);
	});
});
