<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
}>();
</script>

<template>
	<div :class="panelStyle">
		<div class="flex justify-center items-center my-10">
			<Spinner />
		</div>
	</div>
</template>
