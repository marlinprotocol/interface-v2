export type ButtonModel = {
	variant?:
		| 'filled'
		| 'outlined'
		| 'text'
		| 'error'
		| 'info'
		| 'greyFilled'
		| 'greyOutlined'
		| 'whiteFilled'
		| 'icon'
		| 'tableConvertButton';
	size?: 'tiniest' | 'tiny' | 'smaller' | 'small' | 'medium' | 'large';
	onclick: (() => Promise<void> | void | boolean) | undefined;
};

export type TableModel = {
	header: {
		title: string;
		tooltipText?: string;
		id: string;
		sorting?: boolean;
		centered?: boolean;
	};
};

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export type InputCardVariant =
	| 'primary'
	| 'warning'
	| 'none'
	| 'search'
	| 'primary-mini'
	| 'yellow'
	| 'green'
	| 'v2Input';

export type CommonVariant =
	| 'primary'
	| 'secondary'
	| 'info'
	| 'success'
	| 'warning'
	| 'error'
	| 'disabled'
	| 'grey';

export type Toast = {
	id?: number;
	message: { title: string; description?: string };
	dismissible?: boolean;
	timeout?: number;
	variant: CommonVariant;
};

export type ToastModel = {
	bgColor: string;
	message: { title: string; description?: string };
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

export type CardsList = {
	title: string;
	description: string;
	logo: string;
	logoAlt: string;
	buttons: CardButton[];
}[];

export type CardButton = {
	text: string;
	href?: string;
	onclick?: () => void;
	icon?: {
		src: string;
		alt: string;
	};
	inAppRoute?: boolean;
	openInPopup?: {
		modalFor: string;
		descriptionText?: string;
		popupCtaText: string;
	};
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

export type DividerDirection = 'divider-horizontal' | 'divider-vertical';

export type TextModel = {
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'mini' | 'tiny' | 'nav';
	fontWeight?: 'font-normal' | 'font-bold' | 'font-medium' | 'font-semibold';
	text: string;
	styleClass?: string;
};

export type AppVariant = 'primary' | 'secondary';

export type SortDirection = 'asc' | 'desc';
