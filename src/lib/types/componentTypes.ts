import type { BigNumber } from 'ethers';

export type TabModel = {
	id: string;
	title: string;
};

export type ButtonModel = {
	variant?: 'filled' | 'outlined' | 'text' | 'error';
	size?: 'small' | 'medium' | 'large';
	onclick: () => void;
};

export type TextModel = {
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'mini' | 'tiny' | 'nav';
	text: string;
	styleClass?: string;
};

export type CommonVariant = 'info' | 'success' | 'warning' | 'error';

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

export type InputCard = 'primary' | 'warning';
