import { cleanup, render } from '@testing-library/svelte';
import Tooltip from './Tooltip.svelte';
import html from '@playpilot/svelte-htm';

describe('Tooltip', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it('renders with default attribute', async () => {
		const { findByText, findByTestId, component } = render(html`
                <${Tooltip}>
                 <div slot='tooltipContent' class="tooltip-content">This is tooltip content</div>
                </${Tooltip}>
              `);
		expect(await findByText('This is tooltip content')).toBeTruthy();
		expect(await findByTestId('tooltip')).toBeTruthy();
		expect(
			(await findByTestId('tooltip')).getElementsByClassName('-top-5 left-1/2')[0]
		).toBeTruthy();
		expect((await findByTestId('tooltip')).getElementsByClassName('top-full')[0]).toBeTruthy();
		expect(component).toMatchSnapshot();
	});
});
