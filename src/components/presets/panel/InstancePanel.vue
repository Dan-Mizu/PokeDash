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
	<div v-else :class="panelStyle[0]">
		<div class="flex justify-center items-center">
			<p class="text-sm">
				{{ (store.instanceData[instanceID].trainer as ITrainer).name }}
			</p>
		</div>
	</div>

	<!-- Team Info -->
	<LoadingCard
		:panel-style="panelStyle[1]"
		v-if="!dataExists(store.instanceData[instanceID].party)"
	/>
	<PartyCard
		v-else
		:panel-style="panelStyle[1]"
		:party-data="(store.instanceData[instanceID].party as IPokemon[])"
	/>

	<!-- Encounter Info -->
	<LoadingCard
		:panel-style="panelStyle[2]"
		v-if="!dataExists(store.instanceData[instanceID].encounter_rate)"
	/>
	<div v-else :class="panelStyle[2]"></div>

	<!-- Encounter Log -->
	<LoadingCard
		:panel-style="panelStyle[3]"
		v-if="!dataExists(store.instanceData[instanceID].encounter_log)"
	/>
	<div v-else :class="panelStyle[3]"></div>

	<!-- Stats -->
	<LoadingCard
		:panel-style="panelStyle[4]"
		v-if="!dataExists(store.instanceData[instanceID].stats)"
	/>
	<div v-else :class="panelStyle[4]"></div>
</template>
