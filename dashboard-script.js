document.addEventListener('DOMContentLoaded', function () {
    // Common options for Pie Charts
    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#ffffff',
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const currentValue = dataset.data[tooltipItem.dataIndex];
                        const total = dataset.data.reduce((acc, value) => acc + value, 0);
                        const percentage = Math.round((currentValue / total) * 100);
                        return `${tooltipItem.label}: ${percentage}% (${currentValue})`;
                    }
                }
            }
        }
    };

    // Function to create a pie chart
    function createPieChart(chartId, labels, data, colors) {
        const ctx = document.getElementById(chartId).getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: pieChartOptions
        });
    }

    // Pie chart data and configurations (only keeping Font Size, Font Style, Color Contrast, and Logo)
    const pieChartData = [
        {
            chartId: 'pieChartFontSize',
            title: 'Font Size Evaluation',
            data: [100, 0, 0],
            colors: ['#27ae60', '#f39c12', '#e74c3c']
        },
        {
            chartId: 'pieChartFontStyle',
            title: 'Font Style Evaluation',
            data: [92, 8, 0],
            colors: ['#27ae60', '#f39c12', '#e74c3c']
        },
        {
            chartId: 'pieChartColorContrast',
            title: 'Color Contrast Evaluation',
            data: [80, 20, 0],
            colors: ['#27ae60', '#f39c12', '#e74c3c']
        },
        {
            chartId: 'pieChartLogo',
            title: 'Logo Evaluation',
            data: [71, 29, 0],
            colors: ['#27ae60', '#f39c12', '#e74c3c']
        }
    ];

    // Creating pie charts for each evaluation
    pieChartData.forEach(chartConfig => {
        createPieChart(chartConfig.chartId, ['Good', 'Average', 'Poor'], chartConfig.data, chartConfig.colors);
    });

    // Bar Chart - Overall Evaluation (for Font Size, Font Style, Color Contrast, Logo)
    const barChartCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: ['Font Size', 'Font Style', 'Color Contrast', 'Logo'],
            datasets: [{
                label: 'Evaluation Scores',
                data: [100, 92, 80, 71],
                backgroundColor: ['#27ae60', '#f39c12', '#e74c3c', '#8e44ad'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            return `${tooltipItem.label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });

    // Overall Poster Score Display
    const scoreElement = document.getElementById('posterScore');
    scoreElement.innerHTML = '<h1>98%</h1><p>Overall Poster Score</p>';

    // Download Report Placeholder
    document.querySelector('.download-btn').addEventListener('click', () => {
        alert('Report downloaded!'); // Replace this with your report download logic
    });
});
