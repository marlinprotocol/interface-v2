import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Popover from './PopOver.svelte';
import { buttonClasses } from '../componentClasses';
import html from '@playpilot/svelte-htm';


describe('YourComponent', () => {
    it('should render popover correctly', () => {
        const { container } = render(Popover);
        expect(container).toMatchSnapshot();

    })
    it('should render a button with the correct class from buttonClasses', () => {
        const { getByTestId } = render(Popover);
        expect(getByTestId('popover-button').className).contain(buttonClasses.icon)
    });


    it("should render component inside slot (icon, content) properly", async () => {
        const { findByText } = render(html`
                <${Popover}>
                 <div slot='content'>content</div>
                 <div slot='icon'>icon</div>
                </${Popover}>
              `);

        expect(await findByText('content')).toBeTruthy();
        expect(await findByText('icon')).toBeTruthy();
    });


});
