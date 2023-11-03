<script setup lang="ts">
// utility functions
import { dataExists } from "~/utility";

// props
const props = defineProps<{
	instanceData: IInstanceData;
	panelStyle: string[];
}>();

//FIXME: what the hell is going on here? first var returns with properties fully propagated, but the second is empty- but only on first load?
// console.log(props.instanceData, (props.instanceData).trainer, dataExists(props.instanceData.trainer))
</script>

<template>
	<!-- Sidebar -->
	<Sidebar :panel-style="props.panelStyle[0]" />

	<!-- Trainer Info -->
	<LoadingCard
		:panel-style="props.panelStyle[1]"
		v-if="!dataExists(props.instanceData.trainer)"
	/>
	<TrainerCard
		v-else
		:panel-style="props.panelStyle[1]"
		:data="props.instanceData.trainer"
	/>

	<!-- Team Info -->
	<LoadingCard
		:panel-style="props.panelStyle[2]"
		v-if="!dataExists(props.instanceData.party)"
	/>
	<PartyCard v-else :panel-style="panelStyle[2]" :data="props.instanceData.party" />

	<!-- Encounter Info -->
	<LoadingCard
		:panel-style="props.panelStyle[3]"
		v-if="
			!dataExists(props.instanceData.encounter_log) ||
			!dataExists(props.instanceData.shiny_log)
		"
	/>
	<EncountersCard
		v-else
		:panel-style="props.panelStyle[3]"
		:encounter-log-data="props.instanceData.encounter_log"
		:shiny-log-data="props.instanceData.shiny_log"
	/>

	<!-- Stats -->
	<LoadingCard
		:panel-style="props.panelStyle[4]"
		v-if="!dataExists(props.instanceData.stats)"
	/>
	<StatsCard v-else :panel-style="props.panelStyle[4]" :data="props.instanceData.stats" />
</template>
