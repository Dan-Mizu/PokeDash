<script setup lang="ts">
// theme
const colorMode = useColorMode();

// local dark mode value
const darkMode = ref(colorMode.value === "dark");
const toggleTheme = () => {
	// toggle local dark mode value
	darkMode.value = !darkMode.value;

	// set theme
	colorMode.preference = darkMode.value ? "dark" : "light";
};
</script>

<template>
	<IconButton
		:icon="
			darkMode ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
		"
		@clickEvent="toggleTheme"
	/>
</template>
