import TextComponent from './Text.svelte';
import { getDefaultFontWeight, getFontSize } from '$lib/utils/helpers/componentHelper';
import { render, cleanup } from '@testing-library/svelte';
import { describe, it, expect, afterEach } from 'vitest';
import type { TextModel } from '$lib/types/componentTypes';

describe('TextComponent', () => {
	afterEach(() => cleanup());

	const variants = [
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'body',
		'small',
		'tiny',
		'nav'
	] as TextModel['variant'][];

	for (const variant of variants) {
		it(`renders text with correct font size and weight for variant '${variant}'`, () => {
			const testText = `Test ${variant}`;
			const { container, getByTestId } = render(TextComponent, { variant, text: testText });
			expect(container).toMatchSnapshot();
			expect(getByTestId('text').className).toContain(getFontSize(variant));
			expect(getByTestId('text').className).toContain(getDefaultFontWeight(variant));
			expect(getByTestId('text').textContent).toBe(testText);
		});
	}

	it('allows custom styleClass to be applied', () => {
		const styleClass = 'bg-red-100';
		const { getByTestId } = render(TextComponent, { styleClass });
		expect(getByTestId('text').className).toContain(styleClass);
	});

	it('allows custom fontWeight to override default fontWeight', () => {
		const customFontWeight = 'font-semibold';
		const { getByTestId } = render(TextComponent, { fontWeight: customFontWeight });

		expect(getByTestId('text').className).toContain(customFontWeight);
		// ensures default weight is not present
		expect(getByTestId('text').className).not.toContain(getDefaultFontWeight(undefined));
	});

	it('displays text content passed to the component', () => {
		const testText = 'Hello World';
		const { getByTestId } = render(TextComponent, { text: testText });

		expect(getByTestId('text').textContent).toBe(testText);
	});
});
