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
// const showExtraInfo: Ref<boolean> = ref(false);
// defineExpose({
//	showExtraInfo,
//});

// is sprite visible?
const showSprite = computed(() => {
	// always show if in mobile mode
	if (viewport.isLessThan("full") || !showExtraInfo.value) return true;

	return false;
});


const showExtraInfo = true;

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
				: 'grid-cols-1',
		]"
	>


		<!-- Pokemon Info -->
		<div
			class="bg-light-primary dark:bg-dark-primary rounded-lg full:flex full:flex-col hidden justify-start items-center py-1 px-1 w-full h-full"
		>
			<!-- Pokemon Sprite -->
			<div
				v-if="showSprite"
				class="bg-light-primary dark:bg-dark-primary rounded-lg flex justify-left items-left w-full h-full"
			>
				<Spinner v-if="!spriteSrc" />
				<img
					v-else
					class="rendering-pixelated"
					:src="spriteSrc"
					:title="data.name + (data.shiny ? ' (Shiny)' : '')"
				/>
			
				<!-- Name / Shiny -->
				<div
					class="text-base flex justify-center items-center text-center content-center"
				>
					<!-- Name -->
					<span class="mr-1 text-s mb-1">{{ data.name }}</span>

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
				<div class="text-base flex justify-center items-center text-center w-full my-1">
					<span class="text-xs">Lvl: {{ data.level }} </span>
					<!-- Ability -->
					<span class="text-base flex items-center mb-1">
						<Icon
							name="icon-park-solid:fire"
							class="h-4 text-light-tertiary dark:text-dark-tertiary"
						/>
						<span class="text-xs ml-1"> {{ data.ability }} </span>
					</span>
					<!-- Held Item -->
					<span
						v-if="data.item.name != 'None'"
						class="text-base flex items-center mb-1"
					>
						<Icon
							name="mdi:sack"
							class="h-4 text-light-tertiary dark:text-dark-tertiary"
						/>
						<span class="text-xs ml-1"> {{ data.item.name }}</span>
					</span>
				</div>
			</div>
			<!-- IV Sum -->
			<div class="flex flex-col items-center justify-center text-center text-xs w-full my-1">
			
				<span class="mb-1">IV Sum: {{ data.IVSum }}</span>
				<div class="bg-light-tertiary dark:bg-dark-tertiary rounded-full justify-center items-center w-[75%] h-2">
					<div
						class="bg-light-accent dark:bg-dark-accent rounded-full h-2"
						:style="'width: '+ Math.ceil((data.IVSum/186)*100) + '%'"
					></div>
				</div>
			</div>

			<!-- Move box -->
			<div
				v-if="showExtraInfo"
				class="bg-light-secondary dark:bg-dark-secondary rounded-md p-1"
			>
				<div class="mb-1">
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
							<span class="mx-5"></span>
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
	</div>
</template>
