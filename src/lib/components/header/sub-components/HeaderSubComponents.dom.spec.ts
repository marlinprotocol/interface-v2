
import { render } from '@testing-library/svelte';
import WalletCard from './WalletCard.svelte';
import HeaderLogo from './HeaderLogo.svelte';
import { describe, it, expect } from 'vitest';
import html from 'svelte-htm';

describe('WalletCard', () => {
    test('renders the WalletCard component properly', () => {
        const { container } = render(WalletCard);
        expect(container).toMatchSnapshot();
    });

    it('renders the title text', () => {
        const titleText = 'Sample Title';

        const { getByText } = render(WalletCard, {
            props: {
                title: titleText,
                imageSrc: '', // Pass an empty string because we are testing the title here
            },
        });
        expect(getByText(titleText)).toBeTruthy();
    });

    it('renders an image when imageSrc is provided', () => {
        const testImageUrl = 'test-image.jpg';
        const testTitle = 'Test Image';

        const { getByAltText } = render(WalletCard, {
            props: {
                imageSrc: testImageUrl,
                title: testTitle,
            },
        });

        const image = getByAltText(testTitle);
        expect(image).toBeTruthy();
        expect(image.getAttribute('src')).toBe(testImageUrl);
    });

    it('does not render an image when imageSrc is not provided', () => {
        const { container } = render(WalletCard, {
            props: {
                title: 'No Image Title',
                imageSrc: ''
            },
        });

        // Here we are checking that no <img> elements are present in the container.
        expect(container.querySelector('img')).toBeNull();
    });


    it("allows content to be added via slots", async () => {
        const slotContentText = 'Click me';
        const { getByText } = render(html`
                <${WalletCard} title=${'Card with Button'} imageSrc='example.png'>
                 <div slot='button'><button>${slotContentText}</button></div>
                </${WalletCard}>
              `);
        expect(getByText(slotContentText)).toBeTruthy();
    });
});

describe('HeaderLogo', () => {
    test('renders the HeaderLogo component properly', () => {
        const { container } = render(HeaderLogo);
        expect(container).toMatchSnapshot();
    });
    it('renders both images with correct sources and one is initially hidden', () => {
        const { getAllByAltText } = render(HeaderLogo);

        const images = getAllByAltText('Marlin Logo');

        // Expect two images to be found
        expect(images.length).toBe(2);

        // Check if the right logos have the right src
        const largeScreenLogo = images.find((img) => img.getAttribute('class')?.includes('sm:block'));
        const smallScreenLogo = images.find((img) => img.getAttribute('class')?.includes('sm:hidden'));

        // Since we cannot test screen sizes here, we'll just check if the src is correct
        expect(largeScreenLogo?.getAttribute('src')).toBe('/logo/logo-name.svg');
        expect(smallScreenLogo?.getAttribute('src')).toBe('/logo/marlin-logo.svg');
    });
});