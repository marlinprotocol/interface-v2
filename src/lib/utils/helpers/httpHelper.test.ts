import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import * as toastStore from '$lib/data-stores/toastStore';

describe('fetchHttpData', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});
	it('should return data when fetch is successful', async () => {
		const mockData = { userId: 1, id: 1, title: 'delectus aut autem', completed: false };

		const result = await fetchHttpData('https://jsonplaceholder.typicode.com/todos/1', {});
		expect(result).toEqual(mockData);
	});

	it('should throw error when fetch fails', async () => {
		const addToastSpy = vi.spyOn(toastStore, 'addToast');
		await expect(fetchHttpData('https://jsonplaceholder.typicode.com', {})).rejects.toThrow();

		expect(addToastSpy).toHaveBeenCalledWith({
			message: 'Error fetching data. Please try again later.',
			variant: 'error'
		});
	});
});
