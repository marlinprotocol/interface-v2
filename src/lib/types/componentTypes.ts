import type { BigNumber } from 'ethers';

export type TabModel = {
	id: string;
	title: string;
};

export type ButtonModel = {
	variant?: 'filled' | 'outlined' | 'text' | 'error' | 'info' | 'greyFilled' | 'whiteFilled';
	size?: 'small' | 'medium' | 'large';
	onclick: () => void;
};

export type TextModel = {
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'mini' | 'tiny' | 'nav';
	fontWeight?: 'normal' | 'bold' | 'medium';
	text: string;
	styleClass?: string;
};

export type TableModel = {
	header: {
		title: string;
		tooltipText?: string;
		id: string;
		sorting?: boolean;
	};
};

export type CommonVariant =
	| 'primary'
	| 'secondary'
	| 'info'
	| 'success'
	| 'warning'
	| 'error'
	| 'disabled';

export type AppVariant = 'primary' | 'secondary';

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
	maxAmountTooltipText?: string;
	handleApproveClick?: () => void;
	inputCardVariant?: InputCardVariant;
};

export type AlertModel = {
	text: string;
	variant: CommonVariant;
	alertVariant: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';
	duration?: number;
	icon?: CommonVariant;
};

export type Toast = {
	id?: number;
	message: string;
	dismissible?: boolean;
	timeout?: number;
	variant?: CommonVariant;
};

export type ToastModel = {
	iconColor: string;
	message: string;
	className: string;
	dismissible: boolean;
	iconData: any;
	id: number;
	timeout: number;
	variant: CommonVariant;
};

export type InputCardVariant = 'primary' | 'warning' | 'none';
