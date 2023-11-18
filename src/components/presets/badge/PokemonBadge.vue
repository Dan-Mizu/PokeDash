<script setup lang="ts">
// utility functions
import { pkmnRef } from "~/utility";

// get state
import useStore from "~/stores";
const store = useStore();

const props = defineProps<{
	data: IPokemon;
}>();

// get viewport
const viewport = useViewport();

// extra info toggled
const showExtraInfo: Ref<boolean> = ref(false);
defineExpose({
	showExtraInfo,
});

// is sprite visible?
const showSprite = computed(() => {
	// always show if in mobile mode
	if (viewport.isLessThan("full") || !showExtraInfo.value) return true;

	return false;
});

// get pokemon sprite
const spriteSrc = ref("");
store
	.getPokemonSprite(props.data.natID, props.data.shiny)
	.then((result) => (spriteSrc.value = result));

// extra pokemon stats modal handling
const modalPokemonStatsOpen = ref(false);
</script>

<template>
	<button
		:class="[
			'grid gap-1 w-full',
			viewport.isLessThan('full') || showExtraInfo
				? 'grid-cols-1'
				: 'grid-cols-2',
		]"
		@click="modalPokemonStatsOpen = true"
	>
		<!-- Pokemon Sprite -->
		<div
			v-if="showSprite"
			class="bg-light-primary dark:bg-dark-primary rounded-lg flex justify-center items-center w-full h-full"
		>
			<Spinner v-if="!spriteSrc" />
			<img
				v-else
				class="rendering-pixelated"
				:src="spriteSrc"
				:title="data.name + (data.shiny ? ' (Shiny)' : '')"
			/>
		</div>

		<!-- Pokemon Info -->
		<div
			class="bg-light-primary dark:bg-dark-primary rounded-lg full:flex full:flex-col hidden justify-start items-center py-2 px-2 w-full h-full"
		>
			<!-- Name / Shiny -->
			<div
				class="text-base flex justify-center items-center text-center content-center"
			>
				<!-- Name -->
				<span class="mr-1">{{ data.name }}</span>

				<!-- Shiny -->
				<div
					class="bg-light-secondary dark:bg-dark-secondary rounded-md flex justify-center items-center p-1"
					v-if="data.shiny"
				>
					<Icon
						name="heroicons:sparkles-solid"
						class="h-4 text-light-tertiary dark:text-dark-tertiary"
					/>
				</div>
			</div>

			<!-- Level -->
			<div
				class="bg-light-secondary dark:bg-dark-secondary rounded-md flex justify-center items-center px-2 py-1"
			>
				<span class="text-xs"> LVL {{ data.level }} </span>
			</div>

			<!-- IV Sum -->
			<div
				class="flex flex-col items-center justify-center text-center text-xs w-full my-1"
			>
				<IvSumProgressBar :IVSum="data.IVSum" />
			</div>
		</div>
	</button>

	<!-- Add Instance Modal -->
	<PokemonStatsModal
		v-if="data"
		:open="modalPokemonStatsOpen"
		@closeModal="modalPokemonStatsOpen = false"
		:pokemon="data"
		:spriteSrc="spriteSrc"
	/>
</template>
