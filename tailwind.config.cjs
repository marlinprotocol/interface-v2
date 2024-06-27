/** @type {import('tailwindcss').Config} */
/** @type {@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')} */

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				grey: '#7e7e80',
				'grey-200': '#F3F3F3',
				'grey-300': '#d0d1d9',
				'grey-400': '#9D9FAC',
				'grey-500': '#7E7E80',
				'grey-600': '#808080',
				'grey-700': '#737373',
				'grey-800': 'var(--grey-800)',
				'orange-400': '#D6741B'
			},
			fontSize: {
				'3xl': '2rem',
				'2xs': '0.6875rem',
				'3xs': '0.5rem',
				'4xs': '0.375rem'
			},
			width: {
				125: '500px', //or 125rem
				130: '555px'
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				orbitron: ['Orbitron', 'sans-serif'],
				inter: ['Inter', 'sans-serif']
			},
			zIndex: {
				100: '100',
				1000: '1000'
			},
			gridColumn: {
				'span-16': 'span 16 / span 16'
			}
		}
	},
	daisyui: {
		logs: false,
		themes: [
			{
				light: {
					primary: '#3840c7',
					'primary-200': '#383838',
					'primary-focus': '#012d8f',
					'primary-content': '#ffffff',
					secondary: '#000000',
					'secondary-focus': '#383838',
					'secondary-content': '#ffffff',
					accent: '#37cdbe',
					'accent-focus': '#2aa79b',
					'accent-content': '#ffffff',
					neutral: '#3d4451',
					'neutral-500': '#737373',
					'base-100': '#ffffff',
					'base-200': '#f3f4fc',
					'base-300': '#e9f2f5',
					'--grey-800': '#030115',
					info: '#e0a82e',
					success: '#28bf92',
					warning: '#fcca00',
					error: '#e60000',
					'error-focus': '#b30202',
					'error-content': '#ffffff',
					'background-color': '#F2F2F2', //e9f2f5
					'.cnt-btn': {
						'border-radius': '100px !important',
						padding: '0px 24px'
					},
					'.chain-btn': {
						'border-radius': '100px !important',
						border: '1px solid #D9DADE !important',
						'background-color': '#fffff'
					},
					//custom designs
					'.modal-backdrop': {
						'background-color': '#010324cc'
					},
					'.icon-info': {
						color: '#6b7280'
					},
					'.icon-primary': {
						color: '#3840c7'
					},
					'.input-primary': {
						width: '100%',
						fontWeight: '500',
						padding: '0',
						color: '#030115',
						border: 'none',
						outline: 'none',
						fontFamily: 'Poppins',
						'&:focus': {
							border: 'none',
							outline: 'none',
							background: 'transparent',
							color: '#030115'
						},
						'&:focus-within': {
							border: 'none',
							outline: 'none',
							color: '#030115',
							background: 'transparent'
						},
						'&:disabled': {
							border: 'none',
							outline: 'none',
							background: 'transparent'
						}
					},
					'.input': {
						background: 'transparent',
						border: 'none',
						outline: 'none',
						'&:focus': {
							border: 'none',
							outline: 'none',
							background: 'transparent'
						},
						'&:disabled': {
							border: 'none',
							outline: 'none',
							background: 'transparent'
						}
					},
					'.input-group :icon': {
						'border-radius': '100px'
					},
					'.btn': {
						'text-transform': 'none'
					},
					'.btn-theme': {
						'border-radius': '100px'
					},
					'.btn-lightblue': {
						'background-color': '#DEE8F2',
						color: '#3840c7',
						border: 'none',
						'&:hover': {
							'background-color': '#d1dae3'
						}
					},
					'.btn-disabled': {
						cursor: 'not-allowed'
					},
					'.btn-text': {
						'&:disabled': {
							opacity: '0.6',
							cursor: 'not-allowed',
							'background-color': 'transparent'
						}
					},
					'.tooltip:before': {
						'white-space': 'break-spaces',
						'max-width': '17rem'
					},
					'.shadow-select-dropdown': {
						'box-shadow': '0px 0px 40px 0px #0000001A'
					}
				}
			},
			{
				dark: {
					'base-100': '#000000',
					'--grey-800': '#ffffff'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};

// primary: {
//   50: '#f2f9ff',
//   100: '#dee8f2',
//   200: '#91aae6',
//   300: '#69a4e0',
//   400: '#545acc',
//   500: '#3840c7',
//   600: '#1d57db',
//   700: '#0b49d6',
//   800: '#023cbf',
//   900: '#012d8f',
//   main: '#3840c7',
//   light: '#dee8f2',
//   dark: '#012d8f',
//   contrast: '#ffffff'
// },
