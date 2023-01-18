declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
	namespace App {}
}

export {};
