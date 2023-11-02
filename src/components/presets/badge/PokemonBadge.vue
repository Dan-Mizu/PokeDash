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
</script>

<template>
	<div
		:class="[
			'grid gap-1 w-full',
			viewport.isLessThan('full') || showExtraInfo
				? 'grid-cols-1'
				: 'grid-cols-2',
		]"
	>
		<!-- Pokemon Sprite -->
		<div
			v-if="showSprite"
			class="bg-light-primary dark:bg-dark-primary rounded-lg flex justify-center items-center w-full h-full"
		>
			<Spinner v-if="!spriteSrc" />
			<img
				v-else
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
			<div class="text-base flex flex-col items-center mt-1 w-full">
				<span class="text-xs mb-1">Lvl: {{ data.level }}</span>
				<div
					class="bg-light-secondary dark:bg-dark-secondary rounded-full w-full h-1.5 mb-1"
				>
					<div
						class="bg-light-accent dark:bg-dark-accent rounded-full h-1.5"
						:style="'width: ' + data.level + '%'"
					></div>
				</div>
			</div>

			<!-- IV Sum -->
			<div class="text-center mb-1">
				<span class="text-xs">IV Sum: {{ data.IVSum }}</span>
			</div>

			<!-- Show More Button -->
			<button
				@click="showExtraInfo = !showExtraInfo"
				class="cursor-pointer"
			>
				<Icon
					v-if="showExtraInfo"
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
				v-if="showExtraInfo"
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
							{{ data.ability }}</span
						></span
					>

					<!-- Held Item -->
					<span
						v-if="data.item.name != 'None'"
						class="text-base flex items-center"
					>
						<Icon
							name="mdi:sack"
							class="h-4 text-light-tertiary dark:text-dark-tertiary"
						/>
						<span class="text-xs ml-1"> {{ data.item.name }}</span>
					</span>
				</div>

				<!-- Moves List -->
				<ul class="mb-1">
					<li
						v-for="move in data.moves"
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
								{{ move.remaining_pp }}/{{ move.pp }}</span
							></span
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
