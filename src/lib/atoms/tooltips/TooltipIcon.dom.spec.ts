import { cleanup, render } from '@testing-library/svelte';
import TooltipIcon from './TooltipIcon.svelte';
import { staticImages } from '$lib/components/images/staticImages';

describe('Tooltip Icon', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('tooltipIcon renders with default attribute', () => {
		const { getByTestId } = render(TooltipIcon, { props: { tooltipText: 'Render Tooltip Icon' } });
		const tooltipElement = getByTestId('tooltip-icon');
		const tooltipClasslist = tooltipElement.classList;
		expect(tooltipElement.firstElementChild?.getAttribute('src')).toEqual(staticImages.Alert);
		expect(tooltipElement.firstElementChild?.getAttribute('width')).toEqual('14px');
		expect(tooltipElement.getAttribute('data-tip')).toEqual('Render Tooltip Icon');
		expect(tooltipClasslist.contains('tooltip-secondary')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-top')).toBe(true);
	});

	test('applies iconSrc attribute to the tooltip Icon', () => {
		const { getByTestId } = render(TooltipIcon, {
			props: {
				tooltipText: 'iconSrc Attribute Test',
				iconSrc: staticImages.CycleLoader
			}
		});
		const tooltipElement = getByTestId('tooltip-icon');
		expect(tooltipElement.firstElementChild?.getAttribute('src')).toEqual(staticImages.CycleLoader);
		expect(tooltipElement.getAttribute('data-tip')).toEqual('iconSrc Attribute Test');
	});

	test('applies tooltipDirection to the tooltipIcon', () => {
		const { getByTestId } = render(TooltipIcon, {
			props: {
				tooltipText: 'tooltipDirection Test',
				tooltipDirection: 'tooltip-bottom'
			}
		});
		const tooltipElement = getByTestId('tooltip-icon');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual('tooltipDirection Test');
		expect(tooltipClasslist.contains('tooltip-bottom')).toBe(true);
	});

	test('applies Icon attribute to the tooltip Icon', () => {
		const { getByTestId } = render(TooltipIcon, {
			props: {
				tooltipText: 'Icon Attribute Test',
				tooltipDirection: 'tooltip-left',
				tooltipVariant: 'tooltip-warning',
				iconSrc: staticImages.Check,
				iconWidth: '20px'
			}
		});
		const tooltipElement = getByTestId('tooltip-icon');
		const tooltipClasslist = tooltipElement.classList;
		expect(tooltipElement.firstElementChild?.getAttribute('src')).toEqual(staticImages.Check);
		expect(tooltipElement.firstElementChild?.getAttribute('width')).toEqual('20px');
		expect(tooltipElement.getAttribute('data-tip')).toEqual('Icon Attribute Test');
		expect(tooltipClasslist.contains('tooltip-left')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-warning')).toBe(true);
	});

	test('applies all attribute to the tooltip Icon', () => {
		const { getByTestId } = render(TooltipIcon, {
			props: {
				tooltipText: 'All Attribute Test',
				tooltipDirection: 'tooltip-left',
				styleClass: 'custom-class',
				tooltipVariant: 'tooltip-warning',
				iconSrc: staticImages.Arrow,
				iconWidth: '20px'
			}
		});
		const tooltipElement = getByTestId('tooltip-icon');
		const tooltipClasslist = tooltipElement.classList;
		expect(tooltipElement.firstElementChild?.getAttribute('src')).toEqual(staticImages.Arrow);
		expect(tooltipElement.firstElementChild?.getAttribute('width')).toEqual('20px');
		expect(tooltipElement.getAttribute('data-tip')).toEqual('All Attribute Test');
		expect(tooltipClasslist.contains('tooltip-left')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-warning')).toBe(true);
		expect(tooltipClasslist.contains('custom-class')).toBe(true);
	});
});
