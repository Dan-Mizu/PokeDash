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

const fetchData = async (apiURL: string, dataIndex: number) => {
  try {
    const response: IInstanceData = await store.fetchAllInstanceEndpointData(apiURL);

    // save response for this endpoint on this instance
    store.instanceData[dataIndex] = response;

    // update lastFetched value
    store.instances[dataIndex].lastFetched = Date.now();

    // update lastFetchedEndpoint value
    store.instances[dataIndex].lastFetchedEndpoint = {
      trainer: undefined,
      items: undefined,
      party: undefined,
      encounter_log: undefined,
      shiny_log: undefined,
      encounter_rate: undefined,
      stats: undefined,
      emulator: undefined,
    };

    for (const endpoint in response) {
      (store.instances[dataIndex].lastFetchedEndpoint as CreateMutable<TInstanceEndpointLastFetched>)[endpoint as TInstanceEndpoint] = Date.now();
    }
  } catch (error) {
    console.error(`Error fetching data for ${apiURL}`, error);
  }
};

onMounted(async () => {
  // no longer loading
  activeView.value = InstancePanels;

  // Set up periodic data fetching for each instance
  store.instances.forEach((_data, index) => {
    const { apiURL, dataIndex } = store.instances[index];
    setInterval(() => fetchData(apiURL, dataIndex), 5000); // Fetch data every 5 seconds
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
