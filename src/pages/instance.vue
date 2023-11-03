<script setup lang="ts">
// vue
import type { ShallowRef } from "vue";

// views
import Loading from "~/components/views/Loading.vue";
import InstancePanels from "~/components/views/InstancePanels.vue";

// utility functions
import { dataExists } from "~/utility";

// get state
import useStore from "~/stores";
const store = useStore();

// initial active view
const activeView: ShallowRef<Component> = shallowRef(Loading);

// instance api URL
const apiURL: Ref<string> | Ref<string[]> | Ref<undefined> = ref();

// instance data
const instanceData: Ref<IInstanceData> | Ref<IInstanceData[]> | Ref<undefined> = ref();

onMounted(() => {
	// update instance api url input
	apiURL.value = String(useRoute().query.api);

	// fetch instance data (force to keep fetching if no response)
	store
		.fetchAllInstanceEndpointData(apiURL.value, true)
		.then((response: IInstanceData) => {
			// update instance data
			if (dataExists(response)) instanceData.value = response;

			// change to instance panels view
			activeView.value = InstancePanels;
		});
});

// determine props needed for active view
const activeProps = computed(() => {
	if (activeView.value == InstancePanels) {
		return {
			instances: apiURL as Ref<string> | Ref<string[]>,
			instanceData: instanceData as
				| Ref<IInstanceData>
				| Ref<IInstanceData[]>,
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
