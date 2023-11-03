/** Collection of Instance Data from each API endpoint */
interface IInstanceData {
	trainer: ITrainer;
	items: IItems;
	party: TParty;
	encounter_log: TEncounterLog;
	shiny_log: TShinyLog;
	encounter_rate: TEncounterRate;
	stats: IStats;
}

/** Possible Endpoint Data */
type InstanceData =
| ITrainer
| IItems
| TParty
| TEncounterLog
| TShinyLog
| TEncounterRate
| IStats;

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
		"Watmel Berry": number;
		"Durin Berry": number;
		"Belue Berry": number;
		"Liechi Berry": number;
		"Ganlon Berry": number;
		"Salac Berry": number;
		"Petaya Berry": number;
		"Apicot Berry": number;
		"Lansat Berry": number;
		"Starf Berry": number;
		"Enigma Berry": number;
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
		Potion: number;
		Antidote: number;
		"Burn Heal": number;
		"Ice Heal": number;
		"Paralyze Heal": number;
		"Full Heal": number;
		Awakening: number;
		"Parlyz Heal": number;
		"Revival Herb": number;
		Ether: number;
		"Max Ether": number;
		Elixir: number;
		"Max Elixir": number;
		"Lava Cookie": number;
		"Blue Flute": number;
		"Yellow Flute": number;
		"Red Flute": number;
		"Black Flute": number;
		"White Flute": number;
		"Berry Juice": number;
		"Sacred Ash": number;
		"Shoal Salt": number;
		"Shoal Shell": number;
		"Red Shard": number;
		"Blue Shard": number;
		"Yellow Shard": number;
		"Green Shard": number;
		"Guard Spec.": number;
		"Dire Hit": number;
		"X Attack": number;
		"X Speed": number;
		"X Accuracy": number;
		"X Special": number;
		"Poké Doll": number;
		"Fluffy Tail": number;
		"Super Repel": number;
		"Escape Rope": number;
		Pearl: number;
		"Big Pearl": number;
		"Heart Scale": number;
		"Orange Mail": number;
		"Harbor Mail": number;
		"Glitter Mail": number;
		"Mech Mail": number;
		"Wood Mail": number;
		"Wave Mail": number;
		"Bead Mail": number;
		"Shadow Mail": number;
		"Tropic Mail": number;
		"Dream Mail": number;
		"Fab Mail": number;
		"Retro Mail": number;
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
		"Bright Powder": number;
		"White Herb": number;
		"Macho Brace": number;
		"Exp. Share": number;
		"Quick Claw": number;
		"Soothe Bell": number;
		"Mental Herb": number;
		"Choice Band": number;
		"King's Rock": number;
		SilverPowder: number;
		"Amulet Coin": number;
		"Cleanse Tag": number;
		"Soul Dew": number;
		DeepSeaTooth: number;
		DeepSeaScale: number;
		"Smoke Ball": number;
		Everstone: number;
		"Focus Band": number;
		"Lucky Egg": number;
		"Scope Lens": number;
		"Metal Coat": number;
		Leftovers: number;
		"Dragon Scale": number;
		"Light Ball": number;
		"Soft Sand": number;
		"Hard Stone": number;
		"Miracle Seed": number;
		BlackGlasses: number;
		"Black Belt": number;
		Magnet: number;
		"Mystic Water": number;
		"Sharp Beak": number;
		"Poison Barb": number;
		NeverMeltIce: number;
		"Spell Tag": number;
		TwistedSpoon: number;
		Charcoal: number;
		"Dragon Fang": number;
		"Silk Scarf": number;
		"Up-Grade": number;
		"Shell Bell": number;
		"Sea Incense": number;
		"Lax Incense": number;
		"Lucky Punch": number;
		"Metal Powder": number;
		"Thick Club": number;
		Stick: number;
		"Red Scarf": number;
		"Blue Scarf": number;
		"Pink Scarf": number;
		"Green Scarf": number;
		"Yellow Scarf": number;
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
		"Mach Bike": number;
		"Old Rod": number;
		"Coin Case": number;
		Itemfinder: number;
		"Good Rod": number;
		"Super Rod": number;
		"S.S. Ticket": number;
		"Contest Pass": number;
		"Wailmer Pail": number;
		"Devon Goods": number;
		"Soot Sack": number;
		"Basement Key": number;
		"Acro Bike": number;
		"Pokéblock Case": number;
		Letter: number;
		"Eon Ticket": number;
		"Red Orb": number;
		"Blue Orb": number;
		Scanner: number;
		"Go-Goggles": number;
		Meteorite: number;
		"Rm. 1 Key": number;
		"Rm. 2 Key": number;
		"Rm. 4 Key": number;
		"Rm. 6 Key": number;
		"Storage Key": number;
		"Root Fossil": number;
		"Claw Fossil": number;
		"Devon Scope": number;
	};
	PC: {
		Potion: number;
	};
	"Poké Balls": {
		"Master Ball": number;
		"Ultra Ball": number;
		"Great Ball": number;
		"Poké Ball": number;
		"Safari Ball": number;
		"Net Ball": number;
		"Dive Ball": number;
		"Nest Ball": number;
		"Repeat Ball": number;
		"Timer Ball": number;
		"Luxury Ball": number;
		"Premier Ball": number;
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
		TM01: number;
		TM02: number;
		TM03: number;
		TM04: number;
		TM05: number;
		TM06: number;
		TM07: number;
		TM08: number;
		TM09: number;
		TM10: number;
		TM11: number;
		TM12: number;
		TM13: number;
		TM14: number;
		TM15: number;
		TM16: number;
		TM17: number;
		TM18: number;
		TM19: number;
		TM20: number;
		TM21: number;
		TM22: number;
		TM23: number;
		TM24: number;
		TM25: number;
		TM26: number;
		TM27: number;
		TM28: number;
		TM29: number;
		TM30: number;
		TM31: number;
		TM32: number;
		TM33: number;
		TM34: number;
		TM35: number;
		TM36: number;
		TM37: number;
		TM38: number;
		TM39: number;
		TM40: number;
		TM41: number;
		TM42: number;
		TM43: number;
		TM44: number;
		TM45: number;
		TM46: number;
		TM47: number;
		TM48: number;
		TM49: number;
		TM50: number;
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

/** FPS Log Data */
type TFps = number[];

/** Emulator Data */
interface IEmulator {
	audio_enabled: boolean;
	bot_mode: string;
	current_fps: number;
	current_message: string;
	current_time_spent_in_bot_fraction: number;
	emulation_speed: number;
	frame_count: number;
	video_enabled: boolean;
	game: {
		[key: string]: {
			language: string;
			name: string;
			revision: number;
			title: string;
		};
	};
	profile: {
		[key: string]: {
			name: string;
		};
	};
}

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
