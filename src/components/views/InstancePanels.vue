<script setup lang="ts">
let instances: string[] = [];
if (useRuntimeConfig().public.defaultAPI)
	instances.push(useRuntimeConfig().public.defaultAPI);
</script>

<template>
	<ul class="overflow-auto my-3 w-screen scrollbar-hidden">
		<li
			v-for="(apiURL, _index) in instances"
			class="flex justify-center mb-3"
		>
			<InstancePanel :apiURL="apiURL" />
		</li>
	</ul>
</template>
