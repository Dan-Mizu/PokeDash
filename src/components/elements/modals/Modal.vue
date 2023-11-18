<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		open: boolean;
		showFooter?: boolean;
	}>(),
	{
		showFooter: true,
	}
);

// sync local open state to parent
const isOpen = ref(props.open);
watch(
	() => props.open,
	() => (isOpen.value = props.open)
);
</script>

<template>
	<div>
		<UModal
			v-model="isOpen"
			@close="$emit('closeModal')"
			:ui="{
				container: 'flex items-center justify-center',
				base: '',
				overlay: {
					background: 'bg-black/40 dark:bg-black/40',
				},
			}"
		>
			<UCard
				:ui="{
					base: 'overflow-hidden p-5',
					ring: '',
					divide: '',
					background: 'bg-light-primary dark:bg-dark-primary',
					body: { base: 'text-center' },
					header: {
						base: 'text-center',
						padding: '',
					},
					footer: {
						base: 'text-center',
						padding: '',
					},
				}"
			>
				<!-- Modal Header -->
				<template #header>
					<div class="flex items-center justify-center relative">
						<!-- Header Content -->
						<slot class="flex float-none" name="header" />

						<!-- Close Button -->
						<div class="-my-1 ml-5 absolute right-0">
							<IconButton
								icon="i-heroicons-x-mark-20-solid"
								@clickEvent="$emit('closeModal')"
							/>
						</div>
					</div>
				</template>

				<!-- Modal Body -->
				<slot />

				<!-- Modal Footer -->
				<template #footer v-if="showFooter">
					<slot name="footer" />
				</template>
			</UCard>
		</UModal>
	</div>
</template>
