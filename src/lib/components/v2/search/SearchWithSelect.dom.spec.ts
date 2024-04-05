import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import SearchWithSelect from './SearchWithSelect.svelte';

describe('SearchWithSelect', () => {
	it("render's component properly", () => {
		const { container } = render(SearchWithSelect, {
			props: {
				placeholder: 'Search...',
				setSearchValue: vi.fn(),
				title: 'Test Title'
			}
		});

		expect(container).toMatchSnapshot();
	});

	it('renders correctly', () => {
		const { getByPlaceholderText } = render(SearchWithSelect, {
			props: {
				placeholder: 'Search...',
				setSearchValue: () => {},
				title: 'Test Title'
			}
		});

		const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;
		expect(inputElement).toBeTruthy();
	});

	it('is disabled when disabled prop is true', () => {
		const { getByPlaceholderText } = render(SearchWithSelect, {
			props: {
				placeholder: 'Search...',
				disabled: true,
				setSearchValue: () => {},
				title: 'Test Title'
			}
		});

		const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;
		expect(inputElement.disabled).toBe(true);
	});

	it('calls onSearchClick when search button is clicked', () => {
		const mockSetSearchValue = vi.fn();
		const { getByPlaceholderText } = render(SearchWithSelect, {
			props: {
				placeholder: 'Search...',
				setSearchValue: () => {},
				title: 'Test Title',
				onSearchClick: mockSetSearchValue
			}
		});

		const searchButton = getByPlaceholderText('Search...');
		searchButton.click();

		expect(mockSetSearchValue).toHaveBeenCalledOnce();
	});
});
