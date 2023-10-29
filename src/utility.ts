export const pkmnRef = (pokemon: IPokemon) => {
	return pokemon.natID + (pokemon.shiny ? "-shiny" : "");
};
