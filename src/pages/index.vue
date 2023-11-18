<script setup lang="ts">
// vue
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
});

// update instance data for all stored instances
store.instances.forEach(async (_data, index) => {
	// fetch all endpoints from each instance's api
	await store
		.fetchAllInstanceEndpointData(store.instances[index].apiURL)
		.then((response: IInstanceData) => {
			// save response for this endpoint on this instance
			store.instanceData[store.instances[index].dataIndex] = response;

			// update lastFetched value
			store.instances[index].lastFetched = Date.now();

			// update lastFetchedEndpoint value
			store.instances[index].lastFetchedEndpoint = {
				trainer: undefined,
				items: undefined,
				party: undefined,
				encounter_log: undefined,
				shiny_log: undefined,
				encounter_rate: undefined,
				stats: undefined,
				emulator: undefined,
			};
			for (const endpoint in store.instanceData[
				store.instances[index].dataIndex
			] as IInstanceData)
				(
					store.instances[index]
						.lastFetchedEndpoint as CreateMutable<TInstanceEndpointLastFetched>
				)[endpoint as TInstanceEndpoint] = Date.now();
		});
});

// determine props needed for active view
const activeProps = computed(() => {
	if (activeView.value == InstancePanels) {
		return {
			instances: store.instances,
			instanceData: store.instanceData,
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
