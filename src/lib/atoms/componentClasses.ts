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
		'btn btn-sm btn-ghost p-0 bg-transparent hover:bg-transparent text-sm font-bold text-primary'
};

export const dividerClasses = {
	vertical: 'w-[1px] bg-gray-500 h-4 rounded',
	horizontal: 'h-0.5 bg-gray-200 w-full rounded'
};
