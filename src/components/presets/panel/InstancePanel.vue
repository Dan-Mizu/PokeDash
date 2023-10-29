<script setup lang="ts">
// props
const props = defineProps<{
	apiURL: string;
	panelStyle: string[];
}>();

// helper functions
let pkmnRef = (pokemon: IPokemon) => {
	return pokemon.natID + (pokemon.shiny ? "-shiny" : "");
};

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
let pokemonSprite: Ref<{ [key: string]: string }> = ref({});

// update pokemon sprites
for (const pokemon of data.value.party as IPokemon[]) {
	if (!pokemonSprite.value[pkmnRef(pokemon)])
		await useFetch(pokeAPI + pokemon.natID, {
			method: "GET",
		}).then((response) => {
			pokemonSprite.value[pkmnRef(pokemon)] = pokemon.shiny
				? (response.data.value as any).sprites.front_shiny
				: (response.data.value as any).sprites.front_default;
		});
}
</script>

<template>
	<!-- Trainer Info -->
	<div :class="panelStyle[0]">
		<div class="flex justify-center items-center">
			<p class="text-sm">{{ (data.trainer as ITrainer).name }}</p>
		</div>
	</div>

	<!-- Team Info -->
	<div :class="panelStyle[1]">
		<ul>
			<li
				v-for="(pokemon, index) of data.party"
				class="flex flex-col my-2"
			>
				<span class="flex items-center">
					<!-- Pokemon Sprite -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg mr-2 p-2 flex justify-center items-center"
					>
						<img
							:src="pokemonSprite[pkmnRef(pokemon)]"
							:title="(pokemon as IPokemon).name + ((pokemon as IPokemon).shiny ? ' (Shiny)' : '')"
						/>
					</div>

					<!-- Pokemon Info -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg flex-1 justify-center py-1 px-2 items-start"
					>
						<!-- Name / Shiny -->
						<div
							class="text-base flex text-light-text dark:text-dark-text justify-center items-center"
						>
							<!-- Name -->
							<span class="mr-1">{{
								(pokemon as IPokemon).name
							}}</span>

							<!-- Shiny -->
							<div
								class="bg-light-secondary dark:bg-dark-secondary m-1 px-[5px] pb-[2px] rounded-md"
								v-if="(pokemon as IPokemon).shiny"
							>
								<Icon
									name="heroicons:sparkles-solid"
									class="h-4 text-light-tertiary dark:text-dark-tertiary"
								/>
							</div>
						</div>

						<!-- Level -->
						<div
							class="text-base flex flex-col text-light-text dark:text-dark-text justify-center items-center mt-1 mb-1"
						>
							<span class="text-xs"
								>Lvl: {{ (pokemon as IPokemon).level }}</span
							>
							<div
								class="w-full bg-light-secondary dark:bg-dark-secondary rounded-full h-1.5 mb-3"
							>
								<div
									class="bg-light-accent dark:bg-dark-accent h-1.5 rounded-full"
									:style="'width: ' + (pokemon as IPokemon).level + '%'"
								></div>
							</div>
							<span class="text-xs"
								>IV Sum: {{ (pokemon as IPokemon).IVSum }}</span
							>
						</div>

						<!-- Ability / Held Item -->
						<div
							class="text-base flex text-light-text dark:text-dark-text items-center mb-1"
						>
							<!-- Ability -->
							<span>
								<Icon
									name="icon-park-solid:fire"
									class="h-4 mx-1 text-light-tertiary dark:text-dark-tertiary"
								/>
								<span class="text-xs mr-1">
									{{ (pokemon as IPokemon).ability }}</span
								></span
							>

							<!-- Held Item -->
							<span
								v-if="(pokemon as IPokemon).item.name !='None'"
							>
								<Icon
									name="mdi:sack"
									class="h-4 mx-1 text-light-tertiary dark:text-dark-tertiary"
								/>
								<span class="text-xs">
									{{ (pokemon as IPokemon).item.name }}</span
								>
							</span>
						</div>
					</div>
				</span>
			</li>
		</ul>
	</div>

	<!-- Encounter Info -->
	<div :class="panelStyle[2]"></div>

	<!-- Encounter Log -->
	<div :class="panelStyle[3]"></div>

	<!-- Stats -->
	<div :class="panelStyle[4]"></div>
</template>
