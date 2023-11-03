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
			<div class="bg-light-primary dark:bg-dark-primary rounded-md pt-1 text-s text-center my-2 py-2 px-3">
				<!-- Encounter Infos -->
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Total Encounters:&emsp;<br> {{ data.totals.encounters }}</div>
					<div class="text-left">Phase Encounters:&emsp;<br> {{ data.totals.phase_encounters }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<!-- Total Highest IVSum -->
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Total Highest IV Pokemon:&emsp;<br> {{ data.totals.highest_iv_sum_pokemon }}</div>
					<div class="text-left">Total Highest IVSum:&emsp;<br> {{ data.totals.highest_iv_sum }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<!-- Total Lowest IVSum -->
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Total Lowest IV Pokemon:&emsp;<br> {{ data.totals.lowest_iv_sum_pokemon }}</div>
					<div class="text-left">Total Lowest IVSums:&emsp;<br> {{ data.totals.lowest_iv_sum }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<!-- Phase Lowest IVSum -->
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Phase Lowest IV Pokemon:&emsp;<br> {{ data.totals.phase_lowest_iv_sum_pokemon }}</div>
					<div class="text-left">Phase Lowest IVSum:&emsp;<br> {{ data.totals.phase_lowest_iv_sum }}</div>
				</span>
			</div>
			<div class="bg-light-primary dark:bg-dark-primary rounded-md p-1 text-s text-center my-2 py-2 px-3">
				<!-- Shiny averages -->
				<span class="flex justify-center items-center text-center mt-2 text-s">
					<div class="text-left">Shiny Average:&emsp;<br> {{ data.totals.shiny_average }}</div>
					<div class="text-left">Shiny Encounters:&emsp;<br> {{ data.totals.shiny_encounters }}</div>
					<div class="text-left">Shortest Phase Encounters:&emsp;&emsp;<br> {{ data.totals.shortest_phase_encounters }}</div>
					<div class="text-left">Shortest Phase Pokemon:&emsp;<br> {{ data.totals.shortest_phase_pokemon }}</div>
				</span>
			</div>
		</div>
	</div>
</template>
