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
			defaultAPI: process.env.DEFAULT_INSTANCE_API_URL,
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
		"@nuxt/ui",
		"nuxt-icon",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
	], // includes @nuxtjs/tailwindcss and @nuxtjs/color-mode
});
