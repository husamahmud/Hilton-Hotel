/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"beg-color": "#aa8453",
				"dark": "rgba(255, 255, 255, 0.5)",
				"darker": "#222222",
				"darkest": "#1b1b1b"
			}
		},
	},
	plugins: [],
}
