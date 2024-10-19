document.addEventListener('DOMContentLoaded', function () {
    // Define colors for each evaluation
    const chartColors = {
        fontSize: '#27ae60',        // Green for Font Size
        fontStyle: '#3498db',       // Blue for Font Style
        colorContrast: '#f39c12',   // Yellow for Color Contrast
        logo: '#e74c3c',            // Red for Logo
        good: '#27ae60',            // Green for Good
        average: '#f39c12',         // Yellow for Average
        poor: '#e74c3c'             // Red for Poor
    };

    // Data for each evaluation criteria
    const evaluationData = {
        fontSize: 100,
        fontStyle: 92,
        colorContrast: 80,
        logo: 71
    };

    // Overall Poster Score Data
    const overallScoreData = [98, 2, 0]; // Good: 98%, Average: 2%, Poor: 0%

    // ================================
    // Function to create a Doughnut (Pie) Chart
    // ================================
    function createPercentagePieChart(chartId, percentage, color) {
        const ctx = document.getElementById(chartId).getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percentage, 100 - percentage], // Data for chart: percentage vs remaining
                    backgroundColor: [color, '#3a3a3a'], // Main color and background color
                    borderWidth: 2                      // Set border width
                }]
            },
            options: {
                responsive: true,
                animation: {
                    animateScale: true,                 // Animation effect for chart scaling
                    duration: 1500                      // Animation duration
                },
                plugins: {
                    legend: { display: false },          // Disable legend for individual pie charts
                    tooltip: { enabled: false },         // Disable tooltips
                    datalabels: {
                        display: true,
                        color: '#fff',
                        font: { size: 18 },
                        formatter: (value) => `${value}%` // Display percentage inside chart
                    }
                },
                cutout: '75%'                           // Create a hollow center for a clean look
            }
        });
    }

    // ================================
    // Function to create the Overall Poster Score Pie Chart
    // ================================
    function createOverallScoreChart() {
        const ctx = document.getElementById('overallScorePie').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Good', 'Average', 'Poor'],    // Labels for overall score chart
                datasets: [{
                    data: overallScoreData,              // Data values for Good, Average, Poor
                    backgroundColor: [
                        chartColors.good,               // Green for Good
                        chartColors.average,            // Yellow for Average
                        chartColors.poor                // Red for Poor
                    ],
                    borderColor: '#ffffff',             // White border color
                    borderWidth: 2                      // Set border width
                }]
            },
            options: {
                responsive: true,
                animation: {
                    animateScale: true,                 // Add scaling animation
                    duration: 1500                      // Animation duration
                },
                plugins: {
                    legend: {
                        display: false,                 // Disable the Chart.js default legend
                    }
                },
                cutout: '70%',                           // Hollow center for better visual focus
                maintainAspectRatio: false               // Ensure the chart adapts well to different screen sizes
            }
        });
    }

    // ================================
    // Function to create a Bar Chart
    // ================================
    function createBarChart(chartId, labels, data, backgroundColors) {
        const ctx = document.getElementById(chartId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,                          // Labels for the bar chart
                datasets: [{
                    label: 'Evaluation Scores',          // Dataset label
                    data: data,                          // Data values for the chart
                    backgroundColor: backgroundColors,   // Colors for each bar
                    borderColor: '#ffffff',              // Set border color
                    borderWidth: 2                       // Set border width
                }]
            },
            options: {
                responsive: true,
                animation: {
                    animateScale: true,
                    duration: 1500                       // Animation duration for bar chart
                },
                scales: {
                    y: {
                        beginAtZero: true,               // Start y-axis from zero
                        ticks: { color: '#ffffff' },     // Y-axis tick color
                        grid: { color: 'rgba(255, 255, 255, 0.1)' } // Y-axis grid color
                    },
                    x: {
                        ticks: { color: '#ffffff' },     // X-axis tick color
                        grid: { color: 'rgba(255, 255, 255, 0.1)' } // X-axis grid color
                    }
                },
                plugins: {
                    legend: { display: false }           // Disable legend for bar chart
                }
            }
        });
    }

    // ================================
    // Call functions to create individual charts
    // ================================

    // Create evaluation pie charts
    createPercentagePieChart('pieChartFontSize', evaluationData.fontSize, chartColors.fontSize);
    createPercentagePieChart('pieChartFontStyle', evaluationData.fontStyle, chartColors.fontStyle);
    createPercentagePieChart('pieChartColorContrast', evaluationData.colorContrast, chartColors.colorContrast);
    createPercentagePieChart('pieChartLogo', evaluationData.logo, chartColors.logo);

    // Create the overall score chart
    createOverallScoreChart();

    // Create the bar chart for evaluations
    const overallScores = [evaluationData.fontSize, evaluationData.fontStyle, evaluationData.colorContrast, evaluationData.logo];
    createBarChart('barChart', ['Font Size', 'Font Style', 'Color Contrast', 'Logo'], overallScores, [chartColors.fontSize, chartColors.fontStyle, chartColors.colorContrast, chartColors.logo]);

    // ================================
    // Download Report Button Functionality
    // ================================
    document.getElementById('downloadBtn').addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = 'report.pdf';                        // Placeholder for the report file
        link.download = 'PosterEvaluationReport.pdf';    // Download filename
        document.body.appendChild(link);
        link.click();                                    // Trigger the download
        document.body.removeChild(link);                 // Remove the link after download

        // Display a confirmation message
        alert('Your report has been downloaded successfully!');
    });
});
