<script setup lang="ts">
// utility functions
import { pkmnRef } from "~/utility";

// get state
import useStore from "~/stores";
const store = useStore();

const props = defineProps<{
	panelStyle: string;
	data: IPokemon[];
}>();

// whether more info is shown per pokemon or not
const expandedInfoVisible: Ref<boolean[]> = ref([]);
</script>

<template>
	<div :class="[panelStyle, 'relative']">
		<!-- Expand/Shrink All -->
		<div class="flex flex-col shrink-0 h-full py-2 gap-1">
			<!-- Expand All -->
			<IconButton v-if="!expandedInfoVisible.every(val => val === true)" icon="i-tabler-layout-bottombar-collapse-filled" @clickEvent="expandedInfoVisible.fill(true, 0, 6)"/>
			<!-- Shrink All -->
			<IconButton v-if="!expandedInfoVisible.every(val => val === false)" icon="i-tabler-layout-bottombar-expand" @clickEvent="expandedInfoVisible.fill(false, 0, 6)"/>
		</div>

		<!-- List of Pokemon -->
		<ul class="grid grid-cols-2 w-full">
			<!-- Individual Pokemon -->
			<li
				v-for="(pokemon, index) of data"
				class="flex flex-col flex-grow m-1 text-light-text dark:text-dark-text"
			>
				<span class="flex items-center">
					<!-- Pokemon Sprite -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg mx-1 p-4 flex justify-center items-center min-w-[25%]"
					>
						<Spinner
							v-if="!store.pokemonSprites[pkmnRef(pokemon)]"
						/>
						<img
							v-else
							:src="store.pokemonSprites[pkmnRef(pokemon)]"
							:title="(pokemon as IPokemon).name + ((pokemon as IPokemon).shiny ? ' (Shiny)' : '')"
						/>
					</div>

					<!-- Pokemon Info -->
					<div
						class="bg-light-primary dark:bg-dark-primary rounded-lg flex-1 justify-center py-1 px-2 items-start full:block hidden"
					>
						<!-- Name / Shiny -->
						<div class="text-base flex justify-center items-center">
							<!-- Name -->
							<span class="mr-1">{{
								(pokemon as IPokemon).name
							}}</span>

							<!-- Shiny -->
							<div
								class="bg-light-secondary dark:bg-dark-secondary rounded-md flex justify-center items-center p-1"
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
							class="text-base flex flex-col justify-center items-center mt-1 mb-1"
						>
							<span class="text-xs mb-1"
								>Lvl: {{ (pokemon as IPokemon).level }}</span
							>
							<div
								class="w-full bg-light-secondary dark:bg-dark-secondary rounded-full h-1.5 mb-1"
							>
								<div
									class="bg-light-accent dark:bg-dark-accent h-1.5 rounded-full"
									:style="'width: ' + (pokemon as IPokemon).level + '%'"
								></div>
							</div>
						</div>

						<!-- Show More Button -->
						<div class="w-full flex justify-center">
							<button
								@click="
									expandedInfoVisible[index] =
										!expandedInfoVisible[index]
								"
								class="cursor-pointer"
							>
								<Icon
									v-if="expandedInfoVisible[index]"
									name="material-symbols:arrow-circle-up-outline"
									class="h-6 text-light-tertiary dark:text-dark-tertiary hover:text-light-accent hover:dark:text-dark-accent"
								/>
								<Icon
									v-else
									name="material-symbols:arrow-circle-down"
									class="h-6 text-light-tertiary dark:text-dark-tertiary hover:text-light-accent hover:dark:text-dark-accent"
								/>
							</button>
						</div>

						<!-- Show More Content -->
						<div
							v-if="expandedInfoVisible[index]"
							class="bg-light-secondary dark:bg-dark-secondary rounded-md py-1 px-2 mb-1"
						>
							<!-- IV Sum -->
							<div class="text-center w-full mb-1">
								<span class="text-xs"
									>IV Sum:
									{{ (pokemon as IPokemon).IVSum }}</span
								>
							</div>

							<div class="mb-2">
								<!-- Ability -->
								<span class="text-base flex items-center mb-1">
									<Icon
										name="icon-park-solid:fire"
										class="h-4 text-light-tertiary dark:text-dark-tertiary"
									/>
									<span class="text-xs ml-1">
										{{
											(pokemon as IPokemon).ability
										}}</span
									></span
								>

								<!-- Held Item -->
								<span
									v-if="(pokemon as IPokemon).item.name !='None'"
									class="text-base flex items-center"
								>
									<Icon
										name="mdi:sack"
										class="h-4 text-light-tertiary dark:text-dark-tertiary"
									/>
									<span class="text-xs ml-1">
										{{
											(pokemon as IPokemon).item.name
										}}</span
									>
								</span>
							</div>

							<!-- Moves List -->
							<ul class="mb-1">
								<li
									v-for="move in pokemon.moves"
									:key="move.id"
									class="flex items-center relative"
								>
									<span class="text-xs">
										{{ move.name }}
									</span>
									<span
										class="flex items-center absolute right-0"
									>
										<Icon
											name="ph:hand-fist-fill"
											class="h-3 text-light-tertiary dark:text-dark-tertiary"
										/>
										<span class="text-xs">
											{{ move.power }}</span
										>
										<Icon
											name="iconamoon:lightning-1-fill"
											class="h-3 text-light-tertiary dark:text-dark-tertiary ml-1"
										/>
										<span class="text-xs">
											{{ move.remaining_pp }}/{{
												move.pp
											}}</span
										></span
									>
								</li>
							</ul>
						</div>
					</div>
				</span>
			</li>
		</ul>
	</div>
</template>
