import { cleanup, render } from '@testing-library/svelte';
import Tooltip from './Tooltip.svelte';

describe('Tooltip', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it('renders with default attribute', () => {
		const { getByTestId } = render(Tooltip);
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;
		expect(tooltipElement.getAttribute('data-tip')).toEqual('Render Tooltip');
		expect(tooltipClasslist.contains('tooltip-secondary')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-top')).toBe(true);
		expect(tooltipElement).toMatchSnapshot();
	});
});
