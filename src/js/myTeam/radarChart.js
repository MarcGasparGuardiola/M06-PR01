const data = {
    labels: [
        '% On shoots',
        '% Passes',
        '% Key passes',
        '% Won duels',
        '% success dribbles',
    ],
    datasets: [{
        label: 'Radar Chart',
        data: [25, 75, 80, 10, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
    },
    ],
};

const config = {
    type: 'radar',
    data,
    options: {
        elements: {
            line: {
                borderWidth: 3,
            },
        },
        scales: {
            r: {
                max: 100, // Max number in axis (100%)
            },
        },
    },
};

let radarChart = null;

export function destroyChart() {
    try {
        radarChart.destroy();
    } catch (error) {
        console.log(error);
    }
}

export function createRadarChart(dataPlayer) {
    destroyChart();
    data.datasets[0].data = dataPlayer;
    const chartCanvas = document.getElementById('playerRadarChart');

    radarChart = new Chart(chartCanvas, config);
}
