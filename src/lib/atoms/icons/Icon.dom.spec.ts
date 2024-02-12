import { render } from '@testing-library/svelte';
import Icon from './Icon.svelte';
import { describe, it, afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import chevronDown from 'svelte-awesome/icons/chevronDown';

describe('IconWrapper', () => {
    afterEach(cleanup);
    const testSize = 20;
    const testPadding = 2;

    it('renders the Icon component', () => {
        const { container } = render(Icon, { data: chevronDown });
        expect(container).toMatchSnapshot();
    });

    it('applies dynamic style based on "size", "padding", and "border" props', () => {
        const { getByTestId } = render(Icon, { props: { size: testSize, padding: testPadding, border: true, data: chevronDown } });
        const icon = getByTestId('icon');
        const expectedStyle = `width: ${testSize}px; height: ${testSize}px; cursor: pointer; border: 1px solid; border-radius: 20px; padding: ${testPadding}px;`;
        expect(icon.style.cssText).toBe(expectedStyle);
    });

    it('applies dynamic style based on "size", "padding"', () => {
        const { getByTestId } = render(Icon, { props: { size: testSize, padding: testPadding, border: false, data: chevronDown } });
        const icon = getByTestId('icon');
        // padding gets ignored if border is false.
        const expectedStyle = `width: ${testSize}px; height: ${testSize}px; cursor: pointer;`;
        expect(icon.style.cssText).toBe(expectedStyle);
    });

    it('applies "flip" prop to the Icon', () => {
        const testFlip = 'horizontal';
        const { getByTestId } = render(Icon, { flip: testFlip, data: chevronDown });
        const icon = getByTestId('icon');
        expect(icon.getAttribute('class')).contains('fa-flip-horizontal')
    });

    it('applies "spin" prop to the Icon', () => {
        const { getByTestId } = render(Icon, { spin: true, data: chevronDown });
        const icon = getByTestId('icon');
        expect(icon.getAttribute('class')).contains('fa-spin')
    });

    it('adds "iconColorClass" to the class list of the Icon', () => {
        const testIconColorClass = 'text-blue-500';
        const { getByTestId } = render(Icon, { iconColorClass: testIconColorClass, data: chevronDown });
        const icon = getByTestId('icon');
        expect(icon.getAttribute('class')).toContain(testIconColorClass);
    });

    it('includes "styleClass" in the class list of the Icon', () => {
        const testStyleClass = 'custom-icon-class';
        const { getByTestId } = render(Icon, { styleClass: testStyleClass, data: chevronDown });
        const icon = getByTestId('icon');
        expect(icon.getAttribute('style')).toContain(testStyleClass);
    });
});