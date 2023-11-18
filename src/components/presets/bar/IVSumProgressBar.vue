<script setup lang="ts">
import { computed } from "@vue/reactivity";

const props = defineProps<{
	IVSum: number;
}>();

// max IV sum
const IVSumMax = 186;

// calculate progress of IV sum
const progress = Math.ceil((props.IVSum / IVSumMax) * 100);

// get color of bar
const progressDetails = computed(() => {
	switch (true) {
		// Perfect
		case progress == 100:
			return {
				color: "blue",
				text: "Perfect IVs!",
			};
		// Bad
		case progress < 50:
			return {
				color: "red",
			};
		// Average
		case progress < 70:
			return {
				color: "yellow",
			};
		// Great
		case progress < 100:
			return {
				color: "green",
			};
		default:
			return {
				color: "red",
			};
	}
});
</script>

<template>
	<!-- Bar -->
	<UProgress
		:ui="{
			strategy: 'override',
			progress: {
				track: 'bg-light-tertiary dark:bg-dark-tertiary',
			},
		}"
		:value="IVSum"
		:max="IVSumMax"
		:color="progressDetails.color"
	>
		<!-- Indicator -->
		<template #indicator>
			<div class="text-xs font-bold">
				<span class="text-light-text dark:text-dark-text">{{
					progressDetails?.text
						? progressDetails.text
						: "IV Sum: " + IVSum
				}}</span>
			</div>
		</template>
	</UProgress>
</template>
