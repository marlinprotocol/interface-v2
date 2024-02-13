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

	it('renders no toasts initially', () => {
		const { queryAllByTestId } = render(Toast);
		expect(queryAllByTestId('toast')).toHaveLength(0);
	});

	it('renders a toast when added to the store', () => {
		toastsStore.set([data]);
		const { getByTestId } = render(Toast);
		const toastElement = getByTestId('toast');
		const toastClasslist = toastElement.classList;
		expect(toastElement).toBeTruthy();
		expect(toastClasslist.contains('toast')).toBe(true);
		expect(toastElement).toMatchSnapshot();
	});

	it('fires the onClick event when clicked toast Icon', async () => {
		toastsStore.set([data]);
		const { getByTestId, queryAllByTestId } = render(Toast);
		const toastElement = getByTestId('toast');
		const button = toastElement.firstChild as Element;
		await fireEvent.click(button);
		expect(queryAllByTestId('toast')).toHaveLength(0);
	});

	it('renders with toast class', () => {
		toastsStore.set([data]);
		const { getByTestId } = render(Toast);
		expect(getByTestId('toast').classList.contains('toast')).toBe(true);
	});

	it('renders with toast position top', () => {
		toastsStore.set([data]);
		const { getByTestId } = render(Toast);
		expect(getByTestId('toast').classList.contains('toast-top')).toBe(true);
	});
});
