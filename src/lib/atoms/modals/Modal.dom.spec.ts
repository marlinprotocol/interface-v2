import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Modal from './Modal.svelte';
import html from 'svelte-htm';

describe('Modal Component', () => {

    it(`render's modal correctly`, () => {
        const { container } = render(Modal, {
            props: {
                modalFor: 'test-modal',
            },
        });
        expect(container).toMatchSnapshot();
    });

    it("should render component inside slot properly", async () => {
        const { findByText } = render(html`
                <${Modal}>
                 <div slot='content'>content</div>
                 <div slot='icon'>icon</div>
                 <div slot='header'>header</div>
                 <div slot='title'>title</div>
                 <div slot='subtitle'>subtitle</div>
                 <div slot='actionButtons'>action buttons</div>
                </${Modal}>
              `);

        expect(await findByText('content')).toBeTruthy();
        expect(await findByText('icon')).toBeTruthy();
        expect(await findByText('header')).toBeTruthy();
        expect(await findByText('title')).toBeTruthy();
        expect(await findByText('subtitle')).toBeTruthy();
        expect(await findByText('action buttons')).toBeTruthy();
    });



    it('executes onClose function when close button is clicked', async () => {
        const onCloseMock = vi.fn();
        const { getByTestId } = render(Modal, {
            props: {
                modalFor: 'test-modal',
                onClose: onCloseMock
            }
        });

        const closeModalButton = getByTestId('modal-close-button');
        await fireEvent.click(closeModalButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it('applies correct modal width class based on modalWidth prop', () => {
        const { getByTestId } = render(Modal, {
            props: {
                modalFor: 'test-modal',
                modalWidth: 'custom-width-class'
            }
        });
        expect((getByTestId('modal').firstChild as HTMLElement).className).contains('custom-width-class');
    });

    it('applies padding and scrolling styles based on props', () => {
        const { container } = render(Modal, {
            props: {
                padding: false,
                isScrollable: true
            }
        });

        const modalBody = container.querySelector('.modal-body');
        expect(modalBody?.className).contain('overflow-y-auto overflow-x-hidden');
        expect(modalBody?.className).not.contain('px-6 pb-4 pt-2');
    });
});