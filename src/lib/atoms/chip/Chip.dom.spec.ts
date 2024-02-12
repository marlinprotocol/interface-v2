import Chip from './Chip.svelte';
import { describe, it, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

describe('Chip', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders the chip item', () => {
		const { getByTestId, container } = render(Chip);
		expect(() => getByTestId('chip-item')).not.toThrow();
		expect(container).toMatchSnapshot();
	});

	it('renders the chip item with variant', () => {
		const { container: secondaryContainer } = render(Chip, { variant: 'secondary' });
		expect(secondaryContainer).toMatchSnapshot();
	});

	it('has styles passed as props along with its base classes attached to it', () => {
		const { getByTestId } = render(Chip, { props: { styles: 'bg-base-200' } });
		expect(getByTestId('chip-item').className).toContain('bg-base-200');
	});
});
