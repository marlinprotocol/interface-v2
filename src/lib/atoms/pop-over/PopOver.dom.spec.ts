import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Popover from './PopOver.svelte';
import { buttonClasses } from '../componentClasses';


describe('YourComponent', () => {
    it('should render popover correctly', () => {
        const { container } = render(Popover);
        expect(container).toMatchSnapshot();

    })
    it('should render a button with the correct class from buttonClasses', () => {
        const { getByTestId } = render(Popover);
        expect(getByTestId('popover-button').className).contain(buttonClasses.icon)
    });
});
