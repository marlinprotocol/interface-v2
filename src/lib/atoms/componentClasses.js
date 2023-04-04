const baseFilledButtonClasses = 'btn btn-theme btn-sm items-center flex justify-center';
export const buttonClasses = {
    filled: `${baseFilledButtonClasses} btn-primary disabled:bg-primary disabled:bg-opacity-60 disabled:text-white`,
    greyFilled: `${baseFilledButtonClasses} bg-base-200 text-primary border-none hover:bg-base-300 `,
    lightblueFilled: `${baseFilledButtonClasses} btn-lightblue`,
    whiteFilled: `${baseFilledButtonClasses} bg-white text-primary border-none hover:bg-base-200`,
    outlined: 'btn btn-theme btn-sm text-primary px-4 border-primary bg-inherit hover:text-primary-focus hover:border-primary-focus hover:bg-inherit disabled:bg-inherit disabled:text-grey-300 disabled:border-grey-300',
    error: 'btn btn-theme btn-sm text-error px-5 border-error bg-inherit hover:bg-inherit hover:border-error hover:text-error-focus',
    text: 'btn btn-sm btn-ghost p-0 bg-transparent hover:bg-transparent',
    icon: 'btn btn-xs btn-ghost btn-circle p-0 bg-transparent hover:bg-transparent flex',
    maxButton: 'btn btn-sm btn-text btn-ghost p-0 bg-transparent hover:bg-transparent font-bold text-primary tracking-widest disabled:text-primary',
    largeButton: 'flex gap-2 text-primary h-14 text-base font-semibold items-center',
    tableConvertButton: 'btn btn-xs text-xs h-[35px] w-[126px] rounded btn-primary disabled:bg-primary disabled:bg-opacity-60 disabled:text-white pt-1'
};
export const dividerClasses = {
    vertical: 'w-[1px] bg-gray-500 h-4 rounded',
    horizontal: 'h-0.5 bg-gray-200 w-full rounded',
    verticalPrimary: 'w-[1px] bg-primary h-4 rounded'
};
export const tableCellClasses = {
    heading: 'text-primary text-sm font-semibold px-2 pb-4',
    row: 'font-semibold text-base px-2 py-3',
    rowMini: 'font-normal text-xs px-1 py-1',
    rowWithIcon: 'flex flex-col items-center justify-start',
    empty: 'text-base text-center p-4 w-full'
};
//# sourceMappingURL=componentClasses.js.map