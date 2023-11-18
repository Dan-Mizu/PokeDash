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
				color: "perfect",
				text: "Perfect IVs!",
			};
		// Bad
		case progress < 50:
			return {
				color: "bad",
			};
		// Average
		case progress < 70:
			return {
				color: "average",
			};
		// Great
		case progress < 100:
			return {
				color: "great",
			};
		default:
			return {
				color: "bad",
			};
	}
});
</script>

<template>
	<!-- Bar -->
	<UProgress
		:ui="{
			progress: {
				track: 'bg-light-tertiary dark:bg-dark-tertiary',
				color:
					'text-' +
					progressDetails.color +
					' dark:text-' +
					progressDetails.color,
			},
		}"
		:value="IVSum"
		:max="IVSumMax"
	>
		<!-- Indicator -->
		<template #indicator>
			<div class="text-xs font-bold">
				<span
					:class="[
						progress === 100
							? 'text-' + progressDetails.color
							: 'text-light-text dark:text-dark-text',
					]"
					>{{
						progressDetails?.text
							? progressDetails.text
							: "IV Sum: " + IVSum
					}}</span
				>
			</div>
		</template>
	</UProgress>
</template>
