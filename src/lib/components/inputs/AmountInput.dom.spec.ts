import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, } from '@testing-library/svelte';
import AmountInput from './AmountInput.svelte';

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


    // it('restricts non-numeric input when onlyInteger flag is true', async () => {
    //     const { getByPlaceholderText } = render(AmountInput, {
    //         props: {
    //             disabled: false,
    //             onlyInteger: true,
    //             value: '',
    //         },
    //     });

    //     const input = getByPlaceholderText('0') as HTMLInputElement;

    //     // The decimal point should be prevented.

    //     await fireEvent.keyDown(input, { key: '.' });
    //     await fireEvent.keyUp(input, { key: '.' });
    //     await fireEvent.keyDown(input, { key: '1' });
    //     await fireEvent.keyUp(input, { key: '1' });
    //     console.log({ value: input.value })

    //     // // The numeric key should be allowed.
    //     // await fireEvent.keyDown(input, { key: '1' });
    //     // console.log({ value: input.value })
    //     expect(input.value).toBe('1'); // The value should only be '1' since '.' was prevented.
    // });

    // it('restricts non-numeric input when onlyInteger flag is true', async () => {
    //     const mockPreventDefault = vi.fn();
    //     const { getByPlaceholderText } = render(AmountInput, {
    //         props: {
    //             disabled: false,
    //             onlyInteger: true,
    //             onChange: (e) => { console.log(e.target.value) }
    //         },
    //     });

    //     const input = getByPlaceholderText('0');

    //     // Simulate a decimal point keyDown event
    //     await fireEvent.keyDown(input, {
    //         target: { value: 'h' },
    //         preventDefault: mockPreventDefault
    //     });

    //     console.log({ 'a:': input.value })

    //     // // Simulate a numeric keyDown event
    //     // await fireEvent.change(input, {
    //     //     key: '1',
    //     //     preventDefault: mockPreventDefault
    //     // });

    //     // Assert that preventDefault was called for the decimal point, but not for the number
    //     expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    //     // expect(mockPreventDefault).toHaveBeenCalledWith();
    // });

    // it('allows decimal point when onlyInteger flag is false', async () => {
    //     const { getByPlaceholderText } = render(AmountInput, {
    //         props: {
    //             disabled: false,
    //             onlyInteger: false,
    //             value: '',
    //         },
    //     });

    //     const input = getByPlaceholderText('0.00') as HTMLInputElement;

    //     // The decimal point should be allowed.
    //     await fireEvent.keyDown(input, { target: { value: '4839.398' } });

    //     // // The numeric key should be allowed.
    //     await fireEvent.keyDown(input, { target: { value: '19238' } });

    //     expect(input.value).toBe('.1'); // The value should include the '.' as entered.
    // });

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