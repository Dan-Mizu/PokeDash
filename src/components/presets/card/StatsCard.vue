<script setup lang="ts">
//import { onMounted, ref } from 'vue';


// props
const props = defineProps<{
	panelStyle: string;
	data: IStats;
	//emulatorData: IEmulator;
}>();

// Reactive variable to store the calculated percentage
//const fpsPercentage = ref<string>("");

//onMounted(() => {
    // Calculate and update the percentage after the component is mounted
//    calculatePercentage();
//});

//function calculatePercentage() {
    // Assuming emulatorData.current_fps contains the current FPS value
//    const currentFps = props.emulatorData.current_fps;
    
    // Calculate the percentage based on the formula (current_fps / 59.7) * 100
//    const percentage = (currentFps / 59.7) * 100;
    
    // Update the reactive variable
//    fpsPercentage.value = percentage.toFixed(2) + "%";
//}
</script>

<template>
	<div :class="panelStyle">
		<div class="grid gap-2 w-full p-2 text-xs">
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
			<!-- Shortest Phases Streak -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Shortest Streak Pokemon</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{
							data.totals.shortest_phase_pokemon
						}}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>PhShortest Streak</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ data.totals.shortest_phase_encounters }}</span
					>
				</div>
			</div>
			<!-- Shiny Averages -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Shiny Average</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{
							data.totals.shiny_average
						}}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Total Encountered Shinies</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ data.totals.shiny_encounters }}</span
					>
				</div>
			</div>
			
			<!-- TODO: Dan pls fix it goes invisible again Madge -->
			<!-- Emu Data -->
			<!--
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Game Data</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>Game: {{ emulatorData.game.name }}</span
					>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>Rev: {{ emulatorData.game.revision }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Profile Name</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ emulatorData.profile.name }}</span
					>
				</div>
			</div>
			Current Emulation Speed -- Comment
			
			<div class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2">
				<div class="grid grid-flow-row text-left">
					<span>Current Emulation Speed</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">
						{{ emulatorData.emulation_speed }} - Running at <span>{{ fpsPercentage }}</span>
					</span>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Current FPS</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ emulatorData.current_fps }}</span
					>
				</div>
			</div>
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Current Mode</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ emulatorData.bot_mode }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Current Message</span>
					<span class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder">
						{{ emulatorData.current_message }}
					</span>
				</div>
			</div>
		-->			
		</div>
	</div>
</template>
