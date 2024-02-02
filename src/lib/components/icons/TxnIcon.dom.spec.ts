
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import TxnIcon from './TxnIcon.svelte';
import { staticImages } from '../images/staticImages';

describe('LinkComponent', () => {
    it('renders correctly with provided txnHashUrl', () => {
        const txnHashUrl = 'https://example.com/tx/1234';
        const { getByRole, getByAltText, container } = render(TxnIcon, {
            props: { txnHashUrl }
        });

        const link = getByRole('link');
        expect(link.getAttribute('href')).toBe(txnHashUrl);
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');

        const image = getByAltText('txn link');
        expect(image.getAttribute('src')).toBe(staticImages.OpenInNew);
        expect(image.getAttribute('width')).toBe('13px');

        // Perform snapshot test
        expect(container).toMatchSnapshot();
    });
});