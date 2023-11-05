<script setup lang="ts">
// props
const props = defineProps<{
	open: boolean;
	shinyData: TShinyLog;
}>();
</script>

<template>
	<Modal :open="open" @closeModal="$emit('closeModal')">
		<!-- Header -->
		<template #header>
			<h3 class="text-base font-semibold">Shiny Dex</h3>
		</template>

		<!-- Body -->
		<template #default></template>

		<!-- Footer -->
		<!-- <template #footer></template> -->
	</Modal>
</template>
