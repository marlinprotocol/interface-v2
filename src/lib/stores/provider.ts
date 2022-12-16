import { writable, get, derived } from 'svelte/store';
import { BigNumber as BN, constants } from 'ethers';
import { browser } from '$app/environment';
import { NETWORKS } from '$lib/config';

export const provider = writable(undefined);
export const address = writable(undefined);
export const networkId = writable(undefined);

export const ethNativeBalance = writable(undefined);
export const pondBalance = writable(undefined);
export const ethMPondBalance = writable(undefined);
export const pondAllowance = writable(undefined);
export const ethMPondAllowance = writable(undefined);
export const arbNativeBalance = writable(undefined);
export const arbPondBalance = writable(undefined);
export const arbMPondBalance = writable(undefined);
export const arbPondAllowance = writable(undefined);
export const arbMPondAllowance = writable(undefined);
export const arbGasPrice = writable(undefined);
export const arbMaxSubCost = writable(undefined);
export const stashes = writable([]);

// checks if current chain matches with the one we need
// and returns true/false
export const checkNetwork = async (targetNetworkId: string) => {
	if (window.ethereum) {
		const currentChainId = await window.ethereum.request({
			method: 'eth_chainId'
		});

		// return true if network id is the same
		if (currentChainId == targetNetworkId) return true;
		// return false is network id is different
		return false;
	}
};

// switches network to the one provided
export const switchNetwork = async (targetNetworkId: string) => {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: targetNetworkId }]
	});
	// refresh
	window.location.reload();
};

// wallet connection stores
export const selectedNetworkIndex = writable<number>(0);
export const accountProvider = writable(undefined);
export const accountChainId = writable({
	chainId: NETWORKS[get(selectedNetworkIndex)].chainId,
	supportedNetwork: true
});
export const connected = derived(accountProvider, ($accountProvider) =>
	$accountProvider ? true : false
);
export const walletAddress = writable(constants.AddressZero);

let disconnectListener, accountsChangedListener, chainChangedListener;

// Connect With injected wallet
export const connectMetamask = () =>
	new Promise((resolve, reject) => {
		if (!window.ethereum) reject('No injected provider found');
		else {
			try {
				window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
					if (accounts.length > 0) {
						accountProvider.update((provider) => {
							if (provider) {
								get(accountProvider).removeListener('accountsChanged', accountsChangedListener);
								get(accountProvider).removeListener('chainChanged', chainChangedListener);
								get(accountProvider).removeListener('disconnect', disconnectListener);
							}
							return window.ethereum;
						});
						sessionStorage.setItem('connectType', 'metamask');

						// call the disconnectListener function if user disconnects their metamask wallet
						disconnectListener = () => {
							get(accountProvider).removeListener('accountsChanged', accountsChangedListener);
							get(accountProvider).removeListener('chainChanged', chainChangedListener);
							get(accountProvider).removeListener('disconnect', disconnectListener);
							accountProvider.set(undefined);
							walletAddress.set(constants.AddressZero);
						};
						get(accountProvider).on('disconnect', disconnectListener);

						// get network data to check if chain is supported and set wallet address
						const chainId = BN.from(get(accountProvider).chainId).toNumber();
						const supportedNetwork: boolean =
							NETWORKS.filter((network) => network.chainId === chainId).length > 0;
						if (supportedNetwork) {
							selectedNetworkIndex.set(
								NETWORKS.findIndex((network) => network.chainId === chainId)
							);
						}
						accountChainId.set({ chainId, supportedNetwork });
						walletAddress.set(accounts[0]);

						// call the accountsChangedListener function if user changed accounts in their metamask wallet
						accountsChangedListener = (accounts: string[]) => {
							if (accounts.length > 0) walletAddress.set(accounts[0]);
							else {
								walletAddress.set(constants.AddressZero);
								accountProvider.set(undefined);
							}
						};
						get(accountProvider).on('accountsChanged', accountsChangedListener);

						// call the chainChainedListener function if user changed the chain in their metamask wallet
						chainChangedListener = (chainIdHex: string) => {
							const chainId = BN.from(chainIdHex).toNumber();
							const supportedNetwork: boolean =
								NETWORKS.filter((network) => network.chainId === chainId).length > 0;
							if (supportedNetwork) {
								selectedNetworkIndex.set(
									NETWORKS.findIndex((network) => network.chainId === chainId)
								);
							} else {
								disconnect();
							}
							accountChainId.set({ chainId, supportedNetwork });
						};
						get(accountProvider).on('chainChanged', chainChangedListener);
					}
				});
				resolve(true);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		}
	});

// Disconnect And Store connection between reloads
if (browser && JSON.parse(sessionStorage.getItem('connected'))) {
	if (sessionStorage.getItem('connectType') === 'metamask') {
		if (window.ethereum.selectedAddress) connectMetamask();
	}
	if (sessionStorage.getItem('connectType') === 'walletconnect') {
		const providerInstance = new WalletConnectProvider({
			rpc: NETWORKS.reduce(
				(networks, network) => ({ ...networks, [network.chainId]: network.rpcUrl }),
				{}
			)
		});
		if (providerInstance.connected) connectWalletConnect();
	}
}

