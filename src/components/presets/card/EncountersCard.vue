<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	data: TEncounterLog;
}>();
</script>

<template>
	<div :class="panelStyle"></div>
</template>
