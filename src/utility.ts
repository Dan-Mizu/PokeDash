export const pkmnRef = (pokemon: IPokemon) => {
	return pokemon.natID + (pokemon.shiny ? "-shiny" : "");
};

export const pkmnRefRaw = (natID: number, isShiny: boolean) => {
	return natID + (isShiny ? "-shiny" : "");
};

export const dataExists = (data: unknown) => {
	if (JSON.stringify(data) === "{}" || data == null) {
		return false;
	}
	return true;
};
