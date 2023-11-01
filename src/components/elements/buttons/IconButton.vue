<script setup lang="ts">
const props = withDefaults(defineProps<{
	icon: string;
	iconColor?: string;
	backgroundColor?: string;
	hoverColor?: string;
}>(),
{
	iconColor: "text-light-text dark:text-dark-text",
	backgroundColor: "bg-light-primary dark:bg-dark-primary",
	hoverColor: "hover:bg-light-secondary hover:dark:bg-dark-secondary"
});
</script>

<template>
	<UButton
		@click="$emit('clickEvent')"
		:icon="icon"
		:ui="{
			color: {
				primary: {
					solid: iconColor + ' ' + backgroundColor + ' ' + hoverColor + ' focus:outline-none',
				},
			},
		}"
	/>
</template>
