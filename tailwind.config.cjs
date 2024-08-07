/** @type {import('tailwindcss').Config} */
/** @type {@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')} */

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				grey: '#7e7e80',
				'white-100': 'var(--white-100)',
				'white-200': 'var(--white-200)',
				'white-300': 'var(--white-300)',
				'grey-100': 'var(--grey-100)',
				'grey-200': 'var(--grey-200)',
				'grey-300': 'var(--grey-300)',
				'grey-500': 'var(--grey-500)',
				'grey-400': 'var(--grey-400)',
				'grey-600': '#808080',
				'grey-700': ' var(--grey-700)',
				'grey-800': 'var(--grey-800)',
				'grey-1000': '#7E7E80',
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
					'base-300': '#F4F4F6',
					'--white-100': '#FCFCFC',
					'--white-200': '#F0F0F0',
					'--white-300': '#F4F4F6',
					'--grey-100': '#D9DADE',
					'--grey-200': '#f7f7f7',
					'--grey-300': '#00000066',
					'--grey-400': '#F1F1F4',
					'--grey-500': '#3E3F47',
					'--grey-700': '#26272c',
					'--grey-800': '#030115',

					info: '#e0a82e',
					success: '#28bf92',
					warning: '#fcca00',
					error: '#e60000',
					'error-focus': '#b30202',
					'error-content': '#ffffff',
					'.cnt-btn': {
						'border-radius': '100px !important',
						padding: '0px 24px'
					},
					'.chain-btn': {
						'border-radius': '100px !important',
						border: '1px solid var(--grey-100) !important',
						'background-color': '#fffff'
					},
					'.icon-info': {
						color: 'var(--grey-800)'
					},
					'.icon-primary': {
						color: '#3840c7'
					},
					'.input-primary': {
						width: '100%',
						fontWeight: '500',
						padding: '0',
						color: 'var(--grey-800)',
						border: 'none',
						outline: 'none',
						fontFamily: 'Poppins',
						'&:focus': {
							border: 'none',
							outline: 'none',
							background: 'transparent',
							color: 'var(--grey-800)'
						},
						'&:focus-within': {
							border: 'none',
							outline: 'none',
							color: 'var(--grey-800)',
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
					'.icon-invert': {
						filter: 'invert(0%)'
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
					},
					'.sub-nav': {
						'background-color': '#F4F4F6'
					},
					'.header': {
						'background-color': '#ffffff',
						'border-bottom': 'none'
					}
				}
			},
			{
				dark: {
					'base-100': '#000000',
					'base-200': '#1D1E24',
					'base-300': '#17191C',
					'secondary-content': '#17191C',
					'primary-focus': '#012d8f',
					'--grey-100': '#373C43',
					'--grey-200': '#111315',
					'--grey-300': '#ffffff4f',
					'--grey-400': '#202327',
					'--grey-500': '#ffffff4f',
					'--grey-700': '#BEBFC6',
					'--grey-800': '#CCCCCC',
					'--white-100': '#202327',
					'--white-200': '#202327',
					'--white-300': '#26272C',
					'.icon-invert': {
						filter: 'invert(100%)'
					},
					'.sub-nav': {
						'background-color': '#26272C'
					},
					'.header': {
						'background-color': '#111315',
						'border-bottom': '1px solid #222222'
					}
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
