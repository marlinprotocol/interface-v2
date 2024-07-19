import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ApproveAndConfirmModal from './ApproveAndConfirmModal.svelte';
import { tick } from 'svelte';

describe('ApproveAndConfirmModal', () => {
	it("render's the ApproveAndConfirmModal properly", () => {
		const handleApproveClick = vi.fn().mockImplementation(() => Promise.resolve());
		const handleConfirmClick = vi.fn().mockImplementation(() => Promise.resolve());
		const { container } = render(ApproveAndConfirmModal, {
			handleApproveClick,
			approved: false,
			handleConfirmClick,
			rowIndex: 10,
			modalForApproveConfirm: 'test-id-some-id',
			handleSuccessFinishClick: () => {},
			conversionFrom: 'mPond',
			amountConverted: 123999999999n,
			confirmButtonText: 'CONVERT'
		});
		expect(container).toMatchSnapshot();
	});
	it('should call handleApproveClick when approve button is clicked and render relevant elements', async () => {
		const handleApproveClick = vi.fn().mockImplementation(() => Promise.resolve());
		const handleConfirmClick = vi.fn().mockImplementation(() => Promise.resolve());
		const { getByText } = render(ApproveAndConfirmModal, {
			handleApproveClick,
			approved: false,
			handleConfirmClick,
			rowIndex: 10,
			modalForApproveConfirm: 'test-id-some-id',
			handleSuccessFinishClick: () => {},
			conversionFrom: 'mPond',
			amountConverted: 123999999999n,
			confirmButtonText: 'CONVERT'
		});
		expect(getByText('Approve Transaction')).toBeTruthy();
		await fireEvent.click(getByText('APPROVE'));
		await tick();
		expect(handleApproveClick).toHaveBeenCalledOnce();
	});
	it('should call handleConfirmClick when confirm button is clicked and render relevant elements', async () => {
		const handleConfirmClick = vi.fn().mockImplementation(() => Promise.resolve());
		const handleSuccessFinishClick = vi.fn();
		const handleApproveClick = vi.fn().mockImplementation(() => Promise.resolve());

		const { getByText } = render(ApproveAndConfirmModal, {
			handleApproveClick,
			approved: true,
			handleConfirmClick,
			rowIndex: 10,
			modalForApproveConfirm: 'test-id-some-id',
			handleSuccessFinishClick,
			conversionFrom: 'mPond',
			amountConverted: 123999999999n,
			confirmButtonText: 'CONVERT'
		});

		expect(getByText('Confirm Transaction')).toBeTruthy();
		await fireEvent.click(getByText('CONVERT'));

		expect(handleConfirmClick).toHaveBeenCalled();
		await tick();
		expect(handleSuccessFinishClick).toHaveBeenCalled();
	});
});
