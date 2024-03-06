import { render, fireEvent } from '@testing-library/svelte';
import Pagination from './Pagination.svelte'; // Adjust with the correct import path
import { describe, it, expect } from 'vitest';

describe('Pagination', () => {
	const handlePageChangeMock = vi.fn();
	it('renders correctly', async () => {
		const { getByText, container } = render(Pagination, {
			props: {
				activePage: 1,
				pageCount: 5,
				handlePageChange: () => {},
				styleClass: 'custom-class'
			}
		});

		expect(getByText('1')).toBeTruthy();

		expect(container).toMatchSnapshot();
	});

	it('disables the previous button on the first page', async () => {
		const { getByTestId } = render(Pagination, {
			props: {
				activePage: 1,
				pageCount: 5,
				handlePageChange: handlePageChangeMock
			}
		});

		const prevButton = getByTestId('pagination-prev-button');
		await fireEvent.click(prevButton);

		expect(handlePageChangeMock).toHaveBeenCalledTimes(0);
	});

	it('disables the next button on the last page', async () => {
		const { getByTestId } = render(Pagination, {
			props: {
				activePage: 5,
				pageCount: 5,
				handlePageChange: handlePageChangeMock
			}
		});

		const nextButton = getByTestId('pagination-next-button');
		await fireEvent.click(nextButton);
		expect(handlePageChangeMock).toHaveBeenCalledTimes(0);
	});

	it('enables previous and next buttons on middle pages & calls handlePageChange with the correct page when a page button is clicked', async () => {
		const { getByTestId } = render(Pagination, {
			props: {
				activePage: 3,
				pageCount: 5,
				handlePageChange: handlePageChangeMock
			}
		});

		const prevButton = getByTestId('pagination-prev-button');
		const nextButton = getByTestId('pagination-next-button');
		await fireEvent.click(nextButton);
		expect(handlePageChangeMock).toHaveBeenCalledWith(4);
		await fireEvent.click(prevButton);
		expect(handlePageChangeMock).toHaveBeenCalledWith(4);
		expect(handlePageChangeMock).toHaveBeenCalledTimes(2);
	});

	it('shows the correct range of page numbers around the active page', () => {
		const { getByText } = render(Pagination, {
			props: {
				activePage: 5,
				pageCount: 10,
				handlePageChange: handlePageChangeMock
			}
		});

		// Test for the presence of pages near the active page
		expect(getByText('4').innerHTML).toBe('4');
		expect(getByText('5').innerHTML).toBe('5');
		expect(getByText('5').className).contain('text-primary');
		expect(getByText('6').innerHTML).toBe('6');
	});
});
