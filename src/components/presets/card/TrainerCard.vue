<script setup lang="ts">
// props
const props = defineProps<{
	panelStyle: string;
	data: ITrainer;
}>();
</script>

<template>
	<div :class="panelStyle">
		<div class="flex flex-col w-full p-3">
			<!-- Character Data -->
			<div class="flex flex-row justify-center mb-2">
				<!-- Name -->
				<span class="mr-2 text-lg text-bold flex items-center">
					{{ data.name }}
				</span>

				<!-- Gender Icon -->
				<div
					class="bg-light-primary dark:bg-dark-primary rounded-md flex justify-center items-center p-1"
				>
					<Icon
						v-if="data.gender === 'boy'"
						name="material-symbols:male"
						class="h-5 w-auto text-light-tertiary dark:text-dark-tertiary"
					/>
					<Icon
						v-else
						name="material-symbols:female"
						class="h-5 w-auto text-light-tertiary dark:text-dark-tertiary"
					/>
				</div>
			</div>

			<!-- IDs -->
			<div
				class="flex flex-row bg-light-primary dark:bg-dark-primary rounded-md p-1 mb-2"
			>
				<div class="flex-grow text-left">TID: {{ data.tid }}</div>
				<div class="flex-grow text-right">SID: {{ data.sid }}</div>
			</div>

			<!-- Map -->
			<div
				class="flex flex-row bg-light-primary dark:bg-dark-primary rounded-md p-1 mb-2"
			>
				Current Map: {{ data.map_name }}
			</div>

			<!-- Current Coords -->
			<div
				class="flex flex-row bg-light-primary dark:bg-dark-primary rounded-md p-1 mb-2"
			>
				Current coords: {{ data.coords }}
			</div>

			<!-- Bike -->
			<div
				class="flex flex-row bg-light-primary dark:bg-dark-primary rounded-md p-1"
			>
				On Bike: {{ data.on_bike }}
			</div>
		</div>
	</div>
</template>
