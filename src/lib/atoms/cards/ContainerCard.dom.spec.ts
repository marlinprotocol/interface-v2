import ContainerCard from './ContainerCard.svelte';
import { describe, test, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

describe('ContainerCard', () => {
	afterEach(() => {
		cleanup();
	});

	test('it should render 2 divs one nested inside the other', () => {
		const { getByTestId } = render(ContainerCard);
		expect(() => getByTestId('container-card-root')).not.toThrow();
		expect(() => getByTestId('container-card-body')).not.toThrow();
	});
});
