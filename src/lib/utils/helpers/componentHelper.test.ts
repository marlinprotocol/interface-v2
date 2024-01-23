import {
	getButtonSize,
	getButtonStyles,
	getChipVariant,
	getColorClassByVariant,
	getColorHexByVariant,
	getColorHexForTableRow,
	getDefaultFontWeight,
	getDividerColor,
	getDividerHeight,
	getDividerWidth,
	getFontSize,
	getIconbyVariant,
	getImageClassByVariant,
	getImagebyWalletProvider,
	getInputCardVariant,
	getTextColorClassByVariant
} from './componentHelper';
import checkCircle from 'svelte-awesome/icons/checkCircle';
import infoCircle from 'svelte-awesome/icons/infoCircle';
import warning from 'svelte-awesome/icons/warning';
import timesCircle from 'svelte-awesome/icons/timesCircle';
import { staticImages } from '$lib/components/images/staticImages';
import { buttonClasses } from '$lib/atoms/componentClasses';

describe('getIconByVariant', () => {
	it('should return checkCircle when argument is success', () => {
		expect(getIconbyVariant('success')).toBe(checkCircle);
	});

	it('should return infoCircle when argument is info', () => {
		expect(getIconbyVariant('info')).toBe(infoCircle);
	});

	it('should return warning when argument is warning', () => {
		expect(getIconbyVariant('warning')).toBe(warning);
	});

	it('should return timesCirlce when argument is error', () => {
		expect(getIconbyVariant('error')).toBe(timesCircle);
	});

	it('should return infoCircle when argument is undefined', () => {
		expect(getIconbyVariant(undefined)).toBe('');
	});
});

describe('getImagebyWalletProvider', () => {
	it('should return the metamask image when argument is metamask', () => {
		expect(getImagebyWalletProvider('metamask')).toBe(staticImages.Metamask);
	});

	it('should return the walletconnect image when the argument is walletconnect', () => {
		expect(getImagebyWalletProvider('walletconnect')).toBe(staticImages.WalletConnect);
	});

	it('should return undefined when the argument is other than expected strings', () => {
		expect(getImagebyWalletProvider('somethingunexpected')).toBe('');
		expect(getImagebyWalletProvider('')).toBe('');
	});
});

describe('getColorClassByVariant', () => {
	it('should return the class primary-content when argument is success', () => {
		expect(getColorClassByVariant('success')).toBe('primary-content');
	});

	it('should return the class primary-content when argument is info', () => {
		expect(getColorClassByVariant('info')).toBe('primary-content');
	});

	it('should return the class primary-content when the argument is warning', () => {
		expect(getColorClassByVariant('warning')).toBe('primary-content');
	});

	it('should return the class error-content when the argument is error', () => {
		expect(getColorClassByVariant('error')).toBe('error-content');
	});

	it('should return the class primary-content when the argument is undefined', () => {
		expect(getColorClassByVariant(undefined)).toBe('');
	});
});

describe('getImageClassByVariant', () => {
	it('should return the class primary-img when the argument is primary', () => {
		expect(getImageClassByVariant('primary')).toBe('primary-img');
	});

	it('should return the class secondary-img when the argument is secondary or info', () => {
		expect(getImageClassByVariant('secondary')).toBe('secondary-img');
	});

	it('should return the class warning-img when the argument is warning', () => {
		expect(getImageClassByVariant('warning')).toBe('warning-img');
	});

	it('should return the class error-img when the argument is error', () => {
		expect(getImageClassByVariant('error')).toBe('error-img');
	});

	it('should return the class success-img when the argument is success', () => {
		expect(getImageClassByVariant('success')).toBe('success-img');
	});

	it('should return the class disabled-img when the argument is disabled', () => {
		expect(getImageClassByVariant('disabled')).toBe('disabled-img');
	});

	it('should return the class grey-img when the argument is grey', () => {
		expect(getImageClassByVariant('grey')).toBe('grey-img');
	});

	it('should return the class primary-img when the argument is undefined', () => {
		expect(getImageClassByVariant(undefined)).toBe('primary-img');
	});
});

