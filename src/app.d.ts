declare global {
	interface Window {
		ethereum?: ExternalProvider;
	}
	namespace App {}
}

export {};
