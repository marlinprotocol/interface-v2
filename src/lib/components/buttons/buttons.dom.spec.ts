import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import BackButton from './BackButton.svelte';
import MaxButton from './MaxButton.svelte';
import CollapseButton from './CollapseButton.svelte';
import { buttonClasses } from '$lib/atoms/componentClasses';

describe('Back button', () => {
	it('renders the back button component properly', () => {
		const { container } = render(BackButton);
		expect(container).toMatchSnapshot();
	});

	it('renders correctly with initial props', () => {
		const { getByText, getByRole } = render(BackButton, {
			props: {
				href: '#',
				text: 'Back'
			}
		});
		expect(getByText('Back')).toBeTruthy();
		const anchor = getByRole('link');
		expect(anchor.getAttribute('href')).toBe('#');
	});

	it('renders the correct image', () => {
		const { getByAltText } = render(BackButton, {
			props: {
				href: '#',
				text: 'Back'
			}
		});

		const image = getByAltText('Back');
		const staticImagesImported = { LeftBlueArrow: '/images/left-blue-arrow.svg' };
		expect(image.getAttribute('src')).toBe(staticImagesImported.LeftBlueArrow);
	});

	it('renders with correct classes', () => {
		const { getByTestId } = render(BackButton, {
			props: {
				href: '#',
				text: 'Back'
			}
		});

		const anchorButton = getByTestId('back-button');
		expect(anchorButton.className).toBe('flex gap-3');
	});
});

describe('CollapseButton', () => {
	it('renders the collapse button component properly', () => {
		const { container } = render(CollapseButton);
		expect(container).toMatchSnapshot();
	});

	it('renders correctly with initial props', async () => {
		const mockFn = vi.fn(() => {});
		const testingId = 'testing-collapse-button';
		const { getByTestId } = render(CollapseButton, {
			props: {
				disabled: false,
				onclick: mockFn,
				id: testingId
			}
		});
		const button = getByTestId('collapse-button') as HTMLButtonElement;
		expect(button).toBeTruthy();
		expect(button.className).contain('w-max');
		expect(button.id).contain(testingId);
		expect(button.disabled).toBe(false);
	});

	it('fires an onClick event if disabled false', async () => {
		const mockFn = vi.fn(() => {});
		const testingId = 'testing-collapse-button';
		const { getByTestId } = render(CollapseButton, {
			props: {
				disabled: false,
				onclick: mockFn,
				id: testingId
			}
		});

		// Simulate a click event on the button.
		const button = getByTestId('collapse-button');
		await fireEvent.click(button);

		// Check if the mock function was called.
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it("onClick doesn't work if disabled true", async () => {
		const mockFn = vi.fn(() => {});
		const testingId = 'testing-collapse-button';
		const { getByTestId } = render(CollapseButton, {
			props: {
				disabled: true,
				onclick: mockFn,
				id: testingId
			}
		});

		// Simulate a click event on the button.
		const button = getByTestId('collapse-button');
		button.click();

		// Check if the mock function was called.
		expect(mockFn).toHaveBeenCalledTimes(0);
	});
});

describe('Max Button', () => {
	it('renders the max button component properly', () => {
		const { container } = render(MaxButton);
		expect(container).toMatchSnapshot();
	});

	it('renders with correct text and class', () => {
		const { getByText } = render(MaxButton);

		const button = getByText('MAX');
		expect(button).toBeTruthy(); // Button renders with text 'MAX'
		expect(button.className).toBe(buttonClasses.maxButton); // Button has correct class
	});

	it('is disabled when the disabled prop is true', () => {
		const { getByText } = render(MaxButton, { props: { disabled: true } });

		const button = getByText('MAX') as HTMLButtonElement;
		expect(button.disabled).toBe(true); // Button is disabled
	});

	it('calls the onclick function when clicked', async () => {
		const mockFn = vi.fn();
		const { getByText } = render(MaxButton, { props: { onclick: mockFn } });

		const button = getByText('MAX');
		button.click();

		expect(mockFn).toHaveBeenCalledTimes(1); // onclick mock function is called once
	});

	it('does not call onclick function when disabled', async () => {
		const mockFn = vi.fn();
		const { getByText } = render(MaxButton, { props: { disabled: true, onclick: mockFn } });

		const button = getByText('MAX');
		button.click();

		expect(mockFn).toHaveBeenCalledTimes(0); // onclick mock function is not called
	});
});
