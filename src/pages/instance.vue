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

// instance api URL
const instance: Ref<IInstanceReference> = ref({
	title: undefined,
	apiURL: String(useRoute().query.api),
	dataIndex: 0,
	lastFetched: undefined,
	lastFetchedEndpoint: undefined,
});

// instance data
const instanceData: Ref<IInstanceData> | Ref<undefined> = ref();

// FIXME: Causing "A composable that requires access to the Nuxt instance was called outside of a plugin, Nuxt hook, Nuxt middleware, or Vue setup function. This is probably not a Nuxt bug. Find out more at `https://nuxt.com/docs/guide/concepts/auto-imports#using-vue-and-nuxt-composables`." error... but still works?
// fetch all endpoints from the provided instance's api url
store
	.fetchAllInstanceEndpointData(instance.value.apiURL as string)
	.then((response: IInstanceData) => {
		// save response for this endpoint
		instanceData.value = response;

		// update lastFetched value
		instance.value.lastFetched = Date.now();

		// update lastFetchedEndpoint value
		instance.value.lastFetchedEndpoint = {
			trainer: undefined,
			items: undefined,
			party: undefined,
			encounter_log: undefined,
			shiny_log: undefined,
			encounter_rate: undefined,
			stats: undefined,
			emulator: undefined,
		};
		for (const endpoint in instanceData.value as IInstanceData)
			instance.value.lastFetchedEndpoint[endpoint as TInstanceEndpoint] =
				Date.now();
	});

// determine props needed for active view
const activeProps = computed(() => {
	if (activeView.value == InstancePanels) {
		return {
			instances: instance.value,
			instanceData: instanceData.value,
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
