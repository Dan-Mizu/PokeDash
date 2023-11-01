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

// TODO: This should include almost everything now. Remind me if not.
/** Items Data */
interface IItems {
	"Berries": {
		"Aspear Berry": number,
		"Cheri Berry": number,
		"Chesto Berry": number,
		"Oran Berry": number,
		"Pecha Berry": number,
		"Persim Berry": number,
		"Rawst Berry": number,
		"Spelon Berry": number,
		"Watmel Berry": number, // Added Watmel Berry to the list
		"Durin Berry": number, // Added Durin Berry to the list
		"Belue Berry": number, // Added Belue Berry to the list
		"Liechi Berry": number, // Added Liechi Berry to the list
		"Ganlon Berry": number, // Added Ganlon Berry to the list
		"Salac Berry": number, // Added Salac Berry to the list
		"Petaya Berry": number, // Added Petaya Berry to the list
		"Apicot Berry": number, // Added Apicot Berry to the list
		"Lansat Berry": number, // Added Lansat Berry to the list
		"Starf Berry": number, // Added Starf Berry to the list
		"Enigma Berry": number, // Added Enigma Berry to the list
	};
	"Items": {
		Awakening: number,
		Calcium: number,
		Carbos: number,
		"Escape Rope": number,
		Ether: number,
		"Exp. Share": number, // Added Exp. Share to the list
		"Full Restore": number,
		"Hyper Potion": number,
		"Leaf Stone": number,
		"Max Repel": number,
		"Moon Stone": number,
		Nugget: number,
		"PP Up": number,
		Potion: number,
		Protein: number,
		"Quick Claw": number, // Added Quick Claw to the list
		Repel: number,
		Revive: number,
		Stardust: number,
		"Super Potion": number,
		"White Flute": number,
		"X Defend": number,
		Zinc: number,
		"Potion": number, // Added Potion to the list
		"Antidote": number, // Added Antidote to the list
		"Burn Heal": number, // Added Burn Heal to the list
		"Ice Heal": number, // Added Ice Heal to the list
		"Paralyze Heal": number, // Added Paralyze Heal to the list
		"Full Heal": number, // Added Full Heal to the list
		"Awakening": number,
		"Parlyz Heal": number, // Added Parlyz Heal to the list
		"Revival Herb": number,
		"Ether": number,
		"Max Ether": number, // Added Max Ether to the list
		"Elixir": number,
		"Max Elixir": number, // Added Max Elixir to the list
		"Lava Cookie": number,
		"Blue Flute": number,
		"Yellow Flute": number,
		"Red Flute": number,
		"Black Flute": number,
		"White Flute": number,
		"Berry Juice": number,
		"Sacred Ash": number,
		"Shoal Salt": number,
		"Shoal Shell": number,
		"Red Shard": number,
		"Blue Shard": number,
		"Yellow Shard": number,
		"Green Shard": number,
		"Guard Spec.": number,
		"Dire Hit": number,
		"X Attack": number,
		"X Speed": number,
		"X Accuracy": number,
		"X Special": number,
		"Poké Doll": number,
		"Fluffy Tail": number,
		"Super Repel": number,
		"Escape Rope": number,
		"Pearl": number,
		"Big Pearl": number,
		"Heart Scale": number,
		"Orange Mail": number,
		"Harbor Mail": number,
		"Glitter Mail": number,
		"Mech Mail": number,
		"Wood Mail": number,
		"Wave Mail": number,
		"Bead Mail": number,
		"Shadow Mail": number,
		"Tropic Mail": number,
		"Dream Mail": number,
		"Fab Mail": number,
		"Retro Mail": number,
		Awakening: number,
		Calcium: number,
		Carbos: number,
		"Escape Rope": number,
		Ether: number,
		"Exp. Share": number,
		"Full Restore": number,
		"Hyper Potion": number,
		"Leaf Stone": number,
		"Max Repel": number,
		"Moon Stone": number,
		Nugget: number,
		"PP Up": number,
		Potion: number,
		Protein: number,
		"Quick Claw": number,
		Repel: number,
		Revive: number,
		Stardust: number,
		"Super Potion": number,
		"White Flute": number,
		"X Defend": number,
		Zinc: number,
		"Bright Powder": number, // Added Bright Powder to the list
		"White Herb": number, // Added White Herb to the list
		"Macho Brace": number, // Added Macho Brace to the list
		"Exp. Share": number,
		"Quick Claw": number,
		"Soothe Bell": number, // Added Soothe Bell to the list
		"Mental Herb": number, // Added Mental Herb to the list
		"Choice Band": number, // Added Choice Band to the list
		"King's Rock": number, // Added King's Rock to the list
		"SilverPowder": number, // Added SilverPowder to the list
		"Amulet Coin": number, // Added Amulet Coin to the list
		"Cleanse Tag": number, // Added Cleanse Tag to the list
		"Soul Dew": number, // Added Soul Dew to the list
		"DeepSeaTooth": number, // Added DeepSeaTooth to the list
		"DeepSeaScale": number, // Added DeepSeaScale to the list
		"Smoke Ball": number, // Added Smoke Ball to the list
		"Everstone": number, // Added Everstone to the list
		"Focus Band": number, // Added Focus Band to the list
		"Lucky Egg": number, // Added Lucky Egg to the list
		"Scope Lens": number, // Added Scope Lens to the list
		"Metal Coat": number, // Added Metal Coat to the list
		"Leftovers": number, // Added Leftovers to the list
		"Dragon Scale": number, // Added Dragon Scale to the list
		"Light Ball": number, // Added Light Ball to the list
		"Soft Sand": number, // Added Soft Sand to the list
		"Hard Stone": number, // Added Hard Stone to the list
		"Miracle Seed": number, // Added Miracle Seed to the list
		"BlackGlasses": number, // Added BlackGlasses to the list
		"Black Belt": number, // Added Black Belt to the list
		"Magnet": number, // Added Magnet to the list
		"Mystic Water": number, // Added Mystic Water to the list
		"Sharp Beak": number, // Added Sharp Beak to the list
		"Poison Barb": number, // Added Poison Barb to the list
		"NeverMeltIce": number, // Added NeverMeltIce to the list
		"Spell Tag": number, // Added Spell Tag to the list
		"TwistedSpoon": number, // Added TwistedSpoon to the list
		"Charcoal": number, // Added Charcoal to the list
		"Dragon Fang": number, // Added Dragon Fang to the list
		"Silk Scarf": number, // Added Silk Scarf to the list
		"Up-Grade": number, // Added Up-Grade to the list
		"Shell Bell": number, // Added Shell Bell to the list
		"Sea Incense": number, // Added Sea Incense to the list
		"Lax Incense": number, // Added Lax Incense to the list
		"Lucky Punch": number, // Added Lucky Punch to the list
		"Metal Powder": number, // Added Metal Powder to the list
		"Thick Club": number, // Added Thick Club to the list
		"Stick": number, // Added Stick to the list
		"Red Scarf": number, // Added Red Scarf to the list
		"Blue Scarf": number, // Added Blue Scarf to the list
		"Pink Scarf": number, // Added Pink Scarf to the list
		"Green Scarf": number, // Added Green Scarf to the list
		"Yellow Scarf": number, // Added Yellow Scarf to the list
	};
	"Key Items": {
		Auroraticket: number,
		"Berry Pouch": number,
		"Claw Fossil": number,
		"Devon Scope": number,
		"Dome Fossil": number,
		"Fame Checker": number,
		"Go-goggles": number,
		"Good Rod": number,
		"Helix Fossil": number,
		"Mach Bike": number, // Added Mach Bike to the list
		"Old Rod": number,
		"Coin Case": number, // Added Coin Case to the list
		"Itemfinder": number, // Added Itemfinder to the list
		"Good Rod": number,
		"Super Rod": number,
		"S.S. Ticket": number,
		"Contest Pass": number,
		"Wailmer Pail": number, // Added Wailmer Pail to the list
		"Devon Goods": number, // Added Devon Goods to the list
		"Soot Sack": number, // Added Soot Sack to the list
		"Basement Key": number, // Added Basement Key to the list
		"Acro Bike": number, // Added Acro Bike to the list
		"Pokéblock Case": number, // Added Pokéblock Case to the list
		"Letter": number,
		"Eon Ticket": number,
		"Red Orb": number, // Added Red Orb to the list
		"Blue Orb": number, // Added Blue Orb to the list
		"Scanner": number,
		"Go-Goggles": number, // Added Go-Goggles to the list
		"Meteorite": number,
		"Rm. 1 Key": number, // Added Rm. 1 Key to the list
		"Rm. 2 Key": number, // Added Rm. 2 Key to the list
		"Rm. 4 Key": number, // Added Rm. 4 Key to the list
		"Rm. 6 Key": number, // Added Rm. 6 Key to the list
		"Storage Key": number, // Added Storage Key to the list
		"Root Fossil": number, // Added Root Fossil to the list
		"Claw Fossil": number, // Added Claw Fossil to the list
		"Devon Scope": number,
	};
	PC: {
		Potion: number;
	};
	"Poké Balls": {
		"Master Ball": number, // Added Master Ball to the list
		"Ultra Ball": number, // Added Ultra Ball to the list
		"Great Ball": number,
		"Poké Ball": number,
		"Safari Ball": number, // Added Safari Ball to the list
		"Net Ball": number, // Added Net Ball to the list
		"Dive Ball": number, // Added Dive Ball to the list
		"Nest Ball": number, // Added Nest Ball to the list
		"Repeat Ball": number, // Added Repeat Ball to the list
		"Timer Ball": number, // Added Timer Ball to the list
		"Luxury Ball": number, // Added Luxury Ball to the list
		"Premier Ball": number, // Added Premier Ball to the list
	};
	"TMs & HMs": {
		HM01: number,
		HM02: number,
		HM03: number,
		HM04: number,
		HM05: number,
		HM06: number,
		HM07: number,
		HM08: number,
		TM01: number, // Type Number for TM01
		TM02: number, // Type Number for TM02
		TM03: number,
		TM04: number, // Type Number for TM04
		TM05: number,
		TM06: number, // Type Number for TM06
		TM07: number, // Type Number for TM07
		TM08: number, // Type Number for TM08
		TM09: number,
		TM10: number,
		TM11: number,
		TM12: number, // Type Number for TM12
		TM13: number, // Type Number for TM13
		TM14: number, // Type Number for TM14
		TM15: number, // Type Number for TM15
		TM16: number, // Type Number for TM16
		TM17: number, // Type Number for TM17
		TM18: number, // Type Number for TM18
		TM19: number, // Type Number for TM19
		TM20: number, // Type Number for TM20
		TM21: number, // Type Number for TM21
		TM22: number, // Type Number for TM22
		TM23: number, // Type Number for TM23
		TM24: number, // Type Number for TM24
		TM25: number, // Type Number for TM25
		TM26: number, // Type Number for TM26
		TM27: number, // Type Number for TM27
		TM28: number,
		TM29: number, // Type Number for TM29
		TM30: number, // Type Number for TM30
		TM31: number,
		TM32: number, // Type Number for TM32
		TM33: number, // Type Number for TM33
		TM34: number, // Type Number for TM34
		TM35: number, // Type Number for TM35
		TM36: number, // Type Number for TM36
		TM37: number, // Type Number for TM37
		TM38: number, // Type Number for TM38
		TM39: number,
		TM40: number,
		TM41: number, // Type Number for TM41
		TM42: number, // Type Number for TM42
		TM43: number,
		TM44: number,
		TM45: number,
		TM46: number, // Type Number for TM46
		TM47: number,
		TM48: number, // Type Number for TM48
		TM49: number, // Type Number for TM49
		TM50: number, // Type Number for TM50
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
