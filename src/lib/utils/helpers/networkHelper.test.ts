import { describe, test, expect } from 'vitest';
import { getChainDisplayName, getImageForChain, isValidChain } from './networkHelper';
import { PUBLIC_NODE_ENV } from '$env/static/public';
import { staticImages } from '$lib/components/images/staticImages';

describe('isValidChain', () => {
	if (PUBLIC_NODE_ENV === 'development') {
		test('should return true if chain is valid', () => {
			expect(isValidChain(421613)).toBe(true);
		});
		test('should return false for invalid chain', () => {
			expect(isValidChain(1)).toBe(false);
			expect(isValidChain(42161)).toBe(false);
		});
	}
	if (PUBLIC_NODE_ENV === 'arb_mainnet') {
		test('should return true if chain is valid', () => {
			expect(isValidChain(42161)).toBe(true);
		});
		test('should return false for invalid chain', () => {
			expect(isValidChain(1)).toBe(false);
			expect(isValidChain(421613)).toBe(false);
		});
	}
});

describe('getChainDisplayName', () => {
	test('should return correct chain name', () => {
		expect(getChainDisplayName(1)).toBe('Ethereum');
		expect(getChainDisplayName(42161)).toBe('ARB One');
		expect(getChainDisplayName(421613)).toBe('ARB Goerli');
		expect(getChainDisplayName(59144)).toBe('Linea');
		expect(getChainDisplayName(59140)).toBe('Linea Goerli');
	});
	test('should return undefined for invalid chain', () => {
		expect(getChainDisplayName(2)).toBe(undefined);
	});
});

describe('getImageForChain', () => {
	test('should return correct chain image', () => {
		expect(getImageForChain(1)).toBe(staticImages.EthereumLogo);
		expect(getImageForChain(42161)).toBe(staticImages.ArbitrumLogo);
		expect(getImageForChain(421613)).toBe(staticImages.ArbitrumLogo);
		expect(getImageForChain(59144)).toBe(staticImages.LineaLogo);
		expect(getImageForChain(59140)).toBe(staticImages.LineaLogo);
	});
	test('should return default chain image for invalid chain', () => {
		expect(getImageForChain(2)).toBe(staticImages.ArbitrumLogo);
	});
});
