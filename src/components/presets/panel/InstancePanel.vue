<script setup lang="ts">
// utility functions
import { dataExists } from "~/utility";

// props
const props = defineProps<{
	instanceData: IInstanceData;
	panelStyle: string[];
}>();
</script>

<template>
	<!-- Sidebar -->
	<Sidebar
		:panel-style="props.panelStyle[0]"
		:stats-data="
			props.instanceData
				? props.instanceData.stats
					? props.instanceData.stats
					: undefined
				: undefined
		"
		:emulator-data="
			props.instanceData
				? props.instanceData.emulator
					? props.instanceData.emulator
					: undefined
				: undefined
		"
		:encounter-log-data="
			props.instanceData
				? props.instanceData.encounter_log
					? props.instanceData.encounter_log
					: undefined
				: undefined
		"
		:shiny-data="
			props.instanceData
				? props.instanceData.shiny_log
					? props.instanceData.shiny_log
					: undefined
				: undefined
		"
	/>

	<!-- Trainer Info -->
	<LoadingCard
		:panel-style="props.panelStyle[1]"
		v-if="
			!props.instanceData ||
			!dataExists(props.instanceData.trainer) ||
			!dataExists(props.instanceData.emulator)
		"
	/>
	<TrainerCard
		v-else
		:panel-style="props.panelStyle[1]"
		:trainer-data="props.instanceData.trainer"
		:emulator-data="props.instanceData.emulator"
	/>

	<!-- Team Info -->
	<LoadingCard
		:panel-style="props.panelStyle[2]"
		v-if="!props.instanceData || !dataExists(props.instanceData.party)"
	/>
	<PartyCard
		v-else
		:panel-style="panelStyle[2]"
		:data="props.instanceData.party"
	/>

	<!-- Encounter Info -->
	<LoadingCard
		:panel-style="props.panelStyle[3]"
		v-if="
			!props.instanceData ||
			!dataExists(props.instanceData.encounter_log) ||
			!dataExists(props.instanceData.shiny_log)
		"
	/>
	<div
		v-else
		:class="props.panelStyle[3]"
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
		v-if="!props.instanceData || !dataExists(props.instanceData.stats)"
	/>
	<div
		v-else
		:class="props.panelStyle[3]"
	/>
	<StatsCard
		v-else
		:panel-style="props.panelStyle[4]"
		:data="props.instanceData.stats"
	/>
</template>
