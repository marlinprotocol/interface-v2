import { cleanup, render } from '@testing-library/svelte';
import Tooltip from './Tooltip.svelte';

describe('Tooltip', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('tooltip renders with default attribute', () => {
		const { getByTestId } = render(Tooltip, { props: { tooltipText: 'Render Tooltip' } });
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;
		expect(tooltipElement.getAttribute('data-tip')).toEqual('Render Tooltip');
		expect(tooltipClasslist.contains('tooltip-secondary')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-top')).toBe(true);
	});

	test('applies styleClass to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: { tooltipText: 'StyleClass Test', styleClass: 'custom-class' }
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual('StyleClass Test');
		expect(tooltipClasslist.contains('custom-class')).toBe(true);
	});

	test('applies styleClass with multiple class to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: {
				tooltipText: 'StyleClass Test',
				styleClass: 'main-class secondary-class'
			}
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual('StyleClass Test');
		expect(tooltipClasslist.contains('main-class')).toBe(true);
		expect(tooltipClasslist.contains('secondary-class')).toBe(true);
	});

	test('applies tooltipVariant to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: {
				tooltipText: 'tooltipVariant Test',
				tooltipVariant: 'tooltip-accent'
			}
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual('tooltipVariant Test');
		expect(tooltipClasslist.contains('tooltip-accent')).toBe(true);
	});

	test('applies tooltipDirection to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: {
				tooltipText: 'tooltipDirection Test',
				tooltipDirection: 'tooltip-bottom'
			}
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual('tooltip Direction Test');
		expect(tooltipClasslist.contains('tooltip-bottom')).toBe(true);
	});

	test('applies tooltipDirection & tooltipVariant to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: {
				tooltipText: 'tooltipDirection and tooltipVariant Test',
				tooltipDirection: 'tooltip-bottom',
				tooltipVariant: 'tooltip-info'
			}
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual(
			'tooltipDirection and tooltipVariant Test'
		);
		expect(tooltipClasslist.contains('tooltip-bottom')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-info')).toBe(true);
	});

	test('applies tooltipDirection & tooltipVariant & styleClass to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: {
				tooltipText: 'tooltipDirection,styleClass and tooltipVariant Test',
				tooltipDirection: 'tooltip-bottom',
				tooltipVariant: 'tooltip-info',
				styleClass: 'tooltip-mode'
			}
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual(
			'tooltipDirection,styleClass and tooltipVariant Test'
		);
		expect(tooltipClasslist.contains('tooltip-bottom')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-info')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-mode')).toBe(true);
	});

	test('applies tooltipVariant & styleClass to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: {
				tooltipText: 'styleClass and tooltipVariant Test',
				tooltipVariant: 'tooltip-error',
				styleClass: 'tooltip-default'
			}
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;

		expect(tooltipElement.getAttribute('data-tip')).toEqual('styleClass and tooltipVariant Test');
		expect(tooltipClasslist.contains('tooltip-error')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-default')).toBe(true);
	});

	test('applies all attribute to the tooltip', () => {
		const { getByTestId } = render(Tooltip, {
			props: {
				tooltipText: 'All Attribute Test',
				tooltipDirection: 'tooltip-left',
				styleClass: 'custom-class',
				tooltipVariant: 'tooltip-warning'
			}
		});
		const tooltipElement = getByTestId('tooltip');
		const tooltipClasslist = tooltipElement.classList;
		expect(tooltipElement.getAttribute('data-tip')).toEqual('All Attribute Test');
		expect(tooltipClasslist.contains('tooltip-left')).toBe(true);
		expect(tooltipClasslist.contains('tooltip-warning')).toBe(true);
		expect(tooltipClasslist.contains('custom-class')).toBe(true);
	});
});
