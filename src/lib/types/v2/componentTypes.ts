export type ButtonModel = {
	variant?:
		| 'filled'
		| 'outlined'
		| 'text'
		| 'error'
		| 'info'
		| 'greyFilled'
		| 'whiteFilled'
		| 'tableConvertButton';
	size?: 'tiniest' | 'tiny' | 'smaller' | 'small' | 'medium' | 'large';
	onclick: (() => Promise<void> | void | boolean) | undefined;
};

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export type InputCardVariant = 'primary' | 'warning' | 'none' | 'search' | 'primary-mini';

export type CommonVariant = 'success' | 'warning' | 'error';

export type Toast = {
	id?: number;
	message: { title: string; description: string };
	dismissible?: boolean;
	timeout?: number;
	variant: CommonVariant;
};

export type ToastModel = {
	bgColor: string;
	message: { title: string; description: string };
	className: string;
	dismissible: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	iconData: any;
	id: number;
	timeout: number;
	variant: CommonVariant;
};

export type ModalInputModel = {
	title: string;
	tooltipText?: string;
	maxAmount: bigint;
	maxAmountText?: string;
	maxAmountTooltipText?: string;
	handleApproveClick?: () => void;
	inputCardVariant?: InputCardVariant;
};
