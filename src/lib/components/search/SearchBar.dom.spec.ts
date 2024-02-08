import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import SearchBar from './SearchBar.svelte';

describe('SearchBar', () => {

    it(`render's the component properly`, () => {
        const { container } = render(SearchBar, {
            props: {
                placeholder: 'Search...',
                disabled: false,
                input: '',
            },
        });

        expect(container).toMatchSnapshot();
    });


    it('renders with correct placeholder and disabled state', () => {
        const { getByPlaceholderText } = render(SearchBar, {
            props: {
                placeholder: 'Search...',
                disabled: false,
                input: '',
            },
        });

        const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;
        expect(inputElement).toBeTruthy();
        expect(inputElement.disabled).toBe(false);
    });

    it('calls onSearchClick when input is clicked', async () => {
        const mockOnSearchClick = vi.fn();
        const { getByPlaceholderText } = render(SearchBar, {
            props: {
                placeholder: 'Search...',
                onSearchClick: mockOnSearchClick,
                input: '',
            },
        });

        const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;
        await fireEvent.click(inputElement);
        expect(mockOnSearchClick).toHaveBeenCalled();
    });

    it('binds input value correctly', async () => {
        const { getByPlaceholderText } = render(SearchBar, {
            props: {
                placeholder: 'Search...',
                input: 'Initial Value',
            },
        });

        const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;
        expect(inputElement.value).toBe('Initial Value');

        await fireEvent.input(inputElement, { target: { value: 'New Value' } });
        expect(inputElement.value).toBe('New Value');
    });

    it('is disabled when disabled prop is true', () => {
        const { getByPlaceholderText } = render(SearchBar, {
            props: {
                placeholder: 'Search...',
                disabled: true,
                input: '',
            },
        });

        const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;
        expect(inputElement.disabled).toBe(true);
    });
});
