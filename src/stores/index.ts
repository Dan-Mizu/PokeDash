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
			apiURL: string,
			key: InstanceDataKey,
			force: boolean = false
		) => {
			// return useFetch("http://" + apiURL + "/" + key).then((response) => {
			// 	// data received
			// 	if (dataExists(response.data.value)) {
			// 		console.log("fetched successfully", response.data.value);
			// 		return response.data.value as InstanceData;
			// 	}
			// 	// error- try again
			// 	else if (force) {
			// 		console.log("forcing...");
			// 		setTimeout(() => {
			// 			return fetchInstanceEndpointData(apiURL, key);
			// 		}, 1000);
			// 	}
			// 	// error- return null
			// 	else {
			// 		// failed to fetch and won't force
			// 		console.log("not forcing...");
			// 		return null;
			// 	}
			// });
			// return await useFetch("/" + key, {
			// 	method: "GET",
			// 	baseURL: "http://" + apiURL,
			// 	onResponse: ({ request, response, options }) => {
			// 		console.log(response);
			// 	},
			// 	onResponseError: ({ request, response, options }) => {
			// 		console.log(response);
			// 	},
			// });
			return await useFetch("http://" + apiURL + "/" + key).then(
				(res) => {
					const data = res.data.value;
					const error = res.error.value;
					if (error) {
						console.log(error);
					} else {
						console.log("successful", data, res)
					}
				},
				(error) => {
					console.log("exception...");
					console.log(error);
				}
			);
		};
		const fetchAllInstanceEndpointData = async (
			apiURL: string,
			force: boolean = false
		): Promise<IInstanceData> => {
			let newInstanceData = {
				trainer: {},
				items: {},
				party: {},
				encounter_log: {},
				shiny_log: {},
				encounter_rate: {},
				stats: {},
			} as any; //TODO: have to type as any because i'm instancing it and typescript doesn't like setting empty objects... fix this eventually idk

			// loop through all endpoints
			for (const key in newInstanceData) {
				// fetch individual endpoints
				// fetchInstanceEndpointData(
				// 	apiURL,
				// 	key as InstanceDataKey,
				// 	force
				// ).then(
				// 	(response: InstanceData | undefined | null) =>
				// 		(newInstanceData[key] = response)
				// );
				await fetchInstanceEndpointData(
					apiURL,
					key as InstanceDataKey,
					force
				);
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
