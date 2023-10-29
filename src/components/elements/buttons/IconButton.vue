<script setup lang="ts">
const props = defineProps<{
	icon: string;
}>();
</script>

<template>
	<UButton
		@click="$emit('clickEvent')"
		:icon="icon"
		:ui="{
			color: {
				primary: {
					solid: 'text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary focus:outline-none',
				},
			},
		}"
	/>
</template>
