<script lang="ts" setup>
import { Radar } from "vue-chartjs";
const chartData = ref({
	labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. Atk"],
	datasets: [
		{
			// data
			data: [20, 6, 13, 30, 19, 31],

			// background
			fill: true,
			tension: 0.1,
			backgroundColor: "rgba(0, 191, 255, 0.7)",

			// lines
			borderWidth: 0,

			// points
			pointBorderWidth: 0,
			pointBackgroundColor: "rgb(0, 0, 0, 0)",

			// point labels
			datalabels: {
				labels: {
					value: {
						color: "white",
					},
				},
			},
		},
	],
});
const chartOptions = ref({
	plugins: { legend: { display: false }, tooltip: { enabled: false } },
	scales: {
		r: {
			suggestedMin: 0,
			suggestedMax: 31,
			// https://www.chartjs.org/docs/latest/axes/radial/
			angleLines: {
				color: "gray",
			},
			grid: {
				color: "white",
			},
			pointLabels: {
				color: "white",
				font: {
					weight: "800",
				},
			},
			ticks: {
				stepSize: 31,
				display: false,
			},
		},
	},
	responsive: true,
	maintainAspectRatio: false,
});
</script>
<template>
	<div class="m-10">
		<Radar :data="chartData" :options="chartOptions" />
	</div>
</template>
