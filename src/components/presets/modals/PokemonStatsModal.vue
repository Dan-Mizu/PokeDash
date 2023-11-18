<script setup lang="ts">
import { Radar } from "vue-chartjs";

// theme
const colorMode = useColorMode();

// props
const props = defineProps<{
	pokemon: IPokemon;
	spriteSrc: string;
	open: boolean;
}>();

// chart data
const chartData = ref({
	labels: [
		["𝗛𝗣", props.pokemon.stats.hp],
		["𝗔𝘁𝘁𝗮𝗰𝗸", props.pokemon.stats.attack],
		["𝗗𝗲𝗳𝗲𝗻𝘀𝗲", props.pokemon.stats.defense],
		["𝗦𝗽𝗲𝗲𝗱", props.pokemon.stats.speed],
		["𝗦𝗽. 𝗗𝗲𝗳", props.pokemon.stats.spDefense],
		["𝗦𝗽. 𝗔𝘁𝗸", props.pokemon.stats.spAttack],
	],
	datasets: [
		{
			// data
			data: [
				props.pokemon.stats.hp,
				props.pokemon.stats.attack,
				props.pokemon.stats.defense,
				props.pokemon.stats.speed,
				props.pokemon.stats.spDefense,
				props.pokemon.stats.spAttack,
			],

			// background
			fill: true,
			tension: 0.1,
			backgroundColor: "rgba(0, 191, 255, 0.7)",

			// lines
			borderWidth: 0,

			// points
			pointBorderWidth: 0,
			pointBackgroundColor: "rgb(0, 0, 0, 0)",
		},
	],
});
const chartOptions = ref({
	plugins: { legend: { display: false }, tooltip: { enabled: false } },
	scales: {
		r: {
			// https://www.chartjs.org/docs/latest/axes/radial/
			angleLines: {
				color: "gray",
			},
			grid: {
				color: colorMode.preference === "light" ? "black" : "white",
			},
			pointLabels: {
				color: colorMode.preference === "light" ? "black" : "white",
			},
			ticks: {
				stepSize: 31,
				display: false,
			},
		},
	},
	responsive: true,
	maintainAspectRatio: true,
});
watch(colorMode, () => {
	chartOptions.value.scales.r.grid.color =
		colorMode.preference === "light" ? "black" : "white";
	chartOptions.value.scales.r.pointLabels.color =
		colorMode.preference === "light" ? "black" : "white";
});
</script>

<template>
	<Modal :open="open" @closeModal="$emit('closeModal')" :showFooter="false">
		<!-- Header -->
		<template #header>
			<div class="text-lg flex justify-center items-center gap-x-1">
				<!-- Name -->
				<span class="font-bold">{{ pokemon.name }}</span>

				<!-- Level -->
				<div
					class="bg-light-secondary dark:bg-dark-secondary rounded-md flex justify-center items-center px-2 py-1"
				>
					<span class="font-bold text-xs">
						LVL {{ pokemon.level }}
					</span>
				</div>

				<!-- Shiny -->
				<div
					class="bg-light-secondary dark:bg-dark-secondary rounded-md flex justify-center items-center p-1"
					v-if="pokemon.shiny"
				>
					<Icon
						name="heroicons:sparkles-solid"
						class="h-4 text-light-tertiary dark:text-dark-tertiary"
					/>
				</div>
			</div>
		</template>

		<!-- Body -->
		<template #default>
			<!-- Container -->
			<div
				class="text-base flex justify-center items-center text-center content-center"
			>
				<!-- Rows -->
				<div class="flex flex-col gap-y-4 items-center">
					<!-- Sprite/IV Sum/Stats -->
					<div class="grid grid-cols-2 gap-x-5">
						<div
							class="bg-light-secondary dark:bg-dark-secondary rounded-lg flex flex-col justify-center items-center"
						>
							<!-- Pokemon Sprite -->
							<Spinner v-if="!spriteSrc" />
							<img
								v-else
								class="rendering-pixelated w-full p-2"
								:src="spriteSrc"
								:title="
									pokemon.name +
									(pokemon.shiny ? ' (Shiny)' : '')
								"
							/>

							<!-- IV Sum -->
							<div class="w-full px-2 pb-4">
								<IvSumProgressBar :IVSum="pokemon.IVSum" />
							</div>
						</div>

						<!-- Pokemon Stats Chart -->
						<div
							class="bg-light-secondary dark:bg-dark-secondary rounded-lg flex justify-center items-center p-2"
						>
							<Radar :data="chartData" :options="chartOptions" />
						</div>
					</div>

					<!-- Nature/Ability/Held Item -->
					<div
						class="bg-light-secondary dark:bg-dark-secondary rounded-lg grid grid-rows-2 py-2 w-full"
					>
						<!-- Titles -->
						<div class="grid grid-cols-3">
							<span class="text-sm font-bold">Nature</span>
							<span class="text-sm font-bold">Ability</span>
							<span class="text-sm font-bold">Held Item</span>
						</div>

						<!-- Content -->
						<div class="grid grid-cols-3">
							<!-- Nature -->
							<div class="flex items-center justify-center">
								<span class="text-xs">{{
									pokemon.nature
								}}</span>
							</div>

							<!-- Ability -->
							<div class="flex items-center justify-center">
								<span class="text-xs">{{
									pokemon.ability
								}}</span>
							</div>

							<!-- Held Item -->
							<span
								v-if="pokemon.item.name != 'None'"
								class="text-xs"
								>{{ pokemon.item.name }}</span
							>
							<div
								v-else
								class="flex items-center justify-center"
							>
								<span
									class="text-light-text-placeholder dark:text-dark-text-placeholder text-xs px-2 py-1"
									>None</span
								>
							</div>
						</div>
					</div>

					<!-- Moves List -->
					<div
						class="bg-light-secondary dark:bg-dark-secondary rounded-lg w-3/5 flex flex-col py-4 gap-y-1"
					>
						<!-- Title -->
						<span class="text-sm font-bold">Moves</span>

						<!-- Content -->
						<ul class="flex flex-col w-full">
							<li
								v-for="(move, index) of pokemon.moves"
								:class="[
									'text-xs flex gap-x-2 mx-6',
									index % 2 == 1
										? 'bg-light-primary dark:bg-dark-primary'
										: '',
								]"
							>
								<!-- Move Name -->
								<div class="flex flex-1 w-full justify-end">
									<span>
										{{ move.name }}
									</span>
								</div>

								<!-- Move Data -->
								<div class="flex flex-1 w-full">
									<div
										class="grid grid-cols-2 w-full gap-x-2"
									>
										<!-- Move Power -->
										<span
											class="flex justify-end items-center gap-x-1"
										>
											<Icon
												name="ph:hand-fist-fill"
												class="text-light-tertiary dark:text-dark-tertiary"
											/>
											<span> {{ move.power }}</span>
										</span>

										<!-- Move PP -->
										<span
											class="flex justify-start items-center gap-x-1"
										>
											<Icon
												name="iconamoon:lightning-1-fill"
												class="text-light-tertiary dark:text-dark-tertiary"
											/>
											<span>
												{{ move.remaining_pp }}/{{
													move.pp
												}}</span
											>
										</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</template>

		<!-- Footer -->
		<!-- <template #footer> </template> -->
	</Modal>
</template>
