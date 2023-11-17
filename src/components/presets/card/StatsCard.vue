<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	data: IStats;
}>();
</script>

<template>
	<div :class="panelStyle">
		<div class="grid gap-2 h-full w-full p-2 text-xs overflow-auto scrollbar-hidden">
			<!-- Encounter Infos -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Total Encounters</span
					><span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.encounters
					}}</span>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Phase Encounters</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.phase_encounters
					}}</span>
				</div>
			</div>

			<!-- Total Highest IVSum -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Total Highest IV Pokemon</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.highest_iv_sum_pokemon
					}}</span>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Total Highest IVSum</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.highest_iv_sum
					}}</span>
				</div>
			</div>

			<!-- Total Lowest IVSum -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Total Lowest IV Pokemon</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.lowest_iv_sum_pokemon
					}}</span>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Total Lowest IVSums</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.lowest_iv_sum
					}}</span>
				</div>
			</div>

			<!-- Phase Lowest IVSum -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Phase Lowest IV Pokemon</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.phase_lowest_iv_sum_pokemon
					}}</span>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Phase Lowest IVSum</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
						data.totals.phase_lowest_iv_sum
					}}</span>
				</div>
			</div>

			<!-- Shiny averages -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row gap-2">
					<div class="grid grid-flow-row text-left">
						<span>Shiny Average</span>
						<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
							data.totals.shiny_average
						}}</span>
					</div>
					<div class="grid grid-flow-row text-left">
						<span>Shortest Phase Pokemon</span>
						<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
							data.totals.shortest_phase_pokemon
						}}</span>
					</div>
				</div>
				<div class="grid grid-flow-row gap-2">
					<div class="grid grid-flow-row text-right">
						<span>Shiny Encounters</span>
						<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
							data.totals.shiny_encounters
						}}</span>
					</div>
					<div class="grid grid-flow-row text-right">
						<span>Shortest Phase Encounters</span>
						<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">{{
							data.totals.shortest_phase_encounters
						}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
