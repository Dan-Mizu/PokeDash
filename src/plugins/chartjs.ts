import {
	Chart,
	Title,
	Tooltip,
	Legend,
	Filler,
	RadialLinearScale,
	PointElement,
	LineElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
export default defineNuxtPlugin(() => {
	Chart.register(
		Title,
		Tooltip,
		Legend,
		ChartDataLabels,
		Filler,
		RadialLinearScale,
		PointElement,
		LineElement
	);
});
