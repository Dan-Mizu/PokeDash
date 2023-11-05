<script setup lang="ts">
const props = defineProps<{
	panelStyle: string;
}>();
// Add Instance Modal handling
const modalDetailedStatsOpen = ref(false);
</script>

<template>
	<div :class="panelStyle">
		<div class="flex flex-col m-4">
			<DetailedStatsButton />
					<span v-if="props.allowInstanceManipulation">
						<div class="mb-2">
							<IconButton	@clickEvent="() => (modalDetailedStatsOpen = true)"	icon="i-material-symbols-add-box-rounded"/>
						</div>
					</span>
			<DetailedStatsModal	:open="modalDetailedStatsOpen" @closeModal="modalDetailedStatsOpen = false"/>
		</div>
	</div>
</template>
