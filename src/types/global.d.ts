/** Collection of Instance Data from each API endpoint */
interface IInstanceData {
	trainer: ITrainer;
	items: IItems;
	party: IPokemon[];
	encounter_log: TEncounterLog;
	shiny_log: TShinyLog;
	encounter_rate: TEncounterRate;
	stats: IStats;
}

/** Possible Endpoints */
type InstanceDataKey =
	| "trainer"
	| "items"
	| "party"
	| "encounter_log"
	| "shiny_log"
	| "encounter_rate"
	| "stats";

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

// TODO: Not complete... There are a ton of TMs and Poke Balls not included as this only includes what i found while fetching the data from an existing endpoint.
/** Items Data */
interface IItems {
	Berries: {
		"Aspear Berry": number;
		"Cheri Berry": number;
		"Chesto Berry": number;
		"Oran Berry": number;
		"Pecha Berry": number;
		"Persim Berry": number;
		"Rawst Berry": number;
		"Spelon Berry": number;
	};
	Items: {
		Awakening: number;
		Calcium: number;
		Carbos: number;
		"Escape Rope": number;
		Ether: number;
		"Exp. Share": number;
		"Full Restore": number;
		"Hyper Potion": number;
		"Leaf Stone": number;
		"Max Repel": number;
		"Moon Stone": number;
		Nugget: number;
		"PP Up": number;
		Potion: number;
		Protein: number;
		"Quick Claw": number;
		Repel: number;
		Revive: number;
		Stardust: number;
		"Super Potion": number;
		"White Flute": number;
		"X Defend": number;
		Zinc: number;
	};
	"Key Items": {
		Auroraticket: number;
		"Berry Pouch": number;
		"Claw Fossil": number;
		"Devon Scope": number;
		"Dome Fossil": number;
		"Fame Checker": number;
		"Go-goggles": number;
		"Good Rod": number;
		"Helix Fossil": number;
		"Old Rod": number;
		"Poké Flute": number;
		"S.S. Ticket": number;
		"Silph Scope": number;
		"Super Rod": number;
		"TM Case": number;
		"Teachy Tv": number;
		"VS Seeker": number;
	};
	PC: {
		Potion: number;
	};
	"Poké Balls": {
		"Great Ball": number;
		"Poké Ball": number;
	};
	"TMs & HMs": {
		HM01: number;
		HM02: number;
		HM03: number;
		HM04: number;
		HM05: number;
		HM06: number;
		HM07: number;
		HM08: number;
		TM03: number;
		TM05: number;
		TM09: number;
		TM10: number;
		TM11: number;
		TM28: number;
		TM31: number;
		TM39: number;
		TM40: number;
		TM43: number;
		TM44: number;
		TM45: number;
		TM47: number;
	};
}

/** Party Data */
type TParty = IPokemon[];

/** Pokemon Data */
interface IPokemon {
	EVs: IPokemonStats;
	IVSum: number;
	IVs: IPokemonStats;
	ability: string;
	antiShiny: boolean | null;
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

/** Encounter Log Data */
type TEncounterLog = IEncounteredPokemon[];

/** Snapshot Stats Data */
interface ISnapshotStats {
	phase_encounters: number;
	species_encounters: number;
	species_shiny_encounters: number;
	total_encounters: number;
	total_shiny_encounters: number;
}

/** Encountered Pokemon Data */
interface IEncounteredPokemon {
	pokemon: IPokemon;
	snapshot_stats: ISnapshotStats;
	time_encountered: number;
}

/** Encounter Rate Data */
type TEncounterRate = number;

/** Shiny Log Data */
type TShinyLog = IShinyPokemon[];

/** Shiny Pokemon Data */
interface IShinyPokemon {
	pokemon: IPokemon;
	snapshot_stats: ISnapshotStats;
	time_encountered: number;
}

/** Stats Data */
interface IStats {
	pokemon: {
		[key: string]: {
			encounters: number;
			last_encounter_time_str: string;
			last_encounter_time_unix: number;
			phase_encounters: number | null;
			phase_highest_iv_sum: number | null;
			phase_highest_sv: number | null;
			phase_lowest_iv_sum: number | null;
			phase_lowest_sv: number | null;
			shiny_average: string | null;
			shiny_encounters: string | null;
			total_highest_iv_sum: number;
			total_lowest_iv_sum: number;
			total_lowest_sv: number;
		};
	};
	totals: {
		current_streak: number;
		encounters: number;
		highest_iv_sum: number;
		highest_iv_sum_pokemon: string;
		longest_phase_encounters: number;
		longest_phase_pokemon: string;
		lowest_iv_sum: number;
		lowest_iv_sum_pokemon: string;
		phase_encounters: number;
		phase_highest_iv_sum: number;
		phase_highest_iv_sum_pokemon: string;
		phase_highest_sv: number;
		phase_highest_sv_pokemon: string;
		phase_lowest_iv_sum: number;
		phase_lowest_iv_sum_pokemon: string;
		phase_lowest_sv: number;
		phase_lowest_sv_pokemon: string;
		phase_streak: number;
		phase_streak_pokemon: string;
		shiny_average: string;
		shiny_encounters: number;
		shortest_phase_encounters: number;
		shortest_phase_pokemon: string;
	};
}
