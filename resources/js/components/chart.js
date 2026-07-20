import Chart from "chart.js/auto";

let economyChart = null;

export function renderEconomyChart(canvasId, labels, values) {

    const canvas = document.getElementById(canvasId);

    if (!canvas) {
        return;
    }

    if (economyChart) {
        economyChart.destroy();
    }

    economyChart = new Chart(canvas, {

        type: "line",

        data: {

            labels,

            datasets: [

                {

                    label: "GDP",

                    data: values,

                    tension: 0.35,

                    fill: true

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}