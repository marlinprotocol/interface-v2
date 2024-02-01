import { render } from '@testing-library/svelte';
import TableComponent from './Table.svelte';
import html from 'svelte-htm';

describe('TableComponent', () => {
    const tableHeadingMock = [
        { id: '1', title: 'Heading 1' },
        { id: '2', title: 'Heading 2' },
        { id: '3', title: 'Heading 3' },
    ];
    const handleSortDataMock = vi.fn((id: string) => { console.log(id) });

    it(`render's table correctly`, () => {
        const { container } = render(TableComponent, {
            tableHeading: tableHeadingMock,
            styleClass: 'custom-table-style',
            headingStyleClass: 'custom-heading-style',
            handleSortData: handleSortDataMock,
            iconWidth: '16px',
            tablePadding: 'px-8 py-6',
        });
        expect(container).toMatchSnapshot()
    })
    it('renders table headings and applies styles correctly', () => {


        const { getByTestId, getByText } = render(TableComponent, {
            tableHeading: tableHeadingMock,
            styleClass: 'custom-table-style',
            headingStyleClass: 'custom-heading-style',
            handleSortData: handleSortDataMock,
            iconWidth: '16px',
            tablePadding: 'px-8 py-6',
        });

        // Check if the table container has the correct classes
        expect(getByTestId('table-container').className).contain('overflow-x-auto overflow-y-hidden px-8 py-6 custom-table-style');

        // Check if each heading is rendered with a TableHeadingText component and has the correct classes
        for (const heading of tableHeadingMock) {
            expect(getByText(heading.title).innerHTML).toBe(heading.title);
            expect(getByText(heading.title).closest('th')?.innerHTML).contain('custom-heading-style');
        }
    });

    it("should render component inside slot (table body) properly", async () => {
        const { findByText } = render(html`
                <${TableComponent} tableHeading=${tableHeadingMock}>
                 <div slot='tableBody'>table-body</div>
                </${TableComponent}>
              `);

        expect(await findByText('table-body')).toBeTruthy();
    });



    // Additional tests can be written based on the need, such as checking the tooltip directions, etc.
});