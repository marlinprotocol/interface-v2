import { cleanup, render } from '@testing-library/svelte';
import StatusCircle from './StatusCircle.svelte';

describe('Status Circle', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it('renders with default props', () => {
		const { getByTestId, container } = render(StatusCircle);
		expect(getByTestId('status-circle-test')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with custom props', () => {
		const { getByTestId } = render(StatusCircle, { props: { styleClass: 'status-circle-class' } });
		expect(getByTestId('status-circle-test')).toBeTruthy();
		expect(getByTestId('status-circle-test').classList.contains('status-circle-class')).toBe(true);
	});
});
