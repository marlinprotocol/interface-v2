const baseFilledButtonClasses = 'btn btn-theme btn-sm px-5 items-center';

export const buttonClasses = {
	filled: `${baseFilledButtonClasses} btn-primary disabled:bg-primary disabled:bg-opacity-60 disabled:text-white`,
	greyFilled: `${baseFilledButtonClasses} bg-base-200 text-primary border-none hover:bg-base-300`,
	lightblueFilled: `${baseFilledButtonClasses} btn-lightblue`,
	whiteFilled: `${baseFilledButtonClasses} bg-white text-primary border-none hover:bg-base-200`,
	outlined:
		'btn btn-theme btn-sm text-primary px-4 border-primary bg-inherit hover:text-primary-focus hover:border-primary-focus hover:bg-inherit',
	error:
		'btn btn-theme btn-sm text-error px-5 border-error bg-inherit hover:bg-inherit hover:border-error hover:text-error-focus',
	text: 'btn btn-sm btn-ghost p-0 bg-transparent hover:bg-transparent',
	icon: 'btn btn-xs btn-ghost btn-circle p-0 bg-transparent hover:bg-transparent flex',
	maxButton:
		'btn btn-sm btn-ghost p-0 bg-transparent hover:bg-transparent text-sm font-bold text-primary',
	largeButton: 'flex gap-2 text-primary h-14 text-base font-semibold items-center',
	convertButton: 'btn btn-xs text-xs h-4 py-0'
};

export const dividerClasses = {
	vertical: 'w-[1px] bg-gray-500 h-4 rounded',
	horizontal: 'h-0.5 bg-gray-200 w-full rounded',
	verticalPrimary: 'w-[1px] bg-primary h-4 rounded'
};

export const tableCellClasses = {
	heading: 'text-primary text-sm font-semibold px-2 py-6',
	row: 'font-semibold px-2 py-4',
	rowWithIcon: 'flex flex-col items-center justify-start',
	empty: 'text-base text-center p-4 w-full'
};
