import Button from './Button.svelte';
import { describe, test, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/svelte';
import TestButton from './TestButton.svelte';

describe('Button', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('it should render a button', () => {
		const { getByRole, getByTestId } = render(Button);

		expect(() => getByRole('button')).not.toThrow();
		expect(() => getByTestId('loading-spinner')).toThrow();
		expect(getByRole('button').hasAttribute('disabled')).toBe(false);
	});

	test('it should render a button with text passed as its child', () => {
		// we have created a test button component since svelte does not offer good testing support for slots
		const { getByTestId } = render(TestButton, { Component: Button });

		expect(() => getByTestId('slot')).not.toThrow();
		expect(getByTestId('slot').textContent).toBe('Test Data');
	});

	test('it should return a spinner when loading is true', () => {
		const { rerender, getByTestId } = render(Button, {
			props: { loading: false }
		});

		expect(() => getByTestId('loading-spinner')).toThrow();
		rerender({ props: { loading: true } });
		expect(() => getByTestId('loading-spinner')).not.toThrow();
	});

	test('it should be disabled if the disabled prop is true', () => {
		const { getByRole } = render(Button, {
			props: { disabled: true }
		});

		expect(() => getByRole('button')).not.toThrow();
		expect(getByRole('button').hasAttribute('disabled')).toBe(true);
	});

	test('it should fire the onClick event when clicked', async () => {
		const onClickFunction = vi.fn();
		render(Button, {
			props: { onclick: onClickFunction }
		});

		const button = screen.getByRole('button');
		expect(onClickFunction).not.toHaveBeenCalled();
		await fireEvent.click(button);
		expect(onClickFunction).toHaveBeenCalled();
	});
});
