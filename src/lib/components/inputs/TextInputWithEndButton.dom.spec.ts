import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import TextInputWithEndButton from './TextInputWithEndButton.svelte';
import html from '@playpilot/svelte-htm';

describe('TextInputWithEndButton', () => {
	const tooltipText = 'Test Tooltip';
	const title = 'Test Title';
	const placeholder = 'Enter something...';
	const styleClass = 'test-style';
	const inputValue = 'Test input value';

	it("render's the component properly", () => {
		const { container } = render(TextInputWithEndButton, {
			styleClass,
			title,
			placeholder,
			input: inputValue,
			disabled: false
		});
		expect(container).toMatchSnapshot();
	});

	it('passes props correctly to InputCardWithEndButton and renders input elements', () => {
		const { getByPlaceholderText, getByText } = render(TextInputWithEndButton, {
			styleClass,
			title,
			placeholder,
			input: inputValue,
			disabled: false
		});
		// Assert input properties are bound correctly
		const inputElement = getByPlaceholderText(placeholder) as HTMLInputElement;
		expect(inputElement.value).toBe(inputValue);
		expect(inputElement.disabled).toBeFalsy();
	});

	it("render's slots correctly", () => {
		const { getByText } = render(html`
        <${TextInputWithEndButton} 
        styleClass=${styleClass}
        tooltipText=${tooltipText} 
        title=${title} 
        placeholder=${placeholder}
        input=${inputValue}
        disabled=${false}
        >
         <div slot='titleEndButton'>titleEndButton</div>
         <div slot='endButton'>endButton</div>
        </${TextInputWithEndButton}>
      `);
		// Assert that slot content is rendered
		expect(getByText('titleEndButton')).toBeTruthy();
		expect(getByText('endButton')).toBeTruthy();
	});

	it('disables the input when disabled prop is true', () => {
		const placeholder = 'Enter something...';
		const { getByPlaceholderText } = render(TextInputWithEndButton, {
			styleClass,
			title,
			placeholder,
			input: inputValue,
			disabled: true
		});

		// Find the input by its placeholder and assert it's disabled
		const inputElement = getByPlaceholderText(placeholder) as HTMLInputElement;
		expect(inputElement.disabled).toBeTruthy();
	});

	// ... more tests for other props and behaviors ...
});
