import { defineStore } from "pinia";

// utility functions
import { dataExists, pkmnRef } from "~/utility";

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
			key: InstanceDataKey
		) => {
			await useFetch(
				"http://" + instances.value[instanceID] + "/" + key
			).then((response) => {
				// store api response data
				instanceData.value[instanceID][key] = response.data.value;
			});

			// update pokemon sprite cache
			if (key === "party" && instanceData.value[instanceID][key] != null)
				updatePokemonSpriteCache(instanceID);
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
			};

			// loop through all endpoints
			for (const key in instanceData.value[instanceID]) {
				// keep fetching until data is retrieved
				while (
					!dataExists(
						instanceData.value[instanceID][key as InstanceDataKey]
					) &&
					force
				)
					// fetch individual endpoints
					await fetchInstanceEndpointData(
						instanceID,
						key as InstanceDataKey
					);
			}
		};
		const updatePokemonSpriteCache = async (instanceID: number) => {
			// loop through pokemon in party of instance
			for (const pokemon of instanceData.value[instanceID]
				.party as IPokemon[]) {
				// if pokemon's sprite isn't cached, then fetch and cache it
				if (!pokemonSprites.value[pkmnRef(pokemon)])
					await useFetch(pokeAPI + pokemon.natID).then((response) => {
						pokemonSprites.value[pkmnRef(pokemon)] = pokemon.shiny
							? (response.data.value as any).sprites.front_shiny
							: (response.data.value as any).sprites
									.front_default;
					});
			}
		};

		// return storage references
		return {
			instances,
			instanceData,
			pokemonSprites,
			fetchInstanceEndpointData,
			fetchAllInstanceEndpointData,
		};
	},
	{
		persist: {
			storage: persistedState.localStorage,
		},
	}
);
