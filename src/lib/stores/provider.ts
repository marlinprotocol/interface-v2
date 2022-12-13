import { writable } from 'svelte/store';
import { BigNumber as BN } from 'ethers';

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
