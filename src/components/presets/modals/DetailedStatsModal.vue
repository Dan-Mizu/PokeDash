<script setup lang="ts">
// props
import { ref, defineProps, computed, watchEffect } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps<{
  open: boolean;
  statsData: IStats;
  emulatorData: IEmulator;
}>();

// Create a ref for the canvas
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// format emulator fps data automatically
const fpsPercentage: ComputedRef<string> = computed(() => {
  return ((props.emulatorData.current_fps / 59.7) * 100).toFixed(2) + "%";
});

const shinyAverage: ComputedRef<number> = computed(() => {
  const parts = props.statsData.totals.shiny_average.split('/');
  console.log('Parts:', parts); // Log the parts array
  if (parts.length === 2) {
    return parseInt(parts[1].replace(/,/g, ''), 10);
  }
  return 0; // Default value or handle the case where the format is unexpected
});



// Function to update the ChartJS chart
function updateChart() {
  // Access the canvas element
  const canvas = chartCanvas.value;
  
  console.log('Phase Encounters:', props.statsData.totals.phase_encounters);
  console.log('Shiny Average:', shinyAverage.value);
  // Check if the canvas exists and statsData has the required data for the chart
  if (canvas && props.statsData) {
    // Get the context of the canvas
    const ctx = canvas.getContext('2d');

    // Example: Create a bar chart comparing phase_encounters and shiny_average
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Phase Encounters', 'Shiny Average'],
        datasets: [
          {
            label: 'Comparisson',
            data: [
              props.statsData.totals.phase_encounters,
              shinyAverage.value,
            ],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}

// Create a watcher to update the chart when statsData changes
watchEffect(() => {
  // Access statsData and update the chart accordingly
  updateChart();
});
</script>



<template>
  <Modal :open="open" @closeModal="$emit('closeModal')">
    <!-- Header -->
    <template #header>
      <h3 class="text-base font-semibold">
        Detailed Instance Statistics
      </h3>
    </template>

    <!-- Body -->
    <template #default>
      <div class="grid grid-cols-flow gap-4 h-full p-2 text-xs">
        <!-- First Column -->
        <div>
			<!-- Encounter Infos -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Total Encounters</span
					><span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.encounters }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Phase Encounters</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.phase_encounters }}</span
					>
				</div>
			</div>

			<!-- Total Highest IVSum -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Total Highest IV Pokemon</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.highest_iv_sum_pokemon }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Total Highest IVSum</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.highest_iv_sum }}</span
					>
				</div>
			</div>

			<!-- Total Lowest IVSum -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Total Lowest IV Pokemon</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.lowest_iv_sum_pokemon }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Total Lowest IVSums</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.lowest_iv_sum }}</span
					>
				</div>
			</div>

			<!-- Phase Lowest IVSum -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Phase Lowest IV Pokemon</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{
							statsData.totals.phase_lowest_iv_sum_pokemon
						}}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Phase Lowest IVSum</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.phase_lowest_iv_sum }}</span
					>
				</div>
			</div>
			<!-- Phase Phase Streak -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Phase Current Streak Pokemon</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.phase_streak_pokemon }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Phase Current Streak</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.phase_streak }}</span
					>
				</div>
			</div>
			<!-- Shortest Phases Streak -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Shortest Streak Pokemon</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.shortest_phase_pokemon }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>PhShortest Streak</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{
							statsData.totals.shortest_phase_encounters
						}}</span
					>
				</div>
			</div>
			<!-- Shiny Averages -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Shiny Average</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.shiny_average }}</span
					>
				</div>
				<div class="grid grid-flow-row text-right">
					<span>Total Encountered Shinies</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
						>{{ statsData.totals.shiny_encounters }}</span
					>
				</div>
			</div>

			<!-- TODO: Make this retarded modal let me add more data without disappearing -->
			<!-- Example -->
        </div>

        <!-- Second Column -->
        <div>
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
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
			<!-- Current Emulation Speed -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
			>
				<div class="grid grid-flow-row text-left">
					<span>Current Emulation Speed</span>
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
					>
						{{ emulatorData.emulation_speed }} - Running at
						<span>{{ fpsPercentage }}</span>
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
				class="bg-light-secondary dark:bg-dark-secondary rounded-md grid grid-flow-col p-2 gap-2"
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
					<span
						class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
					>
						{{ emulatorData.current_message }}
					</span>
				</div>
			</div>
        </div>

        <!-- Third Column with ChartJS -->
        <div>
          <!-- ChartJS Canvas -->
          <canvas ref="chartCanvas" width="300" height="200"></canvas>
        </div>
      </div>
    </template>

    <!-- Footer -->
    <!-- <template #footer> </template> -->
  </Modal>
</template>
