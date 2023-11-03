<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	data: IStats;
}>();
</script>

<template>
	<div :class="panelStyle">
		<div class= "flex h-flex w-full p-3 grid">
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 mb-2 text-s text-center my-2 py-2 px-3">
				<!-- Encounter Infos -->
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Total Encounters: {{ data.totals.encounters }}</div>
					<div class="text-left">Phase Encounters: {{ data.totals.phase_encounters }}</div>
					<div class="text-left">Phase Highest IVSum: {{ data.totals.phase_highest_iv_sum }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<!-- Coords -->
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Total Highest IV Pokemon: {{ data.totals.highest_iv_sum_pokemon }}</div>
					<div class="text-left">Total Highest IVSum: {{ data.totals.highest_iv_sum }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Total Lowest IV Pokemon: {{ data.totals.lowest_iv_sum_pokemon }}</div>
					<div class="text-left">Total Lowest IVSums: {{ data.totals.lowest_iv_sum }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Phase Lowest IV Pokemon: {{ data.totals.phase_lowest_iv_sum_pokemon }}</div>
					<div class="text-left">Phase Lowest IVSum: {{ data.totals.phase_lowest_iv_sum }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Shiny Average: {{ data.totals.shiny_average }}</div>
					<div class="text-left">Shiny Encounters: {{ data.totals.shiny_encounters }}</div>
					<div class="text-left">Shortest Phase Encounters: {{ data.totals.shortest_phase_encounters }}</div>
					<div class="text-left">Shortest Phase Pokemon: {{ data.totals.shortest_phase_pokemon }}</div>
				</span>
			</div>
		</div>
	</div>
</template>
