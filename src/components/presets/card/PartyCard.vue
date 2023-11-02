<script setup lang="ts">
import PokemonBadge from "../badge/PokemonBadge.vue";

const props = defineProps<{
	panelStyle: string;
	data: TParty;
}>();

// references to child pokemon badges
const pokemonBadgeRefs = ref([]);
</script>

<template>
	<div :class="[panelStyle, 'relative']">
		<!-- Expand/Shrink All -->
		<div class="full:flex full:flex-col h-full py-2 gap-1 hidden">
			<!-- Expand All -->
			<IconButton
				v-if="
					!pokemonBadgeRefs.every(
						(badge) => (badge as typeof PokemonBadge).showExtraInfo === true
					)
				"
				icon="i-tabler-layout-bottombar-collapse-filled"
				@clickEvent="
					pokemonBadgeRefs.forEach(
						(badge) =>
							((
								badge as typeof PokemonBadge
							).showExtraInfo = true)
					)
				"
			/>
			<!-- Shrink All -->
			<IconButton
				v-if="
					!pokemonBadgeRefs.every(
						(badge) => (badge as typeof PokemonBadge).showExtraInfo === false
					)
				"
				icon="i-tabler-layout-bottombar-expand"
				@clickEvent="
					pokemonBadgeRefs.forEach(
						(badge) =>
							((
								badge as typeof PokemonBadge
							).showExtraInfo = false)
					)
				"
			/>
		</div>

		<!-- List of Pokemon -->
		<ul class="grid grid-cols-2 w-full">
			<!-- Individual Pokemon -->
			<li
				v-for="(pokemon, index) of data"
				class="m-1 items-center justify-center"
			>
				<!-- Pokemon Sprite -->
				<PokemonBadge :data="pokemon" ref="pokemonBadgeRefs" />
			</li>
		</ul>
	</div>
</template>
