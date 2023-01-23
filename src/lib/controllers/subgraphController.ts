import { ENVIRONMENT } from '$lib/environments/environment';
import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeConstants';
import type { BigNumber } from 'ethers';

/**
 * Get POND balance from subgraph API.
 * @param address
 */
export async function getPondBalance(address: string): Promise<BigNumber> {
	const url = ENVIRONMENT.public_pond_balance_api_url;
	const query = `query PondBalance($address: String)  {
        users(where: {
          address: $address
        }) {
          balance
        }
      }`;

	const options = {
		method: 'POST',
		body: JSON.stringify({
			query,
			variables: { address }
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const result = await fetch(url, options)
			.then((res) => res.json())
			.then((res) => {
				return res;
			})
			.catch((error) => {
				console.log(error);
			});
		if (result['data'] && result['data']?.users?.length != 0)
			return result['data']?.users[0]?.balance;
		else return DEFAULT_WALLET_BALANCE.pond;
	} catch (error) {
		return DEFAULT_WALLET_BALANCE.pond;
	}
}

/**
 * Get MPOND balance from subgraph API.
 * @param address
 */
export async function getMpondBalance(id: string): Promise<BigNumber> {
	const url = ENVIRONMENT.public_mpond_balance_api_url;

	const query = `query MPondBalance($id: String)  {
        balances(where: {
          id: $id
        }) {
          amount
        }
      }`;

	const options = {
		method: 'POST',
		body: JSON.stringify({
			query,
			variables: { id }
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const result = await fetch(url, options)
			.then((res) => res.json())
			.then((res) => {
				return res;
			})
			.catch((error) => {
				console.log(error);
			});
		if (result['data'] && result['data']?.balances?.length != 0)
			return result['data']?.balances[0]?.amount;
		else return DEFAULT_WALLET_BALANCE.mpond;
	} catch (error) {
		return DEFAULT_WALLET_BALANCE.mpond;
	}
}
