import Chip from './Chip.svelte';
import { describe, test, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

describe('Chip', () => {
    afterEach(() => {
        cleanup();
    });

    test('it should render the chip item', () => {
        const { getByTestId, container } = render(Chip);
        expect(() => getByTestId('chip-item')).not.toThrow();
        expect(container).toMatchSnapshot()
    });

    test('it should render the chip item with variant', () => {
        const { container: secondaryContainer } = render(Chip, { variant: 'secondary' });
        expect(secondaryContainer).toMatchSnapshot()
    });

    test('it should have styles passed as props its base classes attached to it', () => {
        const { getByTestId } = render(Chip, { props: { styles: 'bg-base-200' } });
        expect(getByTestId('chip-item').className).toContain('bg-base-200');
    });
});
