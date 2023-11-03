<script setup lang="ts">
// vue
import type { ShallowRef } from "vue";

// views
import Loading from "~/components/views/Loading.vue";
import InstancePanels from "~/components/views/InstancePanels.vue";

// utility functions
// import { dataExists } from "~/utility";

// get state
import useStore from "~/stores";
const store = useStore();

// initial active view
const activeView: ShallowRef<Component> = shallowRef(Loading);

onMounted(async () => {
	// no longer loading
	// activeView.value = InstancePanels;

	// update instance data for all stored instances
	store.instances.forEach(async (_data, index) => {
		// update instance data (force to keep fetching if no response)
		await store
			.fetchAllInstanceEndpointData(store.instances[index], true)
			.then((response: IInstanceData) => {
				console.log(response)
				store.instanceData[index] = response;
			});
	});
});

// determine props needed for active view
const activeProps = computed(() => {
	if (activeView.value == InstancePanels) {
		return {
			instances: store.instances,
			instanceData: store.instanceData,
			allowInstanceManipulation: false,
		};
	}
});
</script>

<template>
	<div class="h-screen overflow-hidden flex justify-center">
		<!-- View -->
		<component :is="activeView" v-bind="activeProps" />
	</div>
</template>
