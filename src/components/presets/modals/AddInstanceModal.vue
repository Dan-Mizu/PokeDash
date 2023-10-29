<script setup lang="ts">
// get state
import useStore from "~/stores";
const store = useStore();

const props = defineProps<{
	open: boolean;
}>();

// get input
const inputComponent = ref();

// submit
const submit = () => {
	// get input
	const input = inputComponent.value.input;

	// check if instance already exists
	if (store.instances.includes(input)) {
		console.log("already exists");
	}
	// add instance
	else {
		// add instance api url to list
		store.instances.push(input);

		// queue instance api fetch
	}
};
</script>

<template>
	<Modal :open="open" @closeModal="$emit('closeModal')">
		<!-- Header -->
		<template #header>
			<h3
				class="text-base font-semibold text-light-text dark:text-dark-text"
			>
				Add Instance API
			</h3>
		</template>

		<!-- Body -->
		<template #default>
			<!-- Channel Search Input -->
			<Input
				icon="i-tabler-api"
				placeholder="<IP>:<Port> or <Domain>"
				ref="inputComponent"
			/>
		</template>

		<!-- Footer -->
		<template #footer>
			<UButton
				class="flex float-right font-bold text-light-text dark:text-dark-text bg-light-accent dark:bg-dark-accent"
				@click="
					() => {
						// submit input
						submit();

						// close modal
						$emit('closeModal');
					}
				"
				>Add</UButton
			>
		</template>
	</Modal>
</template>