describe('getTextColorClassByVariant', () => {
	it('shoulr return the class text-primary when the argument is primary', () => {
		expect(getTextColorClassByVariant('primary')).toBe('text-primary');
	});

	it('should return the class text-secondary when the argument is secondary', () => {
		expect(getTextColorClassByVariant('secondary')).toBe('text-secondary');
	});

	it('should return the class text-primary-content when the argument is success', () => {
		expect(getTextColorClassByVariant('success')).toBe('text-primary-content');
	});

	it('should return the class text-primary-content when the argument is info', () => {
		expect(getTextColorClassByVariant('info')).toBe('text-primary-content');
	});

	it('should return the class text-primary-content when the argument is warning', () => {
		expect(getTextColorClassByVariant('warning')).toBe('text-primary-content');
	});

	it('should return the class text-error-content when the argument is error', () => {
		expect(getTextColorClassByVariant('error')).toBe('text-error-content');
	});

	it('should return the classes text-primary and opacity-40 when the argument is disabled', () => {
		expect(getTextColorClassByVariant('disabled')).toBe('text-primary opacity-40');
	});

	it('should return the class text-grey-500 when the argument is grey', () => {
		expect(getTextColorClassByVariant('grey')).toBe('text-grey-500');
	});

	it('should return the class text-primary-content when the argument is undefined', () => {
		expect(getTextColorClassByVariant(undefined)).toBe('');
	});
});

describe('getColorHexByVariant', () => {
	it('should return the color of primary variant when argument is primary', () => {
		expect(getColorHexByVariant('primary')).toBe('#0F62FE');
	});

	it('should return the color of secondary variant when argument is secondary', () => {
		expect(getColorHexByVariant('secondary')).toBe('#6F6F6F');
	});

	it('should return the color of success variant when argument is success', () => {
		expect(getColorHexByVariant('success')).toBe('#24A148');
	});

	it('should return the color of info variant when argument is info', () => {
		expect(getColorHexByVariant('info')).toBe('#0062FF');
	});

	it('should return the color of warning variant when argument is warning', () => {
		expect(getColorHexByVariant('warning')).toBe('#f1861b');
	});

	it('should return the color of error variant when argument is error', () => {
		expect(getColorHexByVariant('error')).toBe('#DA1E28');
	});

	it('should return the color of disabled variant when argument is disabled', () => {
		expect(getColorHexByVariant('disabled')).toBe('#0F62FE');
	});

	it('should return the color of grey variant when argument is grey', () => {
		expect(getColorHexByVariant('grey')).toBe('#6F6F6F');
	});

	it('should return the color of default variant when argument is undefined', () => {
		expect(getColorHexByVariant(undefined)).toBe('');
	});
});

describe('getColorHexForTableRow', () => {
	it('should return color for index 0 when the mod of argument with our range is 0', () => {
		expect(getColorHexForTableRow(0)).toBe('#AF2EFF');
	});
	it('should return color for index 1 when the mod of argument with our range is 1', () => {
		expect(getColorHexForTableRow(1)).toBe('#9868FF');
		expect(getColorHexForTableRow(-1)).toBe('#9868FF');
	});
	it('should return color for index 2 when the mod of argument with our range is 2', () => {
		expect(getColorHexForTableRow(2)).toBe('#4171EA');
		expect(getColorHexForTableRow(-2)).toBe('#4171EA');
	});
	it('should return color for index 3 when the mod of argument with our range is 3', () => {
		expect(getColorHexForTableRow(3)).toBe('#4FA0FF');
		expect(getColorHexForTableRow(-3)).toBe('#4FA0FF');
	});
	it('should return color for index 4 when the mod of argument with our range is 4', () => {
		expect(getColorHexForTableRow(4)).toBe('#4FC0FF');
		expect(getColorHexForTableRow(-4)).toBe('#4FC0FF');
	});
	it('should return color for index 5 when the mod of argument with our range is 5', () => {
		expect(getColorHexForTableRow(5)).toBe('#25CFDA');
		expect(getColorHexForTableRow(-5)).toBe('#25CFDA');
	});
	it('should return color for index 6 when the mod of argument with our range is 6', () => {
		expect(getColorHexForTableRow(6)).toBe('#19CDB7');
		expect(getColorHexForTableRow(-6)).toBe('#19CDB7');
	});
	it('should return color for index 7 when the mod of argument with our range is 7', () => {
		expect(getColorHexForTableRow(7)).toBe('#1EC086');
		expect(getColorHexForTableRow(-7)).toBe('#1EC086');
	});
	it('should return color for index 8 when the mod of argument with our range is 8', () => {
		expect(getColorHexForTableRow(8)).toBe('#3DAE56');
		expect(getColorHexForTableRow(-8)).toBe('#3DAE56');
	});
	it('should return color for index 9 when the mod of argument with our range is 9', () => {
		expect(getColorHexForTableRow(9)).toBe('#D8D013');
		expect(getColorHexForTableRow(-9)).toBe('#D8D013');
	});
});

