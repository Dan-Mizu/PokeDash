/** Collection of Instance Data from each API endpoint */
interface IInstanceData {
	trainer: ITrainer | unknown;
	items: unknown;
	party: IPokemon[] | unknown;
	encounter_log: unknown;
	shiny_log: unknown;
	encounter_rate: unknown;
	stats: unknown;
}

/** Trainer API Response */
interface ITrainer {
	coords: {
		0: number;
		1: number;
	};
	facing: "Right" | "Left" | "Up" | "Down";
	gender: "boy" | "girl";
	map: {
		0: number;
		1: number;
	};
	map_name: string;
	name: string;
	on_bike: boolean;
	sid: number;
	tid: number;
}

/** Pokemon Data */
interface IPokemon {
	EVs: IPokemonStats;
	IVSum: number;
	IVs: IPokemonStats;
	ability: string;
	calculatedChecksum: number;
	checksum: number;
	condition: {
		beauty: number;
		cool: number;
		cute: number;
		feel: number;
		smart: number;
		tough: number;
	};
	expGroup: string;
	experience: number;
	friendship: number;
	hasSpecies: number;
	hiddenPower: string;
	id: number;
	isEgg: number;
	item: {
		id: number;
		name: string;
	};
	language: string;
	level: number;
	markings: {
		circle: boolean;
		heart: boolean;
		square: boolean;
		triangle: boolean;
	};
	metLocation: string;
	moves: IPokemonMove[];
	name: string;
	natID: number;
	nature: string;
	origins: {
		ball: string;
		game: string;
		hatched: boolean;
		metLevel: number;
	};
	ot: {
		sid: number;
		tid: Number;
	};
	pid: number;
	pokerus: {
		days: number;
		strain: number;
	};
	shiny: boolean;
	shinyValue: number;
	species: number;
	stats: IPokemonStats;
	status: {
		badPoison: boolean;
		burn: boolean;
		freeze: boolean;
		paralysis: boolean;
		poison: boolean;
		sleep: number;
	};
	type: string[];
}

/** Pokemon Stats */
interface IPokemonStats {
	attack: number;
	defence: number;
	hp: number;
	spAttack: number;
	spDefense: number;
	speed: number;
}

/** Pokemon Move Data */
interface IPokemonMove {
	accuracy: number;
	effect: string;
	id: number;
	kind: string;
	name: string;
	power: number;
	pp: number;
	remaining_pp: number;
	type: string;
}
