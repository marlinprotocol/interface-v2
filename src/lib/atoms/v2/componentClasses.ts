const baseFilledButtonClasses =
	'btn btn-theme btn-sm items-center flex justify-center disabled:cursor-not-allowed !rounded-[100px]';

export const buttonClasses = {
	filled: `${baseFilledButtonClasses} btn-primary disabled:bg-primary disabled:bg-opacity-60 disabled:text-white`,
	greyFilled: `${baseFilledButtonClasses} bg-base-200 text-primary border-none hover:bg-base-300`,
	lightblueFilled: `${baseFilledButtonClasses} btn-lightblue`,
	whiteFilled: `${baseFilledButtonClasses} bg-white text-black border border-[#D9DADE] hover:bg-base-200`,
	outlined:
		'btn btn-theme btn-sm text-primary px-4 border-primary bg-inherit hover:text-primary-focus hover:border-primary-focus hover:bg-inherit disabled:bg-inherit disabled:text-grey-300 disabled:border-grey-300 disabled:cursor-not-allowed',
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

// TODO @souvikmishra: refactor these later
export const tableCellClasses = {
	heading: 'text-primary text-sm font-semibold px-2 pb-4',
	row: 'font-semibold text-base py-6 whitespace-nowrap',
	rowNormal:
		'text-left font-normal text-sm py-[23.5px] whitespace-nowrap leading-none border-b border-[#D9DADE]',
	mainRow: ' border-b border-[#D9DADE] last:border-none',
	rowCell: 'text-left font-normal text-sm py-[23.5px] whitespace-nowrap leading-none',
	rowMini: 'font-normal text-xs py-1 whitespace-nowrap',
	rowWithIcon: 'flex flex-col items-center justify-start',
	empty: 'text-base text-center p-4 w-full'
};

export const inputClasses = {
	inputText:
		'input input-ghost h-[30px] w-full text-lg mt-1 p-0 font-semibold text-primary disabled:opacity-70 disabled:text-primary disabled:placeholder:text-primary/[.2] focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent',
	searchInputText:
		'input input-ghost h-[30px] w-full text-[15px] p-0 font-normal text-primary focus:outline-none focus-within:border-b-2 focus-within:text-primary focus:bg-transparent disabled:text-blue-500'
};
