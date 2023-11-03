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
const apiURL: Ref<string> | Ref<undefined> = ref();

// instance data
const instanceData: Ref<IInstanceData> | Ref<undefined> = ref();

// update instance api url input
apiURL.value = String(useRoute().query.api);

// FIXME: Causing "A composable that requires access to the Nuxt instance was called outside of a plugin, Nuxt hook, Nuxt middleware, or Vue setup function. This is probably not a Nuxt bug. Find out more at `https://nuxt.com/docs/guide/concepts/auto-imports#using-vue-and-nuxt-composables`." error... but still works?
// fetch all endpoints from the provided instance's api url
store
	.fetchAllInstanceEndpointData(apiURL.value as string)
	.then((response: IInstanceData) => {
		// save response for this endpoint
		instanceData.value = response;
	});

// determine props needed for active view
const activeProps = computed(() => {
	if (activeView.value == InstancePanels) {
		return {
			instances: apiURL.value,
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
