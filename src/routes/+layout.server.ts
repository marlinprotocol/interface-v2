import { getContractDetails } from '$lib/controllers/contractController';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	return {
		contract: await getContractDetails()
	};
}) satisfies LayoutServerLoad;
