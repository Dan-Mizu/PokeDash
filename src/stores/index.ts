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
			key: InstanceDataKey,
			force: boolean = false
		) => {
			await useFetch(
				"http://" + instances.value[instanceID] + "/" + key
			).then((response) => {
				// data received
				if (dataExists(response.data.value))
					// store api response data
					instanceData.value[instanceID][key] = response.data.value;
				// error
				else if (force) {
					new Promise(() =>
						setTimeout(() => {
							fetchInstanceEndpointData(instanceID, key);
						}, 1000)
					);
				}
			});

			// update pokemon sprite cache
			if (
				key === "party" &&
				(instanceData.value[instanceID].party as TParty).length > 0
			)
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
				// fetch individual endpoints
				fetchInstanceEndpointData(
					instanceID,
					key as InstanceDataKey,
					force
				);
			}
		};
		const updatePokemonSpriteCache = async (instanceID: number) => {
			// loop through pokemon in party of instance
			for (const pokemon of instanceData.value[instanceID]
				.party as TParty) {
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
