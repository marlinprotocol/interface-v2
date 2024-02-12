import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ErrorTextCard from './ErrorTextCard.svelte';

describe('ErrorTextCard', () => {
    it('does not render when showError is false', () => {
        const { container } = render(ErrorTextCard, {
            props: {
                showError: false,
                errorMessage: 'This is an error!',
                styleClass: 'mt-4'
            },
        });

        expect(container).toMatchSnapshot();
    });

    it('renders correctly with an error message when showError is true', () => {
        const { container } = render(ErrorTextCard, {
            props: {
                showError: true,
                errorMessage: 'This is an error!',
                styleClass: 'mt-4'
            },
        });

        expect(container).toMatchSnapshot();
    });

    it('updates the snapshot when the error message changes', () => {
        const { container } = render(ErrorTextCard, {
            props: {
                showError: true,
                errorMessage: 'A different error message!',
                styleClass: 'mt-4'
            },
        });

        expect(container).toMatchSnapshot();
    });
});