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
