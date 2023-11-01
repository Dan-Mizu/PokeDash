<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	data: IStats;
}>();
</script>

<template>
	<div :class="panelStyle"></div>
</template>
