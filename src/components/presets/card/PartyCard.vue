<script setup lang="ts">
// utility functions
import { pkmnRef } from "~/utility";

// get state
import useStore from "~/stores";
const store = useStore();

const props = defineProps<{
	panelStyle: string;
	partyData: IPokemon[];
}>();
</script>

<template>
	<div :class="panelStyle">
		<ul>
			<li
				v-for="(pokemon, _index) of partyData"
				class="flex flex-col my-2"
			>
				<span class="flex items-center">
					<!-- Pokemon Sprite -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg mx-1 p-2 flex justify-center items-center min-w-[25%]"
					>
						<img
							:src="store.pokemonSprites[pkmnRef(pokemon)]"
							:title="(pokemon as IPokemon).name + ((pokemon as IPokemon).shiny ? ' (Shiny)' : '')"
						/>
					</div>

					<!-- Pokemon Info -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg flex-1 justify-center py-1 px-6 mx-1 items-start full:block hidden"
					>
						<!-- Name / Shiny -->
						<div
							class="text-base flex text-light-text dark:text-dark-text justify-center items-center"
						>
							<!-- Name -->
							<span class="mr-1">{{
								(pokemon as IPokemon).name
							}}</span>

							<!-- Shiny -->
							<div
								class="bg-light-secondary dark:bg-dark-secondary m-1 px-[5px] pb-[2px] rounded-md"
								v-if="(pokemon as IPokemon).shiny"
							>
								<Icon
									name="heroicons:sparkles-solid"
									class="h-4 text-light-tertiary dark:text-dark-tertiary"
								/>
							</div>
						</div>

						<!-- Level -->
						<div
							class="text-base flex flex-col text-light-text dark:text-dark-text justify-center items-center mt-1 mb-1"
						>
							<span class="text-xs"
								>Lvl: {{ (pokemon as IPokemon).level }}</span
							>
							<div
								class="w-full bg-light-secondary dark:bg-dark-secondary rounded-full h-1.5 mb-3"
							>
								<div
									class="bg-light-accent dark:bg-dark-accent h-1.5 rounded-full"
									:style="'width: ' + (pokemon as IPokemon).level + '%'"
								></div>
							</div>
							<span class="text-xs"
								>IV Sum: {{ (pokemon as IPokemon).IVSum }}</span
							>
						</div>

						<!-- Ability / Held Item -->
						<div
							class="text-base flex text-light-text dark:text-dark-text items-center mb-1"
						>
							<!-- Ability -->
							<span>
								<Icon
									name="icon-park-solid:fire"
									class="h-4 mx-1 text-light-tertiary dark:text-dark-tertiary"
								/>
								<span class="text-xs mr-1">
									{{ (pokemon as IPokemon).ability }}</span
								></span
							>

							<!-- Held Item -->
							<span
								v-if="(pokemon as IPokemon).item.name !='None'"
							>
								<Icon
									name="mdi:sack"
									class="h-4 mx-1 text-light-tertiary dark:text-dark-tertiary"
								/>
								<span class="text-xs">
									{{ (pokemon as IPokemon).item.name }}</span
								>
							</span>
						</div>
					</div>
				</span>
			</li>
		</ul>
	</div>
</template>
