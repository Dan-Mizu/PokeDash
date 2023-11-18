<script setup lang="ts">
// get state
import useStore from "~/stores";
const store = useStore();

// props
const props = defineProps<{
	data: IPokemon;
}>();

// get viewport
const viewport = useViewport();

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
			viewport.isLessThan('full')
				? 'grid-cols-1'
				: 'grid-cols-2',
		]"
		@click="modalPokemonStatsOpen = true"
	>

		<!-- Pokemon Sprite -->
		<!-- TODO: Why the hell does removing "v-if=true" cause the pokemon sprites to bug out ?? -->
		<div
		
			v-if="true"
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
			v-if="viewport.isGreaterOrEquals('full')"
			class="bg-light-primary dark:bg-dark-primary rounded-lg flex flex-col justify-start items-center py-2 px-2 w-full h-full"
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
