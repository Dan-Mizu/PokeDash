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
	const input = String(inputComponent.value.input);

	// check if instance already exists
	if (store.instances.map((instance) => instance.apiURL).includes(input)) {
		console.log("already exists");
	}
	// add instance
	else {
		// add instance to instance reference list
		store.instances.push({
			apiURL: input,
			dataIndex: store.instanceData.length,
		} as IInstanceReference);

		// queue instance api fetch
		store
			.fetchAllInstanceEndpointData(input)
			.then(
				(response: IInstanceData | undefined | null) =>
					(store.instanceData[
						store.instances[store.instances.length - 1].dataIndex
					] = response as IInstanceData)
			);

		// update lastFetched value
		store.instances[store.instances.length - 1].lastFetched = Date.now();

		// update lastFetchedEndpoint value
		store.instances[store.instances.length - 1].lastFetchedEndpoint = {
			trainer: undefined,
			items: undefined,
			party: undefined,
			encounter_log: undefined,
			shiny_log: undefined,
			encounter_rate: undefined,
			stats: undefined,
			emulator: undefined,
		};
		for (const endpoint in store.instanceData[
			store.instances[store.instances.length - 1].dataIndex
		] as IInstanceData)
			(
				store.instances[store.instances.length - 1]
					.lastFetchedEndpoint as CreateMutable<TInstanceEndpointLastFetched>
			)[endpoint as TInstanceEndpoint] = Date.now();
	}
};
</script>

<template>
	<Modal :open="open" @closeModal="$emit('closeModal')">
		<!-- Header -->
		<template #header>
			<h3 class="text-base font-semibold">Add Instance API</h3>
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
				class="flex float-right font-bold bg-light-accent dark:bg-dark-accent"
				@click="
					() => {
						// close modal
						$emit('closeModal');

						// submit input
						submit();
					}
				"
				>Add</UButton
			>
		</template>
	</Modal>
</template>