connected.subscribe((value) => {
	if (browser) sessionStorage.setItem('connected', JSON.stringify(value));
});

// call this function to clear all the stores related to metamask wallet
export const disconnect = () => {
	if (get(accountProvider)) {
		get(accountProvider).removeListener('accountsChanged', accountsChangedListener);
		get(accountProvider).removeListener('chainChanged', chainChangedListener);
		get(accountProvider).removeListener('disconnect', disconnectListener);
		accountProvider.set(undefined);
		walletAddress.set(constants.AddressZero);
	}
};

let intervalId = undefined;
address.subscribe((address) => {
	console.log('address change:', address);
	clearInterval(intervalId);
	if (address !== undefined) {
		allFetches(address.toLowerCase());
		intervalId = setInterval(async () => {
			allFetches(address.toLowerCase());
		}, 60000);
	}
});

export async function allFetches(address) {
	fetchPondBalance(address);
	// fetchMPondBalance(address);
	// fetchEthBalance(address);
	// fetchGasPrice();
	// fetchSubCost(address);
	fetchPondAllowance(address);
	// fetchMPondAllowance(address);
	// fetchStashes(address);
	// fetchArbPondBalance(address);
	// fetchArbMPondBalance(address);
	// fetchArbPondAllowance(address);
	// fetchArbMPondAllowance(address);
}

async function fetchEthBalance(address) {
	return fetch(import.meta.env.VITE_URL_RPC, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"jsonrpc":"2.0","method":"eth_getBalance","params": ["${address}", "latest"],"id":1}`
	})
		.then((resp) => {
			/* console.log(resp); */
			return resp.json();
		})
		.then((resp) => {
			// console.log(resp);
			if (resp === undefined || resp.error !== undefined) return;

			ethNativeBalance.set(BN.from(resp.result));
		});
}

async function fetchPondBalance(address) {
	return fetch(import.meta.env.VITE_URL_RPC, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{
			"jsonrpc":"2.0",
			"method":"eth_call",
			"params": [{
				"from": "${address}",
				"to": "${import.meta.env.VITE_ADDRESS_POND}",
				"data": "0x70a08231000000000000000000000000${address.slice(2)}"
			}, "latest"],"id":0}`
	})
		.then((resp) => {
			console.log(resp);
			return resp.json();
		})
		.then((resp) => {
			console.log(resp);
			if (resp === undefined || resp.error !== undefined) return;

			pondBalance.set(BN.from(resp.result));
		});
}

async function fetchMPondBalance(address) {
	let resp = await fetch(import.meta.env.VITE_URL_SUBGRAPH_MPOND, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"query": "{ balances(where: {id: \\\"${address}\\\"}){amount} }"}`
	});
	let respJson = await resp.json();

	if (
		respJson === undefined ||
		respJson.errors !== undefined ||
		respJson.data.balances.length === 0
	)
		return;

	ethMPondBalance.set(BN.from(respJson.data.balances[0].amount));
}

async function fetchPondAllowance(address) {
	return fetch(import.meta.env.VITE_URL_RPC, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{
			"jsonrpc":"2.0",
			"method":"eth_call",
			"params": [{
				"from": "${address}",
				"to": "${import.meta.env.VITE_ADDRESS_POND}",
				"data": "0xdd62ed3e000000000000000000000000${address.slice(
					2
				)}000000000000000000000000${import.meta.env.VITE_ADDRESS_MARKETV1.slice(2)}"
			}, "latest"],"id":1}`
	})
		.then((resp) => {
			console.log(resp);
			return resp.json();
		})
		.then((resp) => {
			console.log(resp);
			if (resp === undefined || resp.error !== undefined) return;

			pondAllowance.set(BN.from(resp.result));
		});
}

async function fetchMPondAllowance(address) {
	return fetch(import.meta.env.VITE_URL_RPC, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{
			"jsonrpc":"2.0",
			"method":"eth_call",
			"params": [{
				"from": "${address}",
				"to": "${import.meta.env.VITE_ADDRESS_MPOND}",
				"data": "0xdd62ed3e000000000000000000000000${address.slice(
					2
				)}000000000000000000000000${import.meta.env.VITE_ADDRESS_MPOND_GWL1.slice(2)}"
			}, "latest"],"id":1}`
	})
		.then((resp) => {
			/* console.log(resp); */
			return resp.json();
		})
		.then((resp) => {
			/* console.log(resp); */
			if (resp === undefined || resp.error !== undefined) return;

			ethMPondAllowance.set(BN.from(resp.result));
		});
}

async function fetchArbBalance(address) {
	return fetch(import.meta.env.VITE_URL_RPC_ARB, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"jsonrpc":"2.0","method":"eth_getBalance","params": ["${address}", "latest"],"id":1}`
	})
		.then((resp) => {
			/* console.log(resp); */
			return resp.json();
		})
		.then((resp) => {
			/* console.log(resp); */
			if (resp === undefined || resp.error !== undefined) return;

			ethNativeBalance.set(BN.from(resp.result));
		});
}

