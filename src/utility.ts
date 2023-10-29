export const pkmnRef = (pokemon: IPokemon) => {
	return pokemon.natID + (pokemon.shiny ? "-shiny" : "");
};

export const dataExists = (data: unknown) => {
	if (JSON.stringify(data) === "{}" || data == null) {
		return false;
	}
	return true;
};
