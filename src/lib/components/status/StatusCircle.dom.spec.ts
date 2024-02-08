import { cleanup, render } from '@testing-library/svelte';
import StatusCircle from './StatusCircle.svelte';

describe('Status Circle', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('StatusCircle component renders with default porps', () => {
		const { getByTestId, container } = render(StatusCircle);
		expect(getByTestId('status-circle-test')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('StatusCircle component renders with custom porps', () => {
		const { getByTestId } = render(StatusCircle, { props: { styleClass: 'status-circle-class' } });
		expect(getByTestId('status-circle-test')).toBeTruthy();
		expect(getByTestId('status-circle-test').classList.contains('status-circle-class')).toBe(true);
	});
});
