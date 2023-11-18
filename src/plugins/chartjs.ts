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
export default defineNuxtPlugin(() => {
	Chart.register(
		Title,
		Tooltip,
		Legend,
		Filler,
		RadialLinearScale,
		PointElement,
		LineElement
	);
});
