import { safelist, variants } from "#tailwind-config";

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",

	safelist: [
		{
			pattern: /text-(red|green|blue|yellow|indigo|purple|pink|gray|white|black)-(100|400)/,
			variants: ["group-hover"]
		},
		{
			pattern: /bg-(red|green|blue|yellow|indigo|purple|pink|gray|white|black)-(100|400)/,
			variants: ["group-hover"]
		},
	],

	theme: {
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},

		extend: {
			colors: {
				dim: {
					50: "#5F99F7",
					100: "#5F99F7",
					200: "#38444d",
					300: "#202e3a",
					400: "#253341",
					500: "#5F99F7",
					600: "#5F99F7",
					700: "#192734",
					800: "#162d40",
					900: "#15202b",
				},
			},
		},
	},

	plugins: [
		require("@tailwindcss/forms")
	],
};
