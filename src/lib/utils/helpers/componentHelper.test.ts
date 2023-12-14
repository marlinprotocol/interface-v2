import { describe, expect, it } from 'vitest';
import {
	getColorClassByVariant,
	getColorHexByVariant,
	getColorHexForTableRow,
	getIconbyVariant,
	getImagebyWalletProvider,
	getTextColorClassByVariant
} from './componentHelper';
import checkCircle from 'svelte-awesome/icons/checkCircle';
import infoCircle from 'svelte-awesome/icons/infoCircle';
import warning from 'svelte-awesome/icons/warning';
import timesCircle from 'svelte-awesome/icons/timesCircle';
import { staticImages } from '$lib/components/images/staticImages';

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
		expect(getIconbyVariant(undefined)).toBe(infoCircle);
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
		expect(getColorClassByVariant(undefined)).toBe('primary-content');
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
		expect(getTextColorClassByVariant(undefined)).toBe('text-primary-content');
	});
});

describe('getImagebyWalletProvider', () => {
	it('should return the metamask image when argument is metamask', () => {
		expect(getImagebyWalletProvider('metamask')).toBe(staticImages.Metamask);
	});

	it('should return the walletconnect image when the argument is walletconnect', () => {
		expect(getImagebyWalletProvider('walletconnect')).toBe(staticImages.WalletConnect);
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
		expect(getColorHexByVariant(undefined)).toBe('#0F62FE');
	});
});

describe('getColorHexForTableRow', () => {
	it('should return color for index 0 when the argument is 0', () => {
		expect(getColorHexForTableRow(0)).toBe('#AF2EFF');
	});
	it('should return color for index 1 when the argument is 1', () => {
		expect(getColorHexForTableRow(1)).toBe('#9868FF');
	});
	it('should return color for index 2 when the argument is 2', () => {
		expect(getColorHexForTableRow(2)).toBe('#4171EA');
	});
	it('should return color for index 3 when the argument is 3', () => {
		expect(getColorHexForTableRow(3)).toBe('#4FA0FF');
	});
	it('should return color for index 4 when the argument is 4', () => {
		expect(getColorHexForTableRow(4)).toBe('#4FC0FF');
	});
	it('should return color for index 5 when the argument is 5', () => {
		expect(getColorHexForTableRow(5)).toBe('#25CFDA');
	});
	it('should return color for index 6 when the argument is 6', () => {
		expect(getColorHexForTableRow(6)).toBe('#19CDB7');
	});
	it('should return color for index 7 when the argument is 7', () => {
		expect(getColorHexForTableRow(7)).toBe('#1EC086');
	});
	it('should return color for index 8 when the argument is 8', () => {
		expect(getColorHexForTableRow(8)).toBe('#3DAE56');
	});
	it('should return color for index 9 when the argument is 9', () => {
		expect(getColorHexForTableRow(9)).toBe('#D8D013');
	});
});
