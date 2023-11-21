<script setup lang="ts">
// pokemon names
import pokemon from "~/data/pokemon.json";

// get state
import useStore from "~/stores";
const store = useStore();

// props
const props = defineProps<{
	panelStyle: string;
	encounterLogData: TEncounterLog;
	shinyLogData: TShinyLog;
	statsData: IStats;
}>();

// handle infinite scrolling of wild pokemon encounters
const encounteredWildPokemonList = ref<HTMLElement>();
const encounteredWildPokemonData = ref(
	props.encounterLogData.toReversed().slice(0, 2)
);
useInfiniteScroll(
	encounteredWildPokemonList,
	() => {
		// already loaded all
		if (
			encounteredWildPokemonData.value.length >=
			props.encounterLogData.length
		)
			return;

		// load more
		encounteredWildPokemonData.value =
			encounteredWildPokemonData.value.concat(
				props.encounterLogData
					.toReversed()
					.slice(
						encounteredWildPokemonData.value.length,
						encounteredWildPokemonData.value.length + 3
					)
			);
	},
	{ distance: 10 }
);

// handle infinite scrolling of shiny wild pokemon encounters
const encounteredShinyWildPokemonList = ref<HTMLElement>();
const encounteredShinyWildPokemonData = ref(
	props.shinyLogData.toReversed().slice(0, 2)
);
useInfiniteScroll(
	encounteredShinyWildPokemonList,
	() => {
		// already loaded all
		if (
			encounteredShinyWildPokemonData.value.length >=
			props.shinyLogData.length
		)
			return;

		// load more
		encounteredShinyWildPokemonData.value =
			encounteredShinyWildPokemonData.value.concat(
				props.shinyLogData
					.toReversed()
					.slice(
						encounteredShinyWildPokemonData.value.length,
						encounteredShinyWildPokemonData.value.length + 3
					)
			);
	},
	{ distance: 10 }
);

// encounter type
const encounterType = ref(0);

// target shiny pokemon
const pokemonNames = [
	...pokemon.generation[1],
	...pokemon.generation[2],
	...pokemon.generation[3],
];
const pokemonSelected = ref(pokemonNames[0]);

// get target shiny pokemon sprite
const spriteSrc = ref("");
const updateSprite = () => {
	store
		.getPokemonSprite(pokemonNames.indexOf(pokemonSelected.value) + 1, true)
		.then((result) => (spriteSrc.value = result));
};
updateSprite();

// watch for changes to selected target pokemon
watch(pokemonSelected, () => {
	// clear current spriteSrc
	spriteSrc.value = "";

	// update sprite
	updateSprite();
});
</script>

<template>
	<div :class="panelStyle">
		<div
			class="flex flex-col justify-center items-center h-full w-full self-start gap-1 py-1"
		>
			<!-- Target Pokemon -->
			<div
				class="flex flex-1 flex-grow w-5/6 justify-center items-center"
			>
				<div class="grid grid-cols-2 gap-1 w-full">
					<!-- Pokemon Selection/Sprite -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg p-2 flex flex-col justify-center items-center gap-2"
					>
						<!-- Target Selection Dropdown -->
						<USelectMenu
							v-model="pokemonSelected"
							:options="pokemonNames"
							placeholder="Select Target"
							searchable
							searchable-placeholder="Pokemon..."
							class="w-full"
						>
							<template #label>
								<span class="truncate">{{
									pokemonSelected.charAt(0).toUpperCase() +
									pokemonSelected.slice(1)
								}}</span>
							</template>
							<template #option="{ option: pokemonName }">
								<span class="truncate">{{
									pokemonName.charAt(0).toUpperCase() +
									pokemonName.slice(1)
								}}</span>
							</template>
						</USelectMenu>

						<!-- Target Sprite -->
						<div v-if="true">
							<Spinner v-if="!spriteSrc" />
							<img
								v-else
								class="rendering-pixelated"
								:src="spriteSrc"
							/>
						</div>
					</div>

					<!-- Target Pokemon Stats -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg flex flex-col justify-center items-start gap-2 px-2"
					>
						<div class="grid grid-flow-row text-xs gap-1">
							<!-- Total Encounters -->
							<div class="grid grid-flow-row text-left">
								<span>Total Encounters</span>
								<span
									class="font-bold text-sm text-light-text-placeholder dark:text-dark-text-placeholder"
									>{{
										statsData.pokemon[
											pokemonSelected
												.charAt(0)
												.toUpperCase() +
												pokemonSelected.slice(1)
										].encounters
											? statsData.pokemon[
													pokemonSelected
														.charAt(0)
														.toUpperCase() +
														pokemonSelected.slice(1)
											  ].encounters
											: "None"
									}}</span
								>
							</div>

							<!-- Last Encounter Time -->
							<div
								class="grid grid-flow-row text-left"
								v-if="
									statsData.pokemon[
										pokemonSelected
											.charAt(0)
											.toUpperCase() +
											pokemonSelected.slice(1)
									].encounters
								"
							>
								<span>Last Encounter</span>
								<span
									class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
									>{{
										new Date(
											statsData.pokemon[
												pokemonSelected
													.charAt(0)
													.toUpperCase() +
													pokemonSelected.slice(1)
											].last_encounter_time_unix
										).toLocaleTimeString("en-US")
									}}</span
								>
							</div>

							<!-- Shiny Encounters -->
							<div class="grid grid-flow-row text-left">
								<span>Shiny Encounters</span>
								<span
									class="font-bold text-sm self-end text-light-text-placeholder dark:text-dark-text-placeholder"
									>{{
										statsData.pokemon[
											pokemonSelected
												.charAt(0)
												.toUpperCase() +
												pokemonSelected.slice(1)
										].shiny_encounters
											? statsData.pokemon[
													pokemonSelected
														.charAt(0)
														.toUpperCase() +
														pokemonSelected.slice(1)
											  ].shiny_encounters
											: "None"
									}}</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Encountered Pokemon Title/Options -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md flex flex-col flex-[0.4] justify-center items-center w-full px-2 pt-3 gap-y-1"
			>
				<span class="text-sm text-center">Latest Encounters</span>
				<UTabs
					class="justify-end"
					@change="(index: number) => encounterType = index"
					:items="[{ label: 'Wild' }, { label: 'Shiny' }]"
					:default-index="encounterType"
					:ui="{
						list: {
							background: 'bg-light-primary dark:bg-dark-primary',
							marker: {
								background:
									'bg-light-secondary dark:bg-dark-secondary',
							},
							tab: {
								active: 'text-light-text dark:text-dark-text',
								inactive:
									'text-light-text-placeholder dark:text-dark-text-placeholder',
								padding: 'px-2',
							},
						},
					}"
				/>
			</div>

			<!-- Encountered Wild Pokemon List -->
			<div class="flex flex-grow min-h-0 w-full justify-center">
				<ul
					v-if="encounterType === 0"
					ref="encounteredWildPokemonList"
					class="w-full overflow-auto scrollbar-hidden"
				>
					<li
						v-for="encounteredPokemon in encounteredWildPokemonData"
						class="gap-1 my-1"
					>
						<PokemonBadge :data="encounteredPokemon.pokemon" />
					</li>
				</ul>
				<ul
					v-else
					ref="encounteredShinyWildPokemonList"
					class="w-full overflow-auto scrollbar-hidden"
				>
					<li
						v-for="encounteredPokemon in encounteredShinyWildPokemonData"
						class="gap-1 my-1"
					>
						<PokemonBadge :data="encounteredPokemon.pokemon" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
