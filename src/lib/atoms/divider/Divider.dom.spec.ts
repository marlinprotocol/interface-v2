import Divider from './Divider.svelte';
import { describe, test, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

describe('Divider', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders the divider component', () => {
		const { container } = render(Divider);
		const dividerElement = container.firstChild;
		expect(dividerElement).toMatchSnapshot();
	});

	it('applies default styles based on direction', () => {
		const { getByTestId } = render(Divider, { direction: 'divider-horizontal' });
		const expectedClasses = ['bg-black/[0.1]', 'w-full', 'h-[1px]'];
		expectedClasses.forEach((expectedClass) => {
			expect(getByTestId('divider').className.split(' ')).toContain(expectedClass);
		});
	});

	it('applies vertical styles when direction is "divider-vertical"', () => {
		const { getByTestId } = render(Divider, { direction: 'divider-vertical' });
		const expectedClasses = ['bg-grey-1000', 'w-[1px]', 'h-4'];
		expectedClasses.forEach((expectedClass) => {
			expect(getByTestId('divider').className.split(' ')).toContain(expectedClass);
		});
	});

	it('overrides default color when a custom color prop is provided', () => {
		const customColor = 'bg-red-500';
		const { getByTestId } = render(Divider, { color: customColor });
		expect(getByTestId('divider').className.split(' ')).toContain(customColor);
	});

	it('overrides default width when a custom width prop is provided', () => {
		const customWidth = 'w-2';
		const { getByTestId } = render(Divider, { width: customWidth });
		expect(getByTestId('divider').className.split(' ')).toContain(customWidth);
	});

	it('overrides default height when a custom height prop is provided', () => {
		const customHeight = 'h-8';
		const { getByTestId } = render(Divider, { height: customHeight });
		expect(getByTestId('divider').className.split(' ')).toContain(customHeight);
	});

	it('applies margin classes based on the margin prop', () => {
		const customMargin = 'my-4';
		const { getByTestId } = render(Divider, { margin: customMargin });
		expect(getByTestId('divider').className.split(' ')).toContain(customMargin);
	});
});
