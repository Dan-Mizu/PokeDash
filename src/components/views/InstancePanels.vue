<script setup lang="ts">
// props
const props = withDefaults(
	defineProps<{
		instances: TInstanceReferences | IInstanceReference;
		instanceData: TInstanceData | IInstanceData;
		allowInstanceManipulation?: boolean;
	}>(),
	{ allowInstanceManipulation: true }
);

// individual panel style
const columnStyleBase =
	"bg-light-secondary dark:bg-dark-secondary px-2 py-1 mx-2 rounded-md flex flex-1 items-center justify-center";
const columnStyle = [
	"flex-[0.06] " + columnStyleBase,
	"flex-[0.3] " + columnStyleBase,
	"full:flex-[1] " + columnStyleBase,
	"flex-[0.5] " + columnStyleBase,
	"flex-[0.5] " + columnStyleBase,
];
const panelStyleBase = " h-[38vh]";
let panelStyle: string[] = [];
for (let i = 0; i < columnStyle.length; i++) {
	panelStyle[i] = columnStyle[i] + " " + panelStyleBase
}

// Add Instance Modal handling
const modalAddInstanceOpen = ref(false);
</script>

<template>
	<!-- Buttons -->
	<div class="flex flex-col m-4 absolute top-0 right-0">
		<ThemeButton />
		<span v-if="props.allowInstanceManipulation">
			<div class="mb-2"></div>
			<IconButton
				@clickEvent="() => (modalAddInstanceOpen = true)"
				icon="i-material-symbols-add-box-rounded"
			/>
		</span>
	</div>

	<!-- Content -->
	<div class="mt-5 w-[90%] flex justify-center">
		<ul class="overflow-auto my-3 w-full scrollbar-hidden">
			<!-- Titles -->
			<li class="flex justify-center mb-3">
				<!-- Sidebar Spacing -->
				<div
					:class="[
						'truncate text-clip bg-transparent dark:bg-transparent',
						columnStyle[0],
					]"
				></div>

				<!-- Trainer Info -->
				<div :class="['truncate text-clip', columnStyle[1]]">
					<h1 class="font-bold">Trainer</h1>
				</div>

				<!-- Team Info -->
				<div :class="['truncate text-clip', columnStyle[2]]">
					<h1 class="font-bold">Team</h1>
				</div>

				<!-- Encounter Info -->
				<div :class="['truncate text-clip', columnStyle[3]]">
					<h1 class="font-bold">Encounters</h1>
				</div>

				<!-- Stats -->
				<div :class="['truncate text-clip', columnStyle[4]]">
					<h1 class="font-bold">Stats</h1>
				</div>
			</li>

			<!-- Multiple Instances -->
			<li
				v-if="props.instances instanceof Array"
				v-for="(_apiURL, index) in props.instances"
				class="flex justify-center mb-3"
			>
				<InstancePanel
					:panelStyle="panelStyle"
					:instanceData="(props.instanceData as TInstanceData)[props.instances[index].dataIndex]"
				/>
			</li>

			<!-- Single Instance -->
			<li v-else class="flex justify-center mb-3">
				<InstancePanel
					:panelStyle="panelStyle"
					:instanceData="(props.instanceData as IInstanceData)"
				/>
			</li>
		</ul>

		<!-- Add Instance Modal -->
		<AddInstanceModal
			:open="modalAddInstanceOpen"
			@closeModal="modalAddInstanceOpen = false"
		/>
	</div>
</template>