describe('getButtonStyles', () => {
	it('should return the filled button styles when the argument is filled', () => {
		expect(getButtonStyles('filled')).toBe(buttonClasses.filled);
	});

	it('should return the outlined button styles when the argument is outlined', () => {
		expect(getButtonStyles('outlined')).toBe(buttonClasses.outlined);
	});

	it('should return the error button styles when the argument is error', () => {
		expect(getButtonStyles('error')).toBe(buttonClasses.error);
	});

	it('should return the text button styles when the argument is text', () => {
		expect(getButtonStyles('text')).toBe(buttonClasses.text);
	});

	it('should return the lightblueFilled button styles when the argument is info', () => {
		expect(getButtonStyles('info')).toBe(buttonClasses.lightblueFilled);
	});

	it('should return the greyFilled button styles when the argument is greyFilled', () => {
		expect(getButtonStyles('greyFilled')).toBe(buttonClasses.greyFilled);
	});

	it('should return the whiteFilled button styles when the argument is whiteFilled', () => {
		expect(getButtonStyles('whiteFilled')).toBe(buttonClasses.whiteFilled);
	});

	it('should return the tableConvertButton button styles when the argument is tableConvertButton', () => {
		expect(getButtonStyles('tableConvertButton')).toBe(buttonClasses.tableConvertButton);
	});

	it('should return the filled button styles when the argument is undefined', () => {
		expect(getButtonStyles(undefined)).toBe(buttonClasses.filled);
	});
});

describe('getButtonSize', () => {
	it('should return an empty string when passed in tiniest as the argument', () => {
		expect(getButtonSize('tiniest')).toBe('');
	});

	it('should return tiny text size when passed in tiny as the argument', () => {
		expect(getButtonSize('tiny')).toBe('h-8');
	});

	it('should return smaller text size when passed in smaller as the argument', () => {
		expect(getButtonSize('smaller')).toBe('h-9');
	});

	it('should return small text size when passed in small as the argument', () => {
		expect(getButtonSize('small')).toBe('h-10');
	});

	it('should return medium text size when passed in medium as the argument', () => {
		expect(getButtonSize('medium')).toBe('h-12');
	});
	it('should return large text size when passed in large as the argument', () => {
		expect(getButtonSize('large')).toBe('h-14 text-base font-semibold');
	});
	it('should return undefined when passed in argument is not a button size', () => {
		expect(getButtonSize(undefined)).toBe(undefined);
	});
});

describe('getInputCardVariant', () => {
	it('should return the classes for primary variant when the argument is primary', () => {
		expect(getInputCardVariant('primary')).toBe('bg-base-200 p-4');
	});
	it('should return the classes for primary-mini variant when the argument is primary-mini', () => {
		expect(getInputCardVariant('primary-mini')).toBe('bg-base-200 py-2 px-4');
	});
	it('should return the classes for warning variant when the argument is warning', () => {
		expect(getInputCardVariant('warning')).toBe('bg-red-100 px-4 py-1');
	});
	it('should return empty string when the argument is none', () => {
		expect(getInputCardVariant('none')).toBe('');
	});
	it('should return the classes for search variant when the argument is search', () => {
		expect(getInputCardVariant('search')).toBe('bg-[#dfedf9] px-4 py-2.5');
	});
	it('should return the default classes when the argument is undefined', () => {
		expect(getInputCardVariant(undefined)).toBe('bg-base-200 p-4');
	});
});

