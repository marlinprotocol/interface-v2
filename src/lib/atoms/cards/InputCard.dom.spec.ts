import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import InputCard from './InputCard.svelte';
import html from '@playpilot/svelte-htm';

describe('InputCard component', () => {
	it('applies the correct classes for primary variant', () => {
		const { container } = render(InputCard, { variant: 'primary' });
		expect(container).toMatchSnapshot();
	});

	it('applies the correct classes for primary variant', () => {
		const { getByTestId } = render(InputCard, { variant: 'primary' });
		expect(getByTestId('input-card').className).contain('bg-white px-6 py-[30px]');
	});

	it('applies the correct classes for primary-mini variant', () => {
		const { getByTestId } = render(InputCard, { variant: 'primary-mini' });
		expect(getByTestId('input-card').className).contain('bg-base-200 py-2 px-4');
	});

	it('applies the correct classes for warning variant', () => {
		const { getByTestId } = render(InputCard, { variant: 'warning' });
		expect(getByTestId('input-card').className).contain('bg-red-100 px-4 py-1');
	});

	it('applies no classes for none variant', () => {
		const { getByTestId } = render(InputCard, { variant: 'none' });
		expect(getByTestId('input-card').className).contain('');
	});

	it('applies the correct classes for search variant', () => {
		const { getByTestId } = render(InputCard, { variant: 'search' });
		expect(getByTestId('input-card').className).contain('bg-white px-4 py-2.5');
	});

	it('applies default classes when variant is undefined', () => {
		const { getByTestId } = render(InputCard, { variant: undefined });
		expect(getByTestId('input-card').className).contain('w-full bg-white px-6');
	});

	it('should render component inside slot properly', async () => {
		const { findByText } = render(html`
                <${InputCard}>
                 <div>content</div>
                </${InputCard}>
              `);
		expect(await findByText('content')).toBeTruthy();
	});
});
