<script setup lang="ts">
// utility functions
import { pkmnRef } from "~/utility";

import { useNuxtApp } from "#app";

// get state
import useStore from "~/stores";
const store = useStore();

// get viewport
const viewport = useViewport();

const props = defineProps<{
	panelStyle: string;
	data: TParty;
}>();

// whether more info is shown per pokemon or not
const expandedInfoVisible: Ref<boolean[]> = ref([
	false,
	false,
	false,
	false,
	false,
	false,
]);
</script>

<template>
	<div :class="[panelStyle, 'relative text-light-text dark:text-dark-text']">
		<!-- Expand/Shrink All -->
		<div class="full:flex full:flex-col shrink-0 h-full py-2 gap-1 hidden">
			<!-- Expand All -->
			<IconButton
				v-if="!expandedInfoVisible.every((val) => val === true)"
				icon="i-tabler-layout-bottombar-collapse-filled"
				@clickEvent="expandedInfoVisible.fill(true, 0, 6)"
			/>
			<!-- Shrink All -->
			<IconButton
				v-if="!expandedInfoVisible.every((val) => val === false)"
				icon="i-tabler-layout-bottombar-expand"
				@clickEvent="expandedInfoVisible.fill(false, 0, 6)"
			/>
		</div>

		<!-- List of Pokemon -->
		<ul class="grid grid-cols-2 w-full">
			<!-- Individual Pokemon -->
			<li
				v-for="(pokemon, index) of data"
				class="m-1 gap-1 flex flex-row p-0 mx-1 items-center justify-center"
			>
				<!-- Pokemon Sprite -->
				<div
					v-if="
						!expandedInfoVisible[index] ||
						viewport.isLessThan('full')
					"
					class="bg-light-primary dark:bg-dark-primary rounded-lg flex justify-center items-center w-full"
				>
					<Spinner v-if="!store.pokemonSprites[pkmnRef(pokemon)]" />
					<img
						v-else
						class="w-full"
						:src="store.pokemonSprites[pkmnRef(pokemon)]"
						:title="(pokemon as IPokemon).name + ((pokemon as IPokemon).shiny ? ' (Shiny)' : '')"
					/>
				</div>

				<!-- Pokemon Info -->
				<div
					:class="[
						'bg-light-primary dark:bg-dark-primary rounded-lg full:flex full:flex-col hidden justify-start items-center py-2 px-2 w-full h-full',
						expandedInfoVisible[index] ? 'h-full' : '',
					]"
				>
					<!-- Name / Shiny -->
					<div
						class="text-base flex justify-center items-center text-center content-center"
					>
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
						class="text-base flex flex-col items-center mt-1 w-full"
					>
						<span class="text-xs mb-1"
							>Lvl: {{ (pokemon as IPokemon).level }}</span
						>
						<div
							class="bg-light-secondary dark:bg-dark-secondary rounded-full w-full h-1.5 mb-1"
						>
							<div
								class="bg-light-accent dark:bg-dark-accent rounded-full h-1.5"
								:style="'width: ' + (pokemon as IPokemon).level + '%'"
							></div>
						</div>
					</div>

					<!-- IV Sum -->
					<div class="text-center mb-1">
						<span class="text-xs"
							>IV Sum: {{ (pokemon as IPokemon).IVSum }}</span
						>
					</div>

					<!-- Show More Button -->
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

					<!-- Show More Content -->
					<div
						v-if="expandedInfoVisible[index]"
						class="bg-light-secondary dark:bg-dark-secondary rounded-md py-2 px-3 mb-2"
					>
						<div class="mb-2">
							<!-- Ability -->
							<span class="text-base flex items-center mb-1">
								<Icon
									name="icon-park-solid:fire"
									class="h-4 text-light-tertiary dark:text-dark-tertiary"
								/>
								<span class="text-xs ml-1">
									{{ (pokemon as IPokemon).ability }}</span
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
									{{ (pokemon as IPokemon).item.name }}</span
								>
							</span>
						</div>

						<!-- Moves List -->
						<ul class="mb-1">
							<li
								v-for="move in pokemon.moves"
								:key="move.id"
								class="flex flex-row items-center justify-between text-xs"
							>
								<span>
									{{ move.name }}
								</span>
								<span class="mx-2"></span>
								<span class="flex items-center">
									<Icon
										name="ph:hand-fist-fill"
										class="h-3 text-light-tertiary dark:text-dark-tertiary"
									/>
									<span> {{ move.power }}</span>
									<Icon
										name="iconamoon:lightning-1-fill"
										class="h-3 text-light-tertiary dark:text-dark-tertiary ml-1"
									/>
									<span>
										{{ move.remaining_pp }}/{{
											move.pp
										}}</span
									></span
								>
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
