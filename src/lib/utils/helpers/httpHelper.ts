export function fetchHttpData(url: string, options: RequestInit) {
	return fetch(url, options)
		.then((res) => res.json())
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
		});
}
