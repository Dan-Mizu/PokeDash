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
