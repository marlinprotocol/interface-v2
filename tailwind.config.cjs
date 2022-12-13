/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#3840c7',
				'primary-light': '#2db8e3',
				'bg-light': '#e9f2f5'
			}
		}
	},
	plugins: []
};
