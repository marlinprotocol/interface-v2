import { PUBLIC_MPOND_BALANCE_API_URL, PUBLIC_POND_BALANCE_API_URL } from '$env/static/public';

/**
 * Get POND balance from subgraph API.
 * @param address
 */
export async function getPondBalance(address: string): Promise<number> {
	const url = PUBLIC_POND_BALANCE_API_URL;
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
		else return 0;
	} catch (error) {
		return 0;
	}
}

/**
 * Get MPOND balance from subgraph API.
 * @param address
 */
export async function getMpondBalance(id: string): Promise<number> {
	const url = PUBLIC_MPOND_BALANCE_API_URL;

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
		else return 0;
	} catch (error) {
		return 0;
	}
}
