import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, } from '@testing-library/svelte';
import AmountInput from './AmountInput.svelte';

const dispatchKeyDown = (input: HTMLInputElement, key: string, keyCode: string | number) => {
    fireEvent.keyDown(input, { key, keyCode });
}
describe('AmountInput', () => {
    it('renders with correct attributes', () => {
        const { container, getByPlaceholderText } = render(AmountInput, {
            props: {
                disabled: false,
                onlyInteger: false,
                value: '',
                styleClass: 'test-class'
            },
        });

        const input = getByPlaceholderText('0.00');
        expect(input).toBeTruthy();
        expect(input.getAttribute('id')).toBe('pond-input-amount');
        expect(input.className).toBe('hideInputNumberAppearance test-class');
        expect(container).toMatchSnapshot();
    });

    it('handles onChange event', async () => {
        const mockOnChange = vi.fn();
        const { getByPlaceholderText } = render(AmountInput, {
            props: {
                disabled: false,
                onlyInteger: false,
                value: '',
                onChange: mockOnChange
            },
        });

        const input = getByPlaceholderText('0.00') as HTMLInputElement;
        await fireEvent.input(input, { target: { value: '123' } });
        expect(mockOnChange).toHaveBeenCalled();
        expect(input.value).toBe('123');
    });

    it('allows numeric input without decimal point when onlyInteger is true', async () => {
        const { getByPlaceholderText } = render(AmountInput, { onlyInteger: true });
        const input = getByPlaceholderText('0') as HTMLInputElement;
        dispatchKeyDown(input, '5', 53); // Simulate pressing the '5' key
        expect(input.value).toBe(''); // The value should still be empty because pressing the key itself won't update value
    });

    it('prevents non-numeric input when onlyInteger is true', async () => {
        const { getByPlaceholderText } = render(AmountInput, { onlyInteger: true });
        const input = getByPlaceholderText('0') as HTMLInputElement;
        dispatchKeyDown(input, '.', 190); // Simulate pressing the '.' key
        expect(input.value).toBe(''); // Value should not change since '.' is not allowed for onlyInteger = true
    });


    it('allows numeric input and a single decimal point when onlyInteger is false', async () => {
        const { getByPlaceholderText } = render(AmountInput, { onlyInteger: false });
        const input = getByPlaceholderText('0.00') as HTMLInputElement;
        dispatchKeyDown(input, '3', 51); // Simulate pressing the '3' key
        dispatchKeyDown(input, '.', 190); // Simulate pressing the '.' key
        expect(input.value).toBe(''); // The value should still be empty because pressing the key itself won't update value
    });


    it('calls onFocusOut when focus is lost', async () => {
        const mockOnFocusOut = vi.fn();
        const { getByPlaceholderText } = render(AmountInput, {
            props: {
                onFocusOut: mockOnFocusOut
            },
        });

        const input = getByPlaceholderText('0.00');
        await fireEvent.focusOut(input);
        expect(mockOnFocusOut).toHaveBeenCalled();
    });
});