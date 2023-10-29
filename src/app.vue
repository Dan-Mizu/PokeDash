<template>
	<NuxtLayout />
</template>

<style>
/* * {
	outline: 1px solid red;
} */

* {
	@apply transition-all duration-300;
}

body {
	@apply bg-light-primary dark:bg-dark-primary;
}

/* hidden scrollbar */
.scrollbar-hidden::-webkit-scrollbar {
	@apply hidden;
}
.scrollbar-hidden {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
