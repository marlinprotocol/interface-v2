import { render } from '@testing-library/svelte';
import ConnectWalletButton from './ConnectWalletButton.svelte';
import { describe, it, expect } from 'vitest';
import ChainSwitcher from './ChainSwitcher.svelte';
import DisconnectWalletModal from './DisconnectWalletModal.svelte';

describe('ChainSwitcher', () => {
	it('renders the ChainSwitcher component properly', () => {
		const { container } = render(ChainSwitcher);
		expect(container).toMatchSnapshot();
	});
});

describe('ConnectWalletButton', () => {
	it('renders large button layout when isLarge is true', () => {
		const { getByText } = render(ConnectWalletButton, {
			isLarge: true
		});

		expect(getByText('Connect Wallet')).toBeTruthy();
	});

	it('renders small button layout with chain switcher and custom text when isLarge is false', () => {
		const { getByText } = render(ConnectWalletButton, {
			isLarge: false,
			connectButtonText: 'Custom Connect'
		});
		expect(getByText('Custom Connect')).toBeTruthy();
	});
});

describe('Disconnect Wallet Modal', () => {
	it('renders the Disconnect Wallet Modal component properly', () => {
		const { container } = render(DisconnectWalletModal);
		expect(container).toMatchSnapshot();
	});
});
