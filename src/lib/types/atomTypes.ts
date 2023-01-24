import type { BigNumber } from 'ethers';

export type Variants =
	| 'primary'
	| 'secondary'
	| 'error'
	| 'success'
	| 'accent'
	| 'info'
	| 'warning';

export type TabModel = {
	id: string;
	title: string;
};

export type ButtonModel = {
	variant?: 'primary' | 'secondary' | 'error' | 'success';
	onclick: () => void;
};

export type TextModel = {
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'mini' | 'tiny';
	text: string;
	styleClass?: string;
};

export type TooltipVariant =
	| 'tooltip-primary'
	| 'tooltip-secondary'
	| 'tooltip-accent'
	| 'tooltip-info'
	| 'tooltip-success'
	| 'tooltip-warning'
	| 'tooltip-error';

export type TooltipDirection = 'tooltip-top' | 'tooltip-right' | 'tooltip-bottom' | 'tooltip-left';

export type ModalInputModel = {
	title: string;
	tooltipText?: string;
	maxAmount: BigNumber;
	maxAmountText?: string;
	handleApproveClick?: () => void;
};
