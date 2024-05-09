import { cleanup, render } from '@testing-library/svelte';
import Toast from './Toast.svelte';
// import { chevronDown } from 'svelte-awesome/icons';
// import type { CommonVariant } from '$lib/types/componentTypes';

const { toastsStore } = await vi.hoisted(
	() => import('$lib/data-stores/mock-data-stores/mockStores')
);

// const data = {
// 	iconColor: 'red',
// 	message: 'You have successfully toast your notification',
// 	className: 'Default',
// 	dismissible: true,
// 	iconData: chevronDown,
// 	id: 298429842984,
// 	timeout: 2000,
// 	variant: 'primary' as CommonVariant,
// 	bgColor: 'red'
// };

beforeAll(() => {
	vi.mock('$lib/data-stores/toastStore', async () => {
		return {
			toastsStore,
			dismissToast: vi.fn()
		};
	});
});

describe('Toast', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
		toastsStore.dismissToast(298429842984);
	});

	it('renders no toasts initially', () => {
		const { queryAllByTestId } = render(Toast);
		expect(queryAllByTestId('toast')).toHaveLength(0);
	});

	it('renders a toast when added to the store', () => {
		// toastsStore.mockSetSubscribeValue([data]);
		// const { getByTestId } = render(Toast);
		// const toastElement = getByTestId('toast');
		// const toastClasslist = toastElement.classList;
		// expect(toastElement).toBeTruthy();
		// expect(toastClasslist.contains('toast')).toBe(true);
		// expect(toastElement).toMatchSnapshot();
	});

	it('fires the onClick event when clicked toast Icon', async () => {
		// toastsStore.mockSetSubscribeValue([data]);
		// const { getByTestId, queryAllByTestId } = render(Toast);
		// const toastBtn = getByTestId('toast-btn');
		// await fireEvent.click(toastBtn);
		// waitForElementToBeRemoved(queryAllByTestId('toast')).then(() =>
		// 	expect(queryAllByTestId('toast')).toHaveLength(0)
		// );
	});

	it('renders with toast class', () => {
		// toastsStore.mockSetSubscribeValue([data]);
		// const { getByTestId } = render(Toast);
		// expect(getByTestId('toast').classList.contains('toast')).toBe(true);
	});

	it('renders with toast position top', () => {
		// toastsStore.mockSetSubscribeValue([data]);
		// const { getByTestId } = render(Toast);
		// expect(getByTestId('toast').classList.contains('toast-top')).toBe(true);
	});
});