describe('getChipVariant', () => {
	it('should return the classes for primary variant when the argument is primary', () => {
		expect(getChipVariant('primary')).toBe('bg-base-200 text-primary font-semibold');
	});

	it('should return the classes for secondary variant when the argument is secondary or not an app', () => {
		expect(getChipVariant('secondary')).toBe('bg-grey-200 text-[#6f6f71]');
	});
});

describe('getDividerColor', () => {
	it('should return the color for horizontal variant when the argument is divider-horizontal', () => {
		expect(getDividerColor('divider-horizontal')).toBe('bg-black/[0.1]');
	});

	it('should return the color for vertical variant when the argument is divider-vertical', () => {
		expect(getDividerColor('divider-vertical')).toBe('bg-grey-500');
	});
});

describe('getDividerWidth', () => {
	it('should return the width for horizontal variant when the argument is divider-horizontal', () => {
		expect(getDividerWidth('divider-horizontal')).toBe('w-full');
	});

	it('should return the width for vertical variant when the argument is divider-vertical', () => {
		expect(getDividerWidth('divider-vertical')).toBe('w-[1px]');
	});
});

describe('getDividerHeight', () => {
	it('should return the height for horizontal variant when the argument is divider-horizontal', () => {
		expect(getDividerHeight('divider-horizontal')).toBe('h-[1px]');
	});

	it('should return the height for vertical variant when the argument is divider-vertical', () => {
		expect(getDividerHeight('divider-vertical')).toBe('h-4');
	});
});

describe('getFontSize', () => {
	it('should return the font size for h1 when the argument is h1', () => {
		expect(getFontSize('h1')).toBe('text-4xl');
	});
	it('should return the font size for h2 when the argument is h2', () => {
		expect(getFontSize('h2')).toBe('text-3xl');
	});
	it('should return the font size for h3 when the argument is h3', () => {
		expect(getFontSize('h3')).toBe('text-2xl');
	});
	it('should return the font size for h4 when the argument is h4', () => {
		expect(getFontSize('h4')).toBe('text-xl');
	});
	it('should return the font size for h5 when the argument is h5', () => {
		expect(getFontSize('h5')).toBe('text-lg');
	});
	it('should return the font size for h6 when the argument is h6', () => {
		expect(getFontSize('h6')).toBe('text-base');
	});
	it('should return the font size for body when the argument is body', () => {
		expect(getFontSize('body')).toBe('text-base');
	});
	it('should return the font size for small when the argument is small', () => {
		expect(getFontSize('small')).toBe('text-sm');
	});
	it('should return the font size for tiny when the argument is tiny', () => {
		expect(getFontSize('tiny')).toBe('text-xs');
	});
	it('should return the font size for nav when the argument is nav', () => {
		expect(getFontSize('nav')).toBe('text-sm');
	});
});

describe('getDefaultFontWeight', () => {
	it('should return font-bold when the argument is h1, h2, h3, h4 or h5', () => {
		expect(getDefaultFontWeight('h1')).toBe('font-bold');
		expect(getDefaultFontWeight('h2')).toBe('font-bold');
		expect(getDefaultFontWeight('h3')).toBe('font-bold');
		expect(getDefaultFontWeight('h4')).toBe('font-bold');
		expect(getDefaultFontWeight('h5')).toBe('font-bold');
	});

	it('should return font-semibold when the argument is h6', () => {
		expect(getDefaultFontWeight('h6')).toBe('font-semibold');
	});

	it('should return font-normal when the argument is body, small or tiny', () => {
		expect(getDefaultFontWeight('body')).toBe('font-normal');
		expect(getDefaultFontWeight('small')).toBe('font-normal');
		expect(getDefaultFontWeight('tiny')).toBe('font-normal');
	});

	it('should return font-semibold when the argument is nav', () => {
		expect(getDefaultFontWeight('nav')).toBe('font-semibold');
	});

	it('should return font-normal when the argument is undefined', () => {
		expect(getDefaultFontWeight(undefined)).toBe('font-normal');
	});
});
