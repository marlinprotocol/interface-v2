import { describe, expect, test } from 'vitest';
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
	test('success variant', () => {
		expect(getIconbyVariant('success')).toBe(checkCircle);
	});

	test('info variant', () => {
		expect(getIconbyVariant('info')).toBe(infoCircle);
	});

	test('warning variant', () => {
		expect(getIconbyVariant('warning')).toBe(warning);
	});

	test('error variant', () => {
		expect(getIconbyVariant('error')).toBe(timesCircle);
	});

	test('default variant', () => {
		expect(getIconbyVariant(undefined)).toBe(infoCircle);
	});
});

describe('getColorClassByVariant', () => {
	test('success variant', () => {
		expect(getColorClassByVariant('success')).toBe('primary-content');
	});

	test('info variant', () => {
		expect(getColorClassByVariant('info')).toBe('primary-content');
	});

	test('warning variant', () => {
		expect(getColorClassByVariant('warning')).toBe('primary-content');
	});

	test('error variant', () => {
		expect(getColorClassByVariant('error')).toBe('error-content');
	});

	test('default variant', () => {
		expect(getColorClassByVariant(undefined)).toBe('primary-content');
	});
});

describe('getTextColorClassByVariant', () => {
	test('primary variant', () => {
		expect(getTextColorClassByVariant('primary')).toBe('text-primary');
	});

	test('secondary variant', () => {
		expect(getTextColorClassByVariant('secondary')).toBe('text-secondary');
	});

	test('success variant', () => {
		expect(getTextColorClassByVariant('success')).toBe('text-primary-content');
	});

	test('info variant', () => {
		expect(getTextColorClassByVariant('info')).toBe('text-primary-content');
	});

	test('warning variant', () => {
		expect(getTextColorClassByVariant('warning')).toBe('text-primary-content');
	});

	test('error variant', () => {
		expect(getTextColorClassByVariant('error')).toBe('text-error-content');
	});

	test('disabled variant', () => {
		expect(getTextColorClassByVariant('disabled')).toBe('text-primary opacity-40');
	});

	test('grey variant', () => {
		expect(getTextColorClassByVariant('grey')).toBe('text-grey-500');
	});

	test('default variant', () => {
		expect(getTextColorClassByVariant(undefined)).toBe('text-primary-content');
	});
});

describe('getImagebyWalletProvider', () => {
	test('metamask', () => {
		expect(getImagebyWalletProvider('metamask')).toBe(staticImages.Metamask);
	});

	test('walletconnect', () => {
		expect(getImagebyWalletProvider('walletconnect')).toBe(staticImages.WalletConnect);
	});
});

describe('getColorHexByVariant', () => {
	test('primary variant', () => {
		expect(getColorHexByVariant('primary')).toBe('#0F62FE');
	});

	test('secondary variant', () => {
		expect(getColorHexByVariant('secondary')).toBe('#6F6F6F');
	});

	test('success variant', () => {
		expect(getColorHexByVariant('success')).toBe('#24A148');
	});

	test('info variant', () => {
		expect(getColorHexByVariant('info')).toBe('#0062FF');
	});

	test('warning variant', () => {
		expect(getColorHexByVariant('warning')).toBe('#f1861b');
	});

	test('error variant', () => {
		expect(getColorHexByVariant('error')).toBe('#DA1E28');
	});

	test('disabled variant', () => {
		expect(getColorHexByVariant('disabled')).toBe('#0F62FE');
	});

	test('grey variant', () => {
		expect(getColorHexByVariant('grey')).toBe('#6F6F6F');
	});

	test('default variant', () => {
		expect(getColorHexByVariant(undefined)).toBe('#0F62FE');
	});
});

describe('getColorHexForTableRow', () => {
	test('for index 0', () => {
		expect(getColorHexForTableRow(0)).toBe('#AF2EFF');
	});
	test('for index 1', () => {
		expect(getColorHexForTableRow(1)).toBe('#9868FF');
	});
	test('for index 2', () => {
		expect(getColorHexForTableRow(2)).toBe('#4171EA');
	});
	test('for index 3', () => {
		expect(getColorHexForTableRow(3)).toBe('#4FA0FF');
	});
	test('for index 4', () => {
		expect(getColorHexForTableRow(4)).toBe('#4FC0FF');
	});
	test('for index 5', () => {
		expect(getColorHexForTableRow(5)).toBe('#25CFDA');
	});
	test('for index 6', () => {
		expect(getColorHexForTableRow(6)).toBe('#19CDB7');
	});
	test('for index 7', () => {
		expect(getColorHexForTableRow(7)).toBe('#1EC086');
	});
	test('for index 8', () => {
		expect(getColorHexForTableRow(8)).toBe('#3DAE56');
	});
	test('for index 9', () => {
		expect(getColorHexForTableRow(9)).toBe('#D8D013');
	});
});
