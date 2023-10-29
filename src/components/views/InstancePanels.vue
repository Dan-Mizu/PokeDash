<script setup lang="ts">
// get state
import useStore from "~/stores";
const store = useStore();

// individual panel style
const panelStyleBase =
	"bg-light-secondary dark:bg-dark-secondary px-2 py-1 mx-2 rounded-md flex flex-1 items-center justify-center";
const panelStyle = [
	panelStyleBase,
	"flex-[1.1] " + panelStyleBase,
	panelStyleBase,
	panelStyleBase,
	panelStyleBase,
];
</script>

<template>
	<div class="mt-5 w-[90%] flex justify-center">
		<ul class="overflow-auto my-3 w-screen scrollbar-hidden">
			<li class="flex justify-center mb-3">
				<!-- Trainer Info -->
				<div :class="panelStyle[0]">
					<h1>Trainer</h1>
				</div>

				<!-- Team Info -->
				<div :class="panelStyle[1]">
					<h1>Team</h1>
				</div>

				<!-- Encounter Info -->
				<div :class="panelStyle[2]">
					<h1>Encounter Info</h1>
				</div>

				<!-- Encounter Log -->
				<div :class="panelStyle[3]">
					<h1>Encounter Log</h1>
				</div>

				<!-- Stats -->
				<div :class="panelStyle[4]">
					<h1>Stats</h1>
				</div>
			</li>
			<li
				v-for="(_apiURL, index) in store.instances"
				class="flex justify-center mb-3"
			>
				<InstancePanel :panelStyle="panelStyle" :instanceID="index" />
			</li>
		</ul>
	</div>
</template>