import { cleanup, fireEvent, render } from '@testing-library/svelte';
import ApproveAndConfirmModal from './ApproveAndConfirmModal.svelte';

describe('Modal', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('ApproveAndConfirmModal render with required props', () => {
		const { getAllByTestId, container, getByText, getByAltText } = render(ApproveAndConfirmModal, {
			props: {
				approved: true,
				handleApproveClick: async () => {},
				handleConfirmClick: async () => {},
				handleSuccessFinishClick: async () => {},
				modalForApproveConfirm: 'Approve And Confirm Modal',
				rowIndex: 2
			}
		});
		expect(
			getAllByTestId('modal')[0].previousElementSibling?.id === 'Approve And Confirm Modal'
		).toBe(true);
		expect(getByText('Confirm Transaction')).toBeTruthy();
		expect(getAllByTestId('modal')[0].contains(getByAltText('Copy'))).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('Approve button click', async () => {
		const { getAllByTestId, getByText } = render(ApproveAndConfirmModal, {
			props: {
				approved: false,
				handleApproveClick: async () => {
					getByText('APPROVE').setAttribute('id', 'approve-button-click');
				},
				handleConfirmClick: async () => {},
				handleSuccessFinishClick: async () => {},
				modalForApproveConfirm: 'Approve And Confirm Modal',
				rowIndex: 2
			}
		});
		expect(
			getAllByTestId('modal')[0].previousElementSibling?.id === 'Approve And Confirm Modal'
		).toBe(true);
		expect(getByText('Approve Transaction')).toBeTruthy();
		const approvedButton = getByText('APPROVE');
		expect(approvedButton.id).toBeFalsy();
		await fireEvent.click(approvedButton);
		expect(approvedButton.id === 'approve-button-click').toBe(true);
	});

	test('Confirm button click', async () => {
		const { getAllByTestId, getByText } = render(ApproveAndConfirmModal, {
			props: {
				approved: true,
				handleConfirmClick: async () => {
					getByText('CONFIRM').setAttribute('id', 'confirm-button-click');
				},
				handleApproveClick: async () => {},
				handleSuccessFinishClick: async () => {},
				modalForApproveConfirm: 'Approve And Confirm Modal',
				rowIndex: 2
			}
		});
		expect(
			getAllByTestId('modal')[0].previousElementSibling?.id === 'Approve And Confirm Modal'
		).toBe(true);
		expect(getByText('Confirm Transaction')).toBeTruthy();
		const confirmButton = getByText('CONFIRM');
		expect(confirmButton.id).toBeFalsy();
		await fireEvent.click(confirmButton);
		expect(confirmButton.id === 'confirm-button-click').toBe(true);
	});

	test('handleSuccessFinishClick function call', async () => {
		const { getAllByTestId, getByText } = render(ApproveAndConfirmModal, {
			props: {
				approved: true,
				handleConfirmClick: async () => {},
				handleApproveClick: async () => {},
				handleSuccessFinishClick: async () => {
					getByText('CONFIRM').setAttribute('id', 'success-finish-click');
				},
				modalForApproveConfirm: 'Approve And Confirm Modal',
				rowIndex: 2
			}
		});
		expect(
			getAllByTestId('modal')[0].previousElementSibling?.id === 'Approve And Confirm Modal'
		).toBe(true);
		expect(getByText('Confirm Transaction')).toBeTruthy();
		const confirmButton = getByText('CONFIRM');
		expect(confirmButton.id).toBeFalsy();
		await fireEvent.click(confirmButton);
		expect(confirmButton.id === 'success-finish-click').toBe(true);
	});

	test('SuccessfulConversionModal correctly renders', async () => {
		const { getAllByTestId } = render(ApproveAndConfirmModal, {
			props: {
				approved: true,
				handleApproveClick: async () => {},
				handleConfirmClick: async () => {},
				handleSuccessFinishClick: async () => {},
				modalForApproveConfirm: 'Approve And Confirm Modal',
				rowIndex: 2
			}
		});
		expect(
			getAllByTestId('modal')[0].previousElementSibling?.id === 'Approve And Confirm Modal'
		).toBe(true);
		expect(
			getAllByTestId('modal')[1].previousElementSibling?.id === 'success-conversion-modal-2'
		).toBe(true);
	});
});
