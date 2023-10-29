<script setup lang="ts">
// views
import Loading from "~/components/views/Loading.vue";
import InstancePanels from "~/components/views/InstancePanels.vue";

// determine active view
const activeView = computed(() => {
	// return Loading;
	return InstancePanels;
});
</script>

<template>
	<KeepAlive>
		<div class="h-screen overflow-hidden flex justify-center">
			<!-- Header -->
			<ViewHeader />

			<!-- View -->
			<component :is="activeView" />
		</div>
	</KeepAlive>
</template>
