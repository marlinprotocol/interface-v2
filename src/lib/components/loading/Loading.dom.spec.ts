import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import LoaderAnimatedPing from './LoadingAnimatedPing.svelte'; // Replace with the correct path to your component
import LoaderAnimatedModal from './LoadingAnimationModal.svelte'; // Replace with the correct path to your component
import html from '@playpilot/svelte-htm';

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

describe('Loader Animated Ping', () => {
    it('displays loading indicator with padding', () => {
        const { container } = render(LoaderAnimatedModal, {
            props: {
                loading: true,
                hasPadding: true
            },
        });

        const loadingElement = container.querySelector('span.relative');
        expect(loadingElement).toBeTruthy();
        expect(loadingElement?.className).contain('h-6 w-6');

        // Snapshot test
        expect(container).toMatchSnapshot();
    });

    it('displays loading indicator without padding', () => {
        const { container } = render(LoaderAnimatedModal, {
            props: {
                loading: true,
                hasPadding: false
            },
        });

        const loadingElement = container.querySelector('span.relative');
        expect(loadingElement).toBeTruthy();
        expect(loadingElement?.className).contain('h-5 w-5');

        // Snapshot test
        expect(container).toMatchSnapshot();
    });

    it('displays content block with padding when not loading', () => {
        const { container } = render(LoaderAnimatedModal, {
            props: {
                loading: false,
                hasPadding: true
            },
        });

        const contentElement = container.querySelector('div.flex');
        expect(contentElement).toBeTruthy();
        expect(contentElement?.className).contain('h-6 w-6');

        // Snapshot test
        expect(container).toMatchSnapshot();
    });

    it('displays content block without padding when not loading', () => {
        const { container } = render(LoaderAnimatedModal, {
            props: {
                loading: false,
                hasPadding: false
            },
        });

        const contentElement = container.querySelector('div.flex');
        expect(contentElement).toBeTruthy();
        expect(contentElement?.className).contain('h-5 w-5');

        // Snapshot test
        expect(container).toMatchSnapshot();
    });



    it("should render component inside slot properly", async () => {
        const { findByText } = render(html`
                <${LoaderAnimatedModal}>
                 <div>content</div>
                </${LoaderAnimatedModal}>
              `);

        expect(await findByText('content')).toBeTruthy();
    });
});