async function fetchGasPrice() {
	return fetch(import.meta.env.VITE_URL_RPC_ARB, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"jsonrpc":"2.0","method":"eth_gasPrice","params": [],"id":1}`
	})
		.then((resp) => {
			/* console.log(resp); */
			return resp.json();
		})
		.then((resp) => {
			// console.log(resp);
			if (resp === undefined || resp.error !== undefined) return;

			arbGasPrice.set(BN.from(resp.result));
		});
}

async function fetchSubCost(address) {
	return fetch(import.meta.env.VITE_URL_RPC_ARB, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"jsonrpc":"2.0","method":"eth_call","params": [{"from": "${address}", "to": "0x000000000000000000000000000000000000006E", "data": "0xf88029dc0000000000000000000000000000000000000000000000000000000000000100"}, "latest"],"id":1}`
	})
		.then((resp) => {
			/* console.log(resp); */
			return resp.json();
		})
		.then((resp) => {
			/* console.log(resp); */
			if (resp === undefined || resp.error !== undefined) return;

			arbMaxSubCost.set(BN.from(resp.result.slice(0, 66)));
		});
}

async function fetchStashes(address) {
	let resp = await fetch(import.meta.env.VITE_URL_SUBGRAPH_STAKING, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"query": "{ stashes(where: {staker: \\\"${address}\\\", isBridged: false}){stashId} }"}`
	});
	let respJson = await resp.json();

	if (respJson === undefined || respJson.errors !== undefined || respJson.data.stashes.length === 0)
		return;

	stashes.set(respJson.data.stashes.map((s) => s.stashId));
}

async function fetchArbPondBalance(address) {
	return fetch(import.meta.env.VITE_URL_RPC_ARB, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"jsonrpc":"2.0","method":"eth_call","params": [{"from": "${address}", "to": "${
			import.meta.env.VITE_ADDRESS_POND_ARB
		}", "data": "0x70a08231000000000000000000000000${address.substr(2)}"}, "latest"],"id":1}`
	})
		.then((resp) => {
			console.log(resp);
			return resp.json();
		})
		.then((resp) => {
			console.log(resp);
			if (resp === undefined || resp.error !== undefined) return;

			arbPondBalance.set(BN.from(resp.result));
		});
}

async function fetchArbMPondBalance(address) {
	return fetch(import.meta.env.VITE_URL_RPC_ARB, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"jsonrpc":"2.0","method":"eth_call","params": [{"from": "${address}", "to": "${
			import.meta.env.VITE_ADDRESS_MPOND_ARB
		}", "data": "0x70a08231000000000000000000000000${address.substr(2)}"}, "latest"],"id":1}`
	})
		.then((resp) => {
			console.log(resp);
			return resp.json();
		})
		.then((resp) => {
			console.log(resp);
			if (resp === undefined || resp.error !== undefined) return;

			arbMPondBalance.set(BN.from(resp.result));
		});
}

async function fetchArbPondAllowance(address) {
	return fetch(import.meta.env.VITE_URL_RPC_ARB, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{
			"jsonrpc":"2.0",
			"method":"eth_call",
			"params": [{
				"from": "${address}",
				"to": "${import.meta.env.VITE_ADDRESS_POND_ARB}",
				"data": "0xdd62ed3e000000000000000000000000${address.slice(
					2
				)}000000000000000000000000${import.meta.env.VITE_ADDRESS_POND_GWL2.slice(2)}"
			}, "latest"],"id":1}`
	})
		.then((resp) => {
			console.log(resp);
			return resp.json();
		})
		.then((resp) => {
			console.log(resp);
			if (resp === undefined || resp.error !== undefined) return;

			arbPondAllowance.set(BN.from(resp.result));
		});
}

async function fetchArbMPondAllowance(address) {
	return fetch(import.meta.env.VITE_URL_RPC_ARB, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{
			"jsonrpc":"2.0",
			"method":"eth_call",
			"params": [{
				"from": "${address}",
				"to": "${import.meta.env.VITE_ADDRESS_MPOND_ARB}",
				"data": "0xdd62ed3e000000000000000000000000${address.slice(
					2
				)}000000000000000000000000${import.meta.env.VITE_ADDRESS_MPOND_GWL2.slice(2)}"
			}, "latest"],"id":1}`
	})
		.then((resp) => {
			/* console.log(resp); */
			return resp.json();
		})
		.then((resp) => {
			/* console.log(resp); */
			if (resp === undefined || resp.error !== undefined) return;

			arbMPondAllowance.set(BN.from(resp.result));
		});
}
