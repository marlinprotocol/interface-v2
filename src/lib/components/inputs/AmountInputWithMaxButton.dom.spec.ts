import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import AmountInputWithMaxButton from './AmountInputWithMaxButton.svelte'; // Update with the actual path
import { tick } from 'svelte';
import html from '@playpilot/svelte-htm';
const { connected } = await vi.hoisted(() => import('$lib/data-stores/mock-data-stores/mockStores'));


beforeAll(() => {
    vi.mock('$lib/data-stores/walletProviderStore', async () => {
        return {
            connected,
        }
    });
});


describe('AmountInputWithMaxButton', () => {
    const title = 'Test Title';
    const tooltipText = 'Info Tooltip';
    const inputAmountString = '123';
    const maxAmountText = 'Balance: 1000';
    const maxAmountTooltipText = 'Your total balance';
    const handleUpdatedAmount = vi.fn();

    it(`render's the component properly`, () => {
        const { container } = render(AmountInputWithMaxButton, {
            title,
            tooltipText,
            inputAmountString,
            maxAmountText,
            maxAmountTooltipText,
            handleUpdatedAmount,
            inputCardVariant: 'primary'
        });
        expect(container).toMatchSnapshot();
    })

    it('renders correctly based on props and slots', async () => {


        const { getByDisplayValue, container } = render(AmountInputWithMaxButton, {
            title,
            tooltipText,
            inputAmountString,
            maxAmountText,
            maxAmountTooltipText,
            handleUpdatedAmount,
            inputCardVariant: 'primary'
        });

        // Assert that title and tooltip are rendered
        expect(container.innerHTML).contain(tooltipText);

        // Assert input is bound to inputAmountString
        const input = getByDisplayValue(inputAmountString);
        expect(input).toBeTruthy();

        // Simulate user input
        fireEvent.input(input, { target: { value: '456' } });
        expect(handleUpdatedAmount).toHaveBeenCalled();
    });

    it('disables the input when handleUpdatedAmount is undefined or connected is false', async () => {
        connected.mockSetSubscribeValue(false);
        const { getByDisplayValue } = render(AmountInputWithMaxButton, {
            title: 'Disabled Test',
            inputAmountString: '0',
            handleUpdatedAmount: undefined // Not providing handleUpdatedAmount makes the input disabled
        });

        const input = getByDisplayValue('0') as HTMLInputElement;
        expect(input.disabled).toBeTruthy();
    });

    it('enables the input when handleUpdatedAmount is undefined or connected is true', async () => {
        // Update `connected` store
        connected.mockSetSubscribeValue(true);
        await tick();
        const { getByPlaceholderText } = render(AmountInputWithMaxButton, {
            title: 'Disabled Test',
            inputAmountString: '0',
            handleUpdatedAmount: vi.fn() // Providing this should enable the input
        });

        expect((getByPlaceholderText('0.00') as HTMLInputElement).disabled).toBeFalsy();
    });

    it('Check that Divider is not rendered without inputMaxButton slot', () => {
        const divider = screen.queryByTestId('divider');
        expect(divider).not.toBeTruthy();
    })

    it('Check that Divider is rendered withinputMaxButton slot', async () => {
        const { getAllByTestId, getByText } = render(html`
        <${AmountInputWithMaxButton} title='${'text'}' inputAmountString=${'0'} handleUpdatedAmount=${vi.fn()}>
        <div slot='inputMaxButton'>inputMaxButton</div>
        <div slot='input-end-button'>input-end-button</div>
        </${AmountInputWithMaxButton}>`);
        const dividers = getAllByTestId('divider');
        expect(dividers.length).toBeTruthy();
        expect(dividers.length).toBe(2)
        expect(await getByText('inputMaxButton')).toBeTruthy()
        expect(await getByText('input-end-button')).toBeTruthy()
    })

});