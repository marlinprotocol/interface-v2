// export type TabModel = {
// 	id: string;
// 	title: string;
// };

// export type ButtonModel = {
// 	variant?:
// 		| 'filled'
// 		| 'outlined'
// 		| 'text'
// 		| 'error'
// 		| 'info'
// 		| 'greyFilled'
// 		| 'whiteFilled'
// 		| 'tableConvertButton';
// 	size?: 'tiniest' | 'tiny' | 'smaller' | 'small' | 'medium' | 'large';
// 	onclick: (() => Promise<void> | void | boolean) | undefined;
// };

// export type TextModel = {
// 	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'mini' | 'tiny' | 'nav';
// 	fontWeight?: 'font-normal' | 'font-bold' | 'font-medium' | 'font-semibold';
// 	text: string;
// 	styleClass?: string;
// };

// export type TableModel = {
// 	header: {
// 		title: string;
// 		tooltipText?: string;
// 		id: string;
// 		sorting?: boolean;
// 		centered?: boolean;
// 	};
// };

// export type CommonVariant =
// 	| 'primary'
// 	| 'secondary'
// 	| 'info'
// 	| 'success'
// 	| 'warning'
// 	| 'error'
// 	| 'disabled'
// 	| 'grey';

// export type AppVariant = 'primary' | 'secondary';

// export type TooltipVariant =
// 	| 'tooltip-primary'
// 	| 'tooltip-secondary'
// 	| 'tooltip-accent'
// 	| 'tooltip-info'
// 	| 'tooltip-success'
// 	| 'tooltip-warning'
// 	| 'tooltip-error';

// export type TooltipDirection = 'tooltip-top' | 'tooltip-right' | 'tooltip-bottom' | 'tooltip-left';

// export type ModalInputModel = {
// 	title: string;
// 	tooltipText?: string;
// 	maxAmount: bigint;
// 	maxAmountText?: string;
// 	maxAmountTooltipText?: string;
// 	handleApproveClick?: () => void;
// 	inputCardVariant?: InputCardVariant;
// };

// export type AlertModel = {
// 	text: string;
// 	variant: CommonVariant;
// 	alertVariant: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';
// 	duration?: number;
// 	icon?: CommonVariant;
// };

// export type Toast = {
// 	id?: number;
// 	message: string;
// 	dismissible?: boolean;
// 	timeout?: number;
// 	variant: CommonVariant;
// };

// export type ToastModel = {
// 	iconColor: string;
// 	message: string;
// 	className: string;
// 	dismissible: boolean;
// 	iconData: any;
// 	id: number;
// 	timeout: number;
// 	variant: CommonVariant;
// };

// export type InputCardVariant = 'primary' | 'warning' | 'none' | 'search' | 'primary-mini';

// export type DividerDirection = 'divider-horizontal' | 'divider-vertical';

// export type SortDirection = 'asc' | 'desc';
