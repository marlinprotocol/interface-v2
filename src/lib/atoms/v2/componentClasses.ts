const baseFilledButtonClasses =
	'btn btn-theme btn-sm items-center flex justify-center disabled:cursor-not-allowed !rounded-[100px]';

export const buttonClasses = {
	filled: `${baseFilledButtonClasses} btn-primary disabled:bg-primary disabled:bg-opacity-60 disabled:text-white`,
	greyFilled: `${baseFilledButtonClasses} bg-base-200 text-primary border-none hover:bg-base-300`,
	lightblueFilled: `${baseFilledButtonClasses} btn-lightblue`,
	whiteFilled: `${baseFilledButtonClasses} bg-white text-black border border-[#D9DADE] hover:bg-base-200`,
	outlined:
		'btn btn-theme btn-sm text-primary px-4 border-primary bg-inherit hover:text-primary-focus hover:border-primary-focus hover:bg-inherit disabled:bg-inherit disabled:text-grey-300 disabled:border-grey-300 disabled:cursor-not-allowed',
	greyOutlined: `${baseFilledButtonClasses} border-[#D9DADE] bg-inherit hover:text-primary-focus hover:border-primary-focus hover:bg-inherit disabled:bg-inherit disabled:text-grey-300 disabled:border-grey-300 disabled:cursor-not-allowed`,
	error:
		'btn btn-theme btn-sm text-error px-5 border-error bg-inherit hover:bg-inherit hover:border-error hover:text-error-focus disabled:cursor-not-allowed',
	text: 'btn btn-sm btn-ghost p-0 bg-transparent hover:bg-transparent disabled:bg-transparent disabled:cursor-not-allowed',
	icon: 'btn btn-xs btn-ghost btn-circle p-0 bg-transparent hover:bg-transparent flex disabled:cursor-not-allowed',
	iconLightBlue:
		'btn btn-xs btn-circle p-0 bg-base-300 hover:bg-base-300 border-none disabled:bg-base-200 disabled:cursor-not-allowed',
	dropdownIcon:
		'btn btn-xs rounded-full btn-circle p-0 bg-base-300 border-primary/[.2] hover:bg-base-300 disabled:bg-base-200 disabled:cursor-not-allowed',
	maxButton:
		'btn btn-sm btn-text btn-ghost p-0 bg-transparent hover:bg-transparent font-bold text-primary tracking-widest disabled:text-primary disabled:cursor-not-allowed',
	largeButton:
		'flex gap-2 text-primary h-14 text-base font-semibold items-center disabled:cursor-not-allowed',
	tableConvertButton:
		'btn btn-xs bg-primary text-xs h-[35px] w-[126px] rounded btn-primary disabled:bg-primary disabled:bg-opacity-60 disabled:text-white disabled:cursor-not-allowed rounded-[100px] font-inter font-medium',
	paginationButton:
		'btn btn-sm px-2 border-none bg-base-200 hover:bg-base-300 disabled:bg-base-200 disabled:text-primary disabled:curson-not-allowed disabled:cursor-not-allowed'
};

export const tableClasses = {
	heading: 'text-primary text-sm font-semibold px-2 pb-4',
	row: 'border-b border-[#D9DADE] font-normal whitespace-nowrap last:border-b-0',
	cell: 'text-left text-sm leading-none',
	cellMini: 'text-xs py-1',
	empty: 'text-base text-center p-4 w-full'
};

export const inputClasses = {
	inputText:
		'input input-ghost h-[30px] w-full text-body p-0 font-normal text-[#030115] disabled:opacity-70 disabled:text-[#030115] disabled:placeholder:text-[#030115]/[.2] focus-within:text-[#030115] placeholder:text-[#030115]/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent',
	searchInputText:
		'input input-ghost h-[30px] w-full text-base p-0 font-normal text-[#030115] focus:outline-none focus-within:border-b-2 focus-within:text-[#030115] focus:bg-transparent disabled:text-blue-500 placeholder-[#A8A8A8]'
};
