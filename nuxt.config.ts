// https://nuxt.com/docs/api/configuration/nuxt-config

var url = "localhost";

export default defineNuxtConfig({
	app: {
		head: {
			title: "PokéDash",
			link: [
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/favicons/favicon.ico",
				},
				{
					rel: "canonical",
					href: url,
				},
				{
					rel: "apple-touch-icon",
					sizes: " 180x180",
					href: "/favicons/apple-touch-icon.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "favicons/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "favicons/favicon-16x16.png",
				},
				{
					rel: "manifest",
					href: "favicons/site.webmanifest",
				},
				{
					rel: "mask-icon",
					color: "#000000",
					href: "favicons/safari-pinned-tab.svg",
				},
				{
					rel: "shortcut icon",
					href: "favicons/favicon.ico",
				},
			],
		},
	},
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			defaultAPIs: process.env.DEFAULT_INSTANCE_API_URLS,
		},
	},
	srcDir: "src",
	components: [
		{
			path: "~/components", // will get any components nested in let's say /components/test too
			pathPrefix: false,
		},
	],
	modules: [
		"@vueuse/nuxt",
		"@nuxt/ui", // includes @nuxtjs/tailwindcss and @nuxtjs/color-mode
		"nuxt-icon",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"nuxt-viewport",
	],
	ui: {
		icons: ["tabler", "material-symbols"],
	},
	colorMode: {
		classSuffix: "",
	},
	viewport: {
		breakpoints: {
			mobile: 320,
			mobileMedium: 375,
			mobileWide: 425,
			tablet: 768,
			desktop: 1024,
			full: 1348,
			desktopWide: 1600,
		},
		cookieName: "viewport",
		defaultBreakpoints: {
			desktop: "desktop",
			mobile: "mobile",
			tablet: "tablet",
		},
		fallbackBreakpoint: "desktop",
	},
});
