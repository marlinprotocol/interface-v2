import ENVIRONMENT from '$lib/environments/environment';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';

export async function getContractDetails() {
	const url = ENVIRONMENT.public_contract_details_url;
	const options = GET_OPTIONS;

	// TODO: add type for contractDetails
	const contractDetails = await fetchHttpData(url, options);
	console.log('contractDetails', contractDetails);
	return contractDetails;
}
