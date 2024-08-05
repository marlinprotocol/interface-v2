import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';
import { isNavOpen } from './navStore';

describe('navStore', () => {
	it('should have initial value as true', () => {
		const value = get(isNavOpen);
		expect(value).toBe(true);
	});

	it('should update the value correctly', () => {
		isNavOpen.set(false);
		const value = get(isNavOpen);
		expect(value).toBe(false);
	});
});
