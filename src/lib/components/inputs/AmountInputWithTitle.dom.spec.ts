import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import AmountInputWithTitle from './AmountInputWithTitle.svelte';

describe('AmountInputWithTitle', () => {
    const title = 'Sample Title';
    const inputAmountString = '123';
    const prefix = '$';
    const suffix = 'USD';
    const onlyInteger = false;
    const handleUpdatedAmount = vi.fn();
    const onFocusOut = vi.fn();

    it(`render's the component properly`, () => {
        const { container } = render(AmountInputWithTitle, {
            title: title,
            inputAmountString: inputAmountString,
            handleUpdatedAmount: handleUpdatedAmount,
            onFocusOut: onFocusOut,
            prefix: prefix,
            suffix: suffix,
            onlyInteger: onlyInteger,
            disabled: false
        });
        expect(container).toMatchSnapshot();
    })

    it('renders the title and input with the passed props', async () => {
        const { findByText, container } = render(AmountInputWithTitle, {
            title: title,
            inputAmountString: inputAmountString,
            handleUpdatedAmount: handleUpdatedAmount,
            onFocusOut: onFocusOut,
            prefix: prefix,
            suffix: suffix,
            onlyInteger: onlyInteger,
            disabled: false
        });

        // Assert the title is rendered correctly
        expect(await findByText(title)).toBeTruthy();

        // Assert the prefix and suffix are rendered correctly
        expect(await findByText(prefix)).toBeTruthy();
        expect(await findByText(suffix)).toBeTruthy();

        const input = Array.from(container.getElementsByTagName('input'))[0];

        expect(input.value).toBe(inputAmountString);

        // // Simulate changing the input value
        fireEvent.input(input, { target: { value: '456' } });

        expect(handleUpdatedAmount).toHaveBeenCalled();
        expect(input.value).toBe('456')

        // Simulate the focusout event
        fireEvent.focusOut(input);
        expect(onFocusOut).toHaveBeenCalled();
    });

});