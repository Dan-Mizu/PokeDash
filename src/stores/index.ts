import { defineStore } from "pinia";

// default state values
import defaults from "./defaults";

export default defineStore(
	"pokedash",
	() => {
		// values
		const instances: Ref<string[]> = ref(
			useRuntimeConfig().public.defaultAPI
				? [useRuntimeConfig().public.defaultAPI]
				: []
		);
		const instanceData: Ref<IInstanceData[]> = ref(defaults.instanceData);
		const pokemonSprites: Ref<{ [key: string]: string }> = ref(
			defaults.pokemonSprites
		);

		// return storage references
		return {
			instances,
			instanceData,
			pokemonSprites,
		};
	},
	{
		persist: {
			storage: persistedState.localStorage,
		},
	}
);
