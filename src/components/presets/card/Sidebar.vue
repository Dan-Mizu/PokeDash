<script setup lang="ts">
const props = defineProps<{
	panelStyle: string;
}>();
</script>

<template>
	<div :class="panelStyle"></div>
</template>
