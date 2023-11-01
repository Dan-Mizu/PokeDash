<script setup lang="ts">
// utility functions
import { dataExists } from "~/utility";

// get state
import useStore from "~/stores";
const store = useStore();

// props
const props = defineProps<{
	instanceID: number;
	panelStyle: string[];
}>();
</script>

<template>
	<!-- Trainer Info -->
	<LoadingCard
		:panel-style="panelStyle[0]"
		v-if="!dataExists(store.instanceData[instanceID].trainer)"
	/>
	<TrainerCard
		v-else
		:panel-style="panelStyle[0]"
		:data="store.instanceData[instanceID].trainer"
	/>

	<!-- Team Info -->
	<LoadingCard
		:panel-style="panelStyle[1]"
		v-if="!dataExists(store.instanceData[instanceID].party)"
	/>
	<PartyCard
		v-else
		:panel-style="panelStyle[1]"
		:data="store.instanceData[instanceID].party"
	/>

	<!-- Encounter Info -->
	<LoadingCard
		:panel-style="panelStyle[2]"
		v-if="!dataExists(store.instanceData[instanceID].encounter_log)"
	/>
	<EncountersCard
		v-else
		:panel-style="panelStyle[2]"
		:data="store.instanceData[instanceID].encounter_log"
	/>

	<!-- Stats -->
	<LoadingCard
		:panel-style="panelStyle[3]"
		v-if="!dataExists(store.instanceData[instanceID].stats)"
	/>
	<StatsCard
		v-else
		:panel-style="panelStyle[3]"
		:data="store.instanceData[instanceID].stats"
	/>
</template>
