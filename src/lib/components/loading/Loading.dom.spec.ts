import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import LoaderAnimatedPing from './LoadingAnimatedPing.svelte'; // Replace with the correct path to your component

describe('Loader Animated Ping', () => {
	it('renders loader with two child div elements', () => {
		const { container } = render(LoaderAnimatedPing);

		const loader = container.querySelector('.marlin-loader');
		expect(loader).toBeTruthy();
		expect(loader?.className).contain('marlin-loader');

		const rippleDivs = container.querySelectorAll('.lds-ripple div');
		// There should be two divs for the ripple effect.
		expect(rippleDivs.length).toBe(2);

		// Snapshot testing to ensure consistent render
		expect(container).toMatchSnapshot();
	});
});
