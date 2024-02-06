import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Toast from './Toast.svelte';
import { toastsStore, dismissToast } from '$lib/data-stores/toastStore';
import type { CommonVariant } from '$lib/types/componentTypes';
import chevronDown from 'svelte-awesome/icons/chevronDown';

const data = {
	iconColor: 'red',
	message: 'Toast Test Case',
	className: 'Default',
	dismissible: true,
	iconData: chevronDown,
	id: 298429842984,
	timeout: 2000,
	variant: 'primary' as CommonVariant
};

describe('Toast', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
		dismissToast(298429842984);
	});

	test('renders no toasts initially', () => {
		const { queryAllByTestId } = render(Toast);
		expect(queryAllByTestId('toast')).toHaveLength(0);
	});

	test('renders a toast when added to the store', async () => {
		const { getByTestId } = render(Toast);
		await toastsStore.set([data]);
		const toastElement = getByTestId('toast');
		const toastClasslist = toastElement.classList;
		expect(toastElement).toBeTruthy();
		expect(toastClasslist.contains('toast')).toBe(true);
	});

	test('it should fire the onClick event when clicked toast Icon', async () => {
		const { getByTestId, queryAllByTestId } = render(Toast);
		await toastsStore.set([data]);
		const toastElement = getByTestId('toast');
		const button = toastElement.firstChild as Element;
		await fireEvent.click(button);
		expect(queryAllByTestId('toast')).toHaveLength(0);
	});

	test('toast class exits', async () => {
		const { getByTestId } = render(Toast);
		await toastsStore.set([data]);
		expect(getByTestId('toast').classList.contains('toast')).toBe(true);
	});

	test('toast postion top', async () => {
		const { getByTestId } = render(Toast);
		await toastsStore.set([data]);
		expect(getByTestId('toast').classList.contains('toast-top')).toBe(true);
	});
});
