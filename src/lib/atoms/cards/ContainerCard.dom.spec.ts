import ContainerCard from './ContainerCard.svelte';
import { describe, it, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

describe('ContainerCard', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders 2 divs one nested inside the other', () => {
		const { getByTestId } = render(ContainerCard);

		expect(() => getByTestId('container-card-root')).not.toThrow();
		expect(getByTestId('container-card-root').children.length).toBe(1);
		expect(getByTestId('container-card-root').children[0].tagName).toBe('DIV');
		expect(() => getByTestId('container-card-body')).not.toThrow();
	});

	it('has its base classes attached to it', () => {
		const { getByTestId } = render(ContainerCard);
		expect(getByTestId('container-card-body').className).toContain(
			'card mx-auto rounded-lg bg-base-100 px-4 py-4 text-center sm:px-6 sm:py-6'
		);
	});

	it('has styles passed as props along with its base classes attached to it', () => {
		const { getByTestId } = render(ContainerCard, { props: { styleClass: 'bg-base-200' } });
		expect(getByTestId('container-card-body').className).toContain('bg-base-200');
	});
});
