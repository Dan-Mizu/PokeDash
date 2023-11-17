import { defineStore } from "pinia";

// utility functions
import { pkmnRefRaw } from "~/utility";

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
			apiURL: string,
			key: InstanceDataKey
		): Promise<InstanceData | null> => {
			// fetch provided endpoint from provided api
			return await useFetch("http://" + apiURL + "/" + key).then(
				(response) => {
					// error
					if (response.error.value) {
						// notification
						console.log(
							"API FETCH ERROR:",
							response.error.value,
							response
						);

						// send null
						return null;
					}

					// success
					else {
						// send data
						return response.data.value as InstanceData;
					}
				},
				// exception
				(exception) => {
					// notification
					console.log("API FETCH EXCEPTION:", exception);

					// send null
					return null;
				}
			);
		};
		const fetchAllInstanceEndpointData = async (
			apiURL: string
		): Promise<IInstanceData> => {
			let newInstanceData = {
				trainer: {},
				items: {},
				party: {},
				encounter_log: {},
				shiny_log: {},
				encounter_rate: {},
				stats: {},
				emulator: {},
			} as any; //TODO: have to type as any because i'm instancing it and typescript doesn't like setting empty objects... fix this eventually idk

			// loop through all endpoints
			for (const key in newInstanceData) {
				await fetchInstanceEndpointData(
					apiURL,
					key as InstanceDataKey
				).then((response) => {
					newInstanceData[key] = response;
				});
			}

			// send new instance data
			return newInstanceData as IInstanceData;
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
