import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { describe, test, expect, vi, afterEach } from 'vitest';

describe('fetchHttpData', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});
	test('should return data when fetch is successful', async () => {
		const mockData = { userId: 1, id: 1, title: 'delectus aut autem', completed: false };

		const result = await fetchHttpData('https://jsonplaceholder.typicode.com/todos/1', {});
		expect(result).toEqual(mockData);
	});

	test('should throw error when fetch fails', async () => {
		await expect(fetchHttpData('https://jsonplaceholder.typicode.com', {})).rejects.toThrow();
	});
});
