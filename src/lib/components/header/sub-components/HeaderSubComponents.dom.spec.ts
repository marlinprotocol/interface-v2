
import { render } from '@testing-library/svelte';
import WalletCard from './WalletCard.svelte';
import HeaderLogo from './HeaderLogo.svelte';
import ConnectWalletButton from './ConnectWalletButton.svelte';
import { describe, it, expect } from 'vitest';
import html from 'svelte-htm';
import ChainSwitcher from './ChainSwitcher.svelte';
import DisconnectWalletButton from './DisconnectWalletButton.svelte';
import DisconnectWalletModal from './DisconnectWalletModal.svelte';
// import HeaderLinksGroup from './HeaderLinksGroup.svelte';

describe('ChainSwitcher', () => {
    test('renders the ChainSwitcher component properly', () => {
        const { container } = render(ChainSwitcher);
        expect(container).toMatchSnapshot();
    });
})

describe('ConnectWalletButton', () => {

    test('renders the ConnectWalletButton component properly', () => {
        const { container } = render(HeaderLogo);
        expect(container).toMatchSnapshot();
    });

    it('renders large button layout when isLarge is true', () => {
        const { getByText } = render(ConnectWalletButton, {
            isLarge: true,
        });

        expect(getByText('Connect Wallet')).toBeTruthy();
    });

    it('renders small button layout with chain switcher and custom text when isLarge is false', () => {
        const { getByText } = render(ConnectWalletButton, {
            isLarge: false,
            connectButtonText: 'Custom Connect',
        });
        expect(getByText('Custom Connect')).toBeTruthy();
    });

});

describe('DisconnectWalletButton', () => {
    test('renders the DisconnectWalletButton component properly', () => {
        const { container } = render(DisconnectWalletButton);
        expect(container).toMatchSnapshot();
    });
})

describe('Disconnect Wallet Modal', () => {
    test('renders the Disconnect Wallet Modal component properly', () => {
        const { container } = render(DisconnectWalletModal);
        expect(container).toMatchSnapshot();
    });
})

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

describe('WalletCard', () => {
    test('renders the WalletCard component properly', () => {
        const { container } = render(WalletCard, { props: { imageSrc: 'example.png', title: 'small card' } });
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

// describe('Header Links Group', () => {
//     test('renders the Header Links Group component properly', () => {
//         const { container } = render(HeaderLinksGroup);
//         expect(container).toMatchSnapshot();
//     });
// })
