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
	<div class="h-screen overflow-hidden flex justify-center">
		<!-- Header -->
		<KeepAlive>
			<ViewHeader />
		</KeepAlive>

		<!-- View -->
		<component :is="activeView" />
	</div>
</template>
