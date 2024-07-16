import { get } from 'svelte/store';
import { toastsStore, dismissToast, addToast } from './toastStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Toast } from '$lib/types/componentTypes';

describe('toastStore', () => {
	beforeEach(() => {
		toastsStore.set([]);
	});

	it('should initialize with an empty array', () => {
		expect(get(toastsStore)).toEqual([]);
	});

	it('should add a toast to the store', () => {
		const toast: Toast = {
			message: { title: 'Test Toast', description: 'This is a test' },
			dismissible: true,
			timeout: 3000,
			variant: 'success'
		};

		addToast(toast);

		const toasts = get(toastsStore);
		expect(toasts).toHaveLength(1);
		expect(toasts[0]).toMatchObject({
			...toast,
			id: expect.any(Number),
			iconData: expect.any(String),
			bgColor: expect.any(String)
		});
	});

	it('should dismiss a toast from the store', () => {
		const toast: Toast = {
			message: { title: 'Test Toast', description: 'This is a test' },
			dismissible: true,
			timeout: 3000,
			variant: 'success'
		};

		addToast(toast);
		const toasts = get(toastsStore);
		const toastId = toasts[0].id;

		dismissToast(toastId);

		expect(get(toastsStore)).toHaveLength(0);
	});

	it('should auto-dismiss a toast after the specified timeout', async () => {
		vi.useFakeTimers();

		const toast: Toast = {
			message: { title: 'Test Toast', description: 'This is a test' },
			dismissible: true,
			timeout: 3000,
			variant: 'success'
		};

		addToast(toast);
		expect(get(toastsStore)).toHaveLength(1);

		vi.advanceTimersByTime(3000);

		await vi.runAllTimersAsync();

		expect(get(toastsStore)).toHaveLength(0);

		vi.useRealTimers();
	});

	it('should not auto-dismiss a toast if dismissible is false', async () => {
		vi.useFakeTimers();

		const toast: Toast = {
			message: { title: 'Test Toast', description: 'This is a test' },
			dismissible: false,
			timeout: 3000,
			variant: 'success'
		};

		addToast(toast);
		expect(get(toastsStore)).toHaveLength(1);

		vi.advanceTimersByTime(3000);

		await vi.runAllTimersAsync();

		expect(get(toastsStore)).toHaveLength(1);

		vi.useRealTimers();
	});
});
