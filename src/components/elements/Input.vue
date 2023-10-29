<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		icon?: string;
		placeholder?: string;
		loading?: boolean;
		loadingPlaceholder?: string;
	}>(),
	{
		loading: false,
	}
);

// input
const input: Ref<string> = ref("");
defineExpose({
	input,
});
</script>

<template>
	<UInput
		v-model="input"
		name="input"
		autocomplete="off"
		:placeholder="
			props.loading
				? props.loadingPlaceholder
					? props.loadingPlaceholder
					: 'Searching'
				: props.placeholder
				? props.placeholder
				: 'Type Here'
		"
		:icon="props.icon ? props.icon : 'i-tabler-search'"
		:loading="props.loading"
		loading-icon="i-tabler-loader-2"
		size="xl"
		:ui="{
			leading: {
				padding: {
					'2xs': 'ps-6',
					xs: 'ps-7',
					sm: 'ps-7',
					md: 'ps-7',
					lg: 'ps-8',
					xl: 'ps-12',
				},
			},
			trailing: {
				padding: {
					'2xs': 'pe-6',
					xs: 'pe-7',
					sm: 'pe-7',
					md: 'pe-7',
					lg: 'pe-8',
					xl: 'pe-9',
				},
			},
			color: {
				white: {
					outline:
						'shadow-sm bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text ring-0 focus:ring-0',
				},
			},
			placeholder:
				'placeholder-light-text-placeholder dark:placeholder-dark-text-placeholder',
			icon: {
				base: 'flex-shrink-0 text-light-text-placeholder dark:text-dark-text-placeholder',
				trailing: { pointer: '' },
			},
		}"
	>
		<!-- Remove Current Input Button -->
		<template #trailing>
			<IconButton
				v-show="input !== ''"
				icon="i-heroicons-x-mark-20-solid"
				@clickEvent="() => (input = '')"
			/>
		</template>
	</UInput>
</template>
