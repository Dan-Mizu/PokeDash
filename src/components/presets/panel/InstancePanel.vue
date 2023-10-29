<script setup lang="ts">
// props
const props = defineProps<{
	apiURL: string;
}>();

// individual panel style
const panelStyle =
	"bg-light-secondary dark:bg-dark-secondary mx-3 p-3 rounded-md";

// api data
let data: Ref<IInstanceData> = ref({
	trainer: {},
	items: {},
	party: {},
	encounter_log: {},
	shiny_log: {},
	encounter_rate: {},
	stats: {},
});
// update instance data
for (const key in data.value) {
	await useFetch("http://" + props.apiURL + "/" + key, {
		method: "GET",
	}).then((response) => {
		data.value[
			key as
				| "trainer"
				| "items"
				| "party"
				| "encounter_log"
				| "shiny_log"
				| "encounter_rate"
				| "stats"
		] = response.data.value;
	});
}

// pokeAPI for sprites
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
let pokemonSprite: Ref<string[]> = ref([]);

// update pokemon sprites=
for (const pokemon of data.value.party as IPokemon[]) {
	await useFetch(pokeAPI + pokemon.natID, {
		method: "GET",
	}).then((response) => {
		pokemonSprite.value.push(
			pokemon.shiny
				? (response.data.value as any).sprites.front_shiny
				: (response.data.value as any).sprites.front_default
		);
	});
}
</script>

<template>
	<div class="flex">
		<!-- Trainer Info -->
		<div :class="panelStyle">
			<h1 class="mb-2">Trainer Info</h1>
			<p class="text-sm">{{ (data.trainer as ITrainer).name }}</p>
		</div>

		<!-- Team Info -->
		<div :class="panelStyle">
			<h1 class="mb-2">Team Info</h1>
			<ul>
				<li
					v-for="(pokemon, index) of data.party"
                    class="flex flex-col"
				>
					<img :src="pokemonSprite[index]" class="h-[80px]" :title="(pokemon as IPokemon).name + ((pokemon as IPokemon).shiny ? ' (Shiny)' : '')">
				</li>
			</ul>
		</div>

		<!-- Encounter Info -->
		<div :class="panelStyle">
			<h1>Encounter Info</h1>
		</div>

		<!-- Encounter Log -->
		<div :class="panelStyle">
			<h1>Encounter Log</h1>
		</div>

		<!-- Stats -->
		<div :class="panelStyle">
			<h1>Stats</h1>
		</div>
	</div>
</template>
