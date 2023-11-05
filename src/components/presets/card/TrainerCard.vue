<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	trainerData: ITrainer;
	emulatorData: IEmulator;
}>();

// links to sprites from each game for each gender
const spriteTrainer = {
	boy: {
		rse: "https://archives.bulbagarden.net/media/upload/archive/8/8a/20140710044809%21Brendan_OD.png",
		frlg: "https://archives.bulbagarden.net/media/upload/d/d5/Red_FRLG_OD.png",
	},
	girl: {
		rse: "https://archives.bulbagarden.net/media/upload/archive/2/21/20140710044744%21May_OD.png",
		frlg: "https://archives.bulbagarden.net/media/upload/6/69/Leaf_FRLG_OD.png",
	},
};

// format game name
const game: "frlg" | "rse" = ["FIRE", "LEAF"].includes(
	props.emulatorData.game.title.replaceAll("POKEMON ", "")
)
	? "frlg"
	: "rse";
</script>

<template>
	<div :class="panelStyle">
		<div class="flex flex-col justify-center items-center w-full p-3 gap-2">
			<!-- TODO: Text box to let user "name" an instance here, just display -->

			<!-- Trainer Sprite  -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md w-1/2"
			>
				<img
					class="w-full rendering-pixelated"
					referrerpolicy="no-referrer"
					:src="spriteTrainer[props.trainerData.gender][game]"
				/>
			</div>

			<!-- Character Data -->
			<div class="flex flex-row">
				<!-- Name -->
				<span class="mr-2 text-lg font-bold flex items-center">
					{{ trainerData.name }}
				</span>

				<!-- Gender Icon -->
				<div
					class="bg-light-primary dark:bg-dark-primary rounded-md flex justify-center items-center p-1"
				>
					<Icon
						v-if="trainerData.gender === 'boy'"
						name="material-symbols:male"
						class="h-5 w-auto text-light-tertiary dark:text-dark-tertiary"
					/>
					<Icon
						v-else
						name="material-symbols:female"
						class="h-5 w-auto text-light-tertiary dark:text-dark-tertiary"
					/>
				</div>
			</div>

			<!-- IDs -->
			<div
				class="flex flex-row bg-light-primary dark:bg-dark-primary rounded-md py-1 px-2 text-xs w-full"
			>
				<div class="flex-grow text-left">
					TID: {{ trainerData.tid }}
				</div>
				<div class="flex-grow text-right">
					SID: {{ trainerData.sid }}
				</div>
			</div>

			<!-- Location -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md p-1 mb-2 text-sm text-center py-2 px-3"
			>
				<p class="whitespace-pre-wrap">
					Currently in
					<span class="font-bold inline-block">
						{{
							trainerData.map_name
								.replaceAll("_", " ")
								.toLowerCase()
								.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
									letter.toUpperCase()
								)
						}}
					</span>
					<span v-if="trainerData.on_bike">, on a bike.</span>
					<span v-else>.</span>
				</p>
				<!-- Coords -->
				<span
					class="flex justify-center items-center text-center mt-2 text-xs"
				>
					(X: {{ trainerData.coords[0] }}, Y:
					{{ trainerData.coords[1] }})
				</span>
			</div>
			
			<!-- TODO: Map info from here: https://github.com/SimplyBLGDev/simplyblgdev.github.io/tree/master -->
			<!-- TODO: Target Mon?-->
		</div>
	</div>
</template>
