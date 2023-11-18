div
<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	encounterLogData: TEncounterLog;
	shinyLogData: TShinyLog;
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
</script>

<template>
	<div :class="panelStyle">
		<div class="flex flex-col h-full w-full self-start">
			<!-- Encounter Stats -->
			<div class="flex flex-1 flex-grow w-full"></div>

			<!-- Encountered Pokemon Title/Options -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md flex flex-col flex-[0.4] justify-center items-center px-2 pt-3 gap-y-1"
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
