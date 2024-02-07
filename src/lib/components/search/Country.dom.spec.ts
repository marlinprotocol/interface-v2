import { render } from '@testing-library/svelte';
import Country from './Country.svelte';

describe('AutocompleteItem', () => {

    it(`render's the component properly`, () => {
        const { container } = render(Country, { itemLabel: 'France' });
        expect(container).toMatchSnapshot();
    })

    it('should render item label', async () => {
        const { getByText } = render(Country, { itemLabel: 'France' });
        expect(getByText('France')).toBeTruthy();
    });

    it('should apply "autocomplete-active" class when highlighted is true', async () => {
        const { container } = render(Country, { itemLabel: 'France', highlighted: true });
        const item = container.querySelector('.autocomplete-items');
        expect(item?.className).contain('autocomplete-active');
    });

    it('should not apply "autocomplete-active" class when highlighted is false', async () => {
        const { container } = render(Country, { itemLabel: 'France', highlighted: false });
        const item = container.querySelector('.autocomplete-items');
        expect(item?.className).not.contain('autocomplete-active');
    });
});


