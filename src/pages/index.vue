<script setup lang="ts">
import type { ShallowRef } from "vue";

// views
import Loading from "~/components/views/Loading.vue";
import InstancePanels from "~/components/views/InstancePanels.vue";

// get state
import useStore from "~/stores";
const store = useStore();

// initial active view
const activeView: ShallowRef<Component> = shallowRef(Loading);

onMounted(async () => {
	// no longer loading
	activeView.value = InstancePanels;

	// // update instance data for all stored instances
	// store.instances.forEach(async (_data, index) => {
	// 	// update instance data
	// 	await store.fetchAllInstanceEndpointData(index);
	// });
});
</script>

<template>
	<div class="h-screen overflow-hidden flex justify-center">
		<!-- View -->
		<component :is="activeView" />
	</div>
</template>
