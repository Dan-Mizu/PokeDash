import { defineStore } from "pinia";

// utility functions
import { dataExists, pkmnRefRaw } from "~/utility";

// default state values
import defaults from "./defaults";

// poke API for sprites
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

export default defineStore(
	"pokedash",
	() => {
		// values
		const instances: Ref<string[]> = ref(
			useRuntimeConfig().public.defaultAPIs
				? useRuntimeConfig()
						.public.defaultAPIs.replaceAll(" ", "")
						.split(",")
				: []
		);
		const instanceData: Ref<IInstanceData[]> = ref(defaults.instanceData);
		const pokemonSprites: Ref<{ [key: string]: string }> = ref(
			defaults.pokemonSprites
		);

		// methods
		const fetchInstanceEndpointData = async (
			instanceID: number,
			key: InstanceDataKey,
			force: boolean = false
		) => {
			useFetch("http://" + instances.value[instanceID] + "/" + key).then(
				(response) => {
					// data received
					if (dataExists(response.data.value))
						// store api response data
						(instanceData.value[instanceID][key] as any) =
							response.data.value;
					// error
					else if (force) {
						new Promise(() =>
							setTimeout(() => {
								fetchInstanceEndpointData(instanceID, key);
							}, 1000)
						);
					}
				}
			);

			// // update pokemon sprite cache from party data
			// if (
			// 	key === "party" &&
			// 	instanceData.value[instanceID].party.length > 0
			// )
			// 	// loop through pokemon in party of instance
			// 	for (const pokemon of instanceData.value[instanceID].party) {
			// 		// fetch this pokemon's sprite if not already cached
			// 		updatePokemonSpriteCache(pokemon);
			// 	}

			// // update pokemon sprite cache from encounter log data
			// if (
			// 	key === "encounter_log" &&
			// 	instanceData.value[instanceID].encounter_log.length > 0
			// )
			// 	// loop through encountered pokemon in encounter log of instance
			// 	for (const encounteredPokemon of instanceData.value[instanceID]
			// 		.encounter_log) {
			// 		// fetch this pokemon's sprite if not already cached
			// 		updatePokemonSpriteCache(encounteredPokemon.pokemon);
			// 	}

			// // update pokemon sprite cache from shiny log data
			// if (
			// 	key === "shiny_log" &&
			// 	instanceData.value[instanceID].shiny_log.length > 0
			// )
			// 	// loop through encountered pokemon in encounter log of instance
			// 	for (const encounteredPokemon of instanceData.value[instanceID]
			// 		.shiny_log) {
			// 		// fetch this pokemon's sprite if not already cached
			// 		updatePokemonSpriteCache(encounteredPokemon.pokemon);
			// 	}
		};
		const fetchAllInstanceEndpointData = async (
			instanceID: number,
			force: boolean = false
		) => {
			// init/reset instance data
			instanceData.value[instanceID] = {
				trainer: {},
				items: {},
				party: {},
				encounter_log: {},
				shiny_log: {},
				encounter_rate: {},
				stats: {},
			} as any;

			// loop through all endpoints
			for (const key in instanceData.value[instanceID]) {
				// fetch individual endpoints
				fetchInstanceEndpointData(
					instanceID,
					key as InstanceDataKey,
					force
				);
			}
		};

		// caching pokemon sprites from PokeAPI
		const getPokemonSprite = async (natID: number, isShiny: boolean) => {
			// cached sprite not found- fetch, cache, and return it
			if (!pokemonSprites.value[pkmnRefRaw(natID, isShiny)]) {
				return useFetch(pokeAPI + natID).then((response) => {
					pokemonSprites.value[pkmnRefRaw(natID, isShiny)] = isShiny
						? (response.data.value as any).sprites.front_shiny
						: (response.data.value as any).sprites.front_default;
					return pokemonSprites.value[pkmnRefRaw(natID, isShiny)];
				});
			}
			// cached sprite found- return it
			else {
				return pokemonSprites.value[pkmnRefRaw(natID, isShiny)];
			}
		};

		// return storage references
		return {
			instances,
			instanceData,
			pokemonSprites,
			fetchInstanceEndpointData,
			fetchAllInstanceEndpointData,
			getPokemonSprite,
		};
	},
	{
		persist: {
			storage: persistedState.localStorage,
		},
	}
);
