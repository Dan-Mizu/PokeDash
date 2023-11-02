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
				<span class="mr-2 text-lg font-bold flex items-center">
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
				class="flex flex-row bg-light-primary dark:bg-dark-primary rounded-md py-1 px-2 text-xs"
			>
				<div class="flex-grow text-left">TID: {{ data.tid }}</div>
				<div class="flex-grow text-right">SID: {{ data.sid }}</div>
			</div>

			<!-- Location -->
			<div
				class="bg-light-primary dark:bg-dark-primary rounded-md p-1 mb-2 text-sm text-center my-2 py-2 px-3"
			>
				<p class="whitespace-pre-wrap">
					Currently in
					<span class="font-bold inline-block">
						{{
							data.map_name
								.replaceAll("_", " ")
								.toLowerCase()
								.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
									letter.toUpperCase()
								)
						}}
					</span>
					<span v-if="data.on_bike">, on a bike.</span>
					<span v-else>.</span>
				</p>
				<!-- Coords -->
				<span
					class="flex justify-center items-center text-center mt-2 text-xs"
				>
					(X: {{ data.coords[0] }}, Y: {{ data.coords[1] }})
				</span>
			</div>
		</div>
	</div>
</template>
