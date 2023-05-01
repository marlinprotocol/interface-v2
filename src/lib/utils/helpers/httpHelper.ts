import { addToast } from '$lib/data-stores/toastStore';

export function fetchHttpData(url: string, options: RequestInit) {
	return fetch(url, options)
		.then((res) => res.json())
		.then((res) => {
			return res;
		})
		.catch((error) => {
			addToast({
				message: 'Error fetching data. Please try again later.',
				variant: 'error'
			});
			console.error('error from the fetch call');
			throw new Error(error);
		});
}

export function showFetchHttpDataError(errors: any[]) {
	const msg = errors.map((error) => error.message).join(', ');
	addToast({
		message: `Error fetching data. Error: ${msg}`,
		variant: 'error',
		timeout: 6000
	});
	console.error('showFetchHttpDataError: ', msg);
}
