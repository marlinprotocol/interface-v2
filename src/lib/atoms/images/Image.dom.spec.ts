import { render } from '@testing-library/svelte';
import ImageComponent from './ImageColored.svelte';
import { describe, it, afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import type { CommonVariant } from '$lib/types/componentTypes';

describe('ImageComponent', () => {
	afterEach(cleanup);
	const origin = 'http://localhost:3000/';
	it('renders an image with the correct src and alt', () => {
		const testSrc = 'test-image.jpg';
		const testAlt = 'A test image';
		const { getByAltText, container } = render(ImageComponent, { src: testSrc, alt: testAlt });
		const image = getByAltText(testAlt) as HTMLImageElement;

		expect(image.src).toBe(origin + testSrc);
		expect(image.alt).toBe(testAlt);
		expect(container).toMatchSnapshot();
	});

	it('renders an image with the correct width', () => {
		const testWidth = 13;
		const { getByAltText } = render(ImageComponent, { src: 'test-image.jpg', width: testWidth });
		const image = getByAltText('Image') as HTMLImageElement;

		expect(image.width).toBe(testWidth);
	});

	it('applies primary variant class to the image', () => {
		const { getByAltText } = render(ImageComponent, {
			src: 'test-image.jpg',
			variant: 'primary'
		});
		const image = getByAltText('Image');
		const expectedClass = 'primary-img';

		expect(image.className).toContain(expectedClass);
	});

	it('applies success variant class to the image', () => {
		const { getByAltText } = render(ImageComponent, {
			src: 'test-image.jpg',
			variant: 'success'
		});
		const image = getByAltText('Image');
		const expectedClass = 'success-img';

		expect(image.className).toContain(expectedClass);
	});

	// Check for each variants
	const variants = [
		{ name: 'primary', class: 'primary-img' },
		{ name: 'success', class: 'success-img' },
		{ name: 'error', class: 'error-img' },
		{ name: 'secondary', class: 'secondary-img' },
		{ name: 'warning', class: 'warning-img' },
		{ name: 'disabled', class: 'disabled-img' },
		{ name: 'grey', class: 'grey-img' }
	];

	for (const variant of variants) {
		it(`applies ${variant.name} variant class to the image`, () => {
			const { getByAltText } = render(ImageComponent, {
				src: 'test-image.jpg',
				variant: variant.name as CommonVariant
			});
			const image = getByAltText('Image');
			expect(image.className).toContain(variant.class);
		});
	}
});
