/** @type {import('tailwindcss').Config} */

export default {
	content: ["./src/**/*.{vue,js,ts,jsx,tsx,html}"],

	darkMode: "class",

	theme: {
		extend: {
			colors: {
				"light-primary": "#eeeeee",
				"light-secondary": "#f7f7f7",
				"light-tertiary": "#464646",
				"light-accent": "#36CC70",
				"light-live": "#FF0000",
				"light-text": "#000000",
				"light-text-placeholder": "#686868",
				"dark-primary": "#1e1e1e",
				"dark-secondary": "#252526",
				"dark-tertiary": "#e8e8e8",
				"dark-accent": "#36CC70",
				"dark-live": "#FF0000",
				"dark-text": "#ffffff",
				"dark-text-placeholder": "#c2c2c2",
			},

			fontFamily: {
				sans: ["Open Sans", "sans-serif"],
				display: ["Roboto"],
			},
		},
	},

	plugins: [],
};