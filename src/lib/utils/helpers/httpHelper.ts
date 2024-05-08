import { addToast } from '$lib/data-stores/v2/toastStore';

export async function fetchHttpData(url: string, options: RequestInit) {
	return fetch(url, options)
		.then((res) => res.json())
		.then((res) => {
			return res;
		})
		.catch((error) => {
			addToast({
				message: {
					title: 'HTTP Error',
					description: 'Error fetching data. Please try again later.'
				},
				variant: 'error'
			});
			console.error('error from the fetch call');
			throw new Error(error);
		});
}
