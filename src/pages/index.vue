<script setup lang="ts">
// utility functions
import { pkmnRef } from "~/utility";

// views
import Loading from "~/components/views/Loading.vue";
import InstancePanels from "~/components/views/InstancePanels.vue";

// get state
import useStore from "~/stores";
import type { ShallowRef } from "vue";
const store = useStore();

// poke API for sprites
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

// initial active view
const activeView: ShallowRef<Component> = shallowRef(Loading);

onMounted(async () => {
	// loop through every provided instance
	for (const [index, apiURL] of store.instances.entries()) {
		// init instance data
		store.instanceData[index] = {
			trainer: {},
			items: {},
			party: {},
			encounter_log: {},
			shiny_log: {},
			encounter_rate: {},
			stats: {},
		};

		// update instance data
		for (const key in store.instanceData[index]) {
			// make sure data isn't null/empty
			while (
				JSON.stringify(
					store.instanceData[index][
						key as
							| "trainer"
							| "items"
							| "party"
							| "encounter_log"
							| "shiny_log"
							| "encounter_rate"
							| "stats"
					]
				) === "{}" ||
				store.instanceData[index][
					key as
						| "trainer"
						| "items"
						| "party"
						| "encounter_log"
						| "shiny_log"
						| "encounter_rate"
						| "stats"
				] == null
			) {
				await useFetch("http://" + apiURL + "/" + key, {
					method: "GET",
				}).then((response) => {
					store.instanceData[index][
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
		}

		// get pokemon sprites if not cached
		for (const pokemon of store.instanceData[index].party as IPokemon[]) {
			if (!store.pokemonSprites[pkmnRef(pokemon)])
				await useFetch(pokeAPI + pokemon.natID, {
					method: "GET",
				}).then((response) => {
					store.pokemonSprites[pkmnRef(pokemon)] = pokemon.shiny
						? (response.data.value as any).sprites.front_shiny
						: (response.data.value as any).sprites.front_default;
				});
		}
	}

	// no longer loading
	activeView.value = InstancePanels;
});
</script>

<template>
	<div class="h-screen overflow-hidden flex justify-center">
		<!-- Header -->
		<KeepAlive>
			<ViewHeader />
		</KeepAlive>

		<!-- View -->
		<component :is="activeView" />
	</div>
</template>
