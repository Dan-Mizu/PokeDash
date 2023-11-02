<script setup lang="ts">
// get state
import useStore from "~/stores";
const store = useStore();

// individual panel style
const panelStyleBase =
	"bg-light-secondary dark:bg-dark-secondary px-2 py-1 mx-2 rounded-md flex flex-1 items-center justify-center";
const panelStyle = [
	"flex-[0.06] " + panelStyleBase,
	"flex-[0.3] " + panelStyleBase,
	"full:flex-[1] " + panelStyleBase,
	"flex-[0.5] " + panelStyleBase,
	"flex-[0.5] " + panelStyleBase,
];

// Add Instance Modal handling
const modalAddInstanceOpen = ref(false);
</script>

<template>
	<!-- Buttons -->
	<div class="flex flex-col m-4 absolute top-0 right-0">
		<ThemeButton />
		<div class="mb-2"></div>
		<IconButton
			@clickEvent="() => (modalAddInstanceOpen = true)"
			icon="i-material-symbols-add-box-rounded"
		/>
	</div>

	<!-- Content -->
	<div class="mt-5 w-[90%] flex justify-center">
		<ul class="overflow-auto my-3 w-full scrollbar-hidden">
			<li class="flex justify-center mb-3">
				<!-- Sidebar Spacing -->
				<div
					:class="[
						'truncate text-clip bg-transparent dark:bg-transparent',
						panelStyle[0],
					]"
				></div>

				<!-- Trainer Info -->
				<div :class="['truncate text-clip', panelStyle[1]]">
					<h1 class="font-bold">Trainer</h1>
				</div>

				<!-- Team Info -->
				<div :class="['truncate text-clip', panelStyle[2]]">
					<h1 class="font-bold">Team</h1>
				</div>

				<!-- Encounter Info -->
				<div :class="['truncate text-clip', panelStyle[3]]">
					<h1 class="font-bold">Encounters</h1>
				</div>

				<!-- Stats -->
				<div :class="['truncate text-clip', panelStyle[4]]">
					<h1 class="font-bold">Stats</h1>
				</div>
			</li>
			<li
				v-for="(_apiURL, index) in store.instances"
				class="flex justify-center mb-3"
			>
				<InstancePanel :panelStyle="panelStyle" :instanceID="index" />
			</li>
		</ul>

		<!-- Add Instance Modal -->
		<AddInstanceModal
			:open="modalAddInstanceOpen"
			@closeModal="modalAddInstanceOpen = false"
		/>
	</div>
</template>
