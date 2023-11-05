<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	statsData: IStats | undefined;
	shinyData: TShinyLog | undefined;
}>();

// modal visibility
const modalDetailedStatsOpen = ref(false);
const modalShinyDexOpen = ref(false);
</script>

<template>
	<div :class="panelStyle">
		<div
			class="flex flex-col justify-center items-center w-full h-full py-2"
		>
			<!-- Top Buttons -->
			<div
				class="flex flex-col flex-1 justify-start items-center gap-2 w-full"
			>
				<!-- detailed stats modal button  -->
				<IconButton
					v-if="statsData"
					@clickEvent="() => (modalDetailedStatsOpen = true)"
					icon="i-material-symbols-query-stats-rounded"
				/>

				<!-- shiny dex modal button  -->
				<IconButton
					v-if="shinyData"
					@clickEvent="() => (modalShinyDexOpen = true)"
					icon="i-fluent-arrow-trending-sparkle-24-filled"
				/>
			</div>

			<!-- Middle Buttons -->
			<div
				class="flex flex-col flex-1 justify-center items-center gap-2 w-full"
			></div>

			<!-- Bottom Buttons -->
			<div
				class="flex flex-col flex-1 justify-end items-center gap-2 w-full"
			></div>
		</div>
	</div>

	<!-- Detailed Stats Modal -->
	<DetailedStatsModal
		v-if="statsData"
		:open="modalDetailedStatsOpen"
		@closeModal="modalDetailedStatsOpen = false"
		:stats-data="statsData"
	/>

	<!-- Shiny Dex Modal -->
	<ShinyDexModal
		v-if="shinyData"
		:open="modalShinyDexOpen"
		@closeModal="modalShinyDexOpen = false"
		:shiny-data="shinyData"
	/>
</template>
