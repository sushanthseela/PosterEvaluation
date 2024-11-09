function redirectToHome() {
    window.location.href = "upload-poster.html"; // Change this URL if your home page is different
}
function redirectToAboutpage() {
    window.location.href = "About page.html"; // Change this URL if your home page is different
}
// Function to toggle dark mode and update chart colors
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const themeButton = document.getElementById("theme-button");
    themeButton.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";

    // Update chart colors for dark/light mode
    updateChartColors();
}

// Function to update chart colors based on the current theme
function updateChartColors() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    const textColor = isDarkMode ? "#ffffff" : "#090404"; // White in dark mode, black in light mode
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"; // Light grid color for contrast

    // Update all chart instances with the new color theme
    Chart.helpers.each(Chart.instances, function (chartInstance) {
        if (chartInstance) {
            // Update text color for legend, tooltips, and axis labels
            chartInstance.options.plugins.legend.labels.color = textColor;
            chartInstance.options.plugins.tooltip.titleColor = textColor;
            chartInstance.options.plugins.tooltip.bodyColor = textColor;

            if (chartInstance.options.scales) {
                chartInstance.options.scales.x.ticks.color = textColor; // x-axis label color
                chartInstance.options.scales.x.grid.color = gridColor; // x-axis grid color
                chartInstance.options.scales.y.ticks.color = textColor; // y-axis label color
                chartInstance.options.scales.y.grid.color = gridColor; // y-axis grid color
            }

            chartInstance.update();
        }
    });
}


// Function to filter displayed evaluation criteria based on selection
function filterEvaluation() {
    const selectedCriteria = document.getElementById('selectCriteria').value;
    const allCategories = document.querySelectorAll('.evaluation-category');

    allCategories.forEach(category => {
        category.style.display = selectedCriteria === 'all' || category.classList.contains(selectedCriteria)
            ? 'block'
            : 'none';
    });
}

// Function to toggle between pie and bar charts
function updateGraphDisplay() {
    const selectedGraph = document.getElementById("selectGraph").value;
    document.querySelectorAll(".bar-chart").forEach(chart => chart.style.display = selectedGraph === "barGraph" ? "block" : "none");
    document.querySelectorAll(".pie-chart").forEach(chart => chart.style.display = selectedGraph === "pieChart" ? "block" : "none");
}

// Function to create a simple, professional-looking Chart.js bar or doughnut chart
function createChart(elementId, type, labels, data, backgroundColor, label) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const isDarkMode = document.body.classList.contains("dark-mode");
    const textColor = isDarkMode ? "#ffffff" : "#090404";

    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                borderRadius: 5,
                barPercentage: 0.6 // Makes bars slightly narrower for a clean look
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: type === 'bar' ? {
                x: {
                    ticks: { color: textColor, font: { size: 12 } },
                    grid: { display: false } // Hide vertical grid lines
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: textColor, font: { size: 12 }, callback: value => value + "%" },
                    grid: { color: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }
                }
            } : {},
            plugins: {
                legend: { display: false }, // No legend for single dataset charts
                tooltip: {
                    callbacks: {
                        label: context => `${context.dataset.label}: ${context.raw}%`
                    },
                    backgroundColor: isDarkMode ? "#333" : "#fff",
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: isDarkMode ? "#555" : "#ddd",
                    borderWidth: 1
                }
            }
        }
    });
}


// Function to create a pie chart with color labels on top of each segment
function createPieChart(elementId, labels, data, backgroundColor, label) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const isDarkMode = document.body.classList.contains("dark-mode");
    const textColor = isDarkMode ? "#ffffff" : "#333333";

    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels, // Labels for each segment
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                hoverOffset: 10 // Adds a slight pop-out effect on hover
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right', // Legend to the right for visibility
                    labels: {
                        color: textColor, // Legend text color based on theme
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: isDarkMode ? "#333" : "#fff",
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: isDarkMode ? "#555" : "#ddd",
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    color: textColor, // Label color based on theme
                    formatter: (value, context) => {
                        // Display the label and percentage on the pie chart segment
                        const label = context.chart.data.labels[context.dataIndex];
                        const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}\n${percentage}%`;
                    },
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    anchor: 'center', // Position at the center of each segment
                    align: 'center'
                }
            }
        },
        plugins: [ChartDataLabels] // Register the datalabels plugin
    });
}



///graphs codes
document.addEventListener("DOMContentLoaded", function () {
const chartsData = [
    { id: 'logos', labels: ['Clear', 'Not Clear'], data: [80, 20], colors: ['#FF9F40', '#FF6384'], label: 'Logos' },
    { id: 'fontStyle', labels: ['Accessible', 'Inaccessible'], data: [90, 10], colors: ['#36A2EB', '#FF6384'], label: 'Font Style' },
    { id: 'fontSize', labels: ['Meets Standards', 'Too Small'], data: [88, 12], colors: ['#4BC0C0', '#FF6384'], label: 'Font Size' },
    { id: 'colorContrast', labels: ['Good Contrast', 'Poor Contrast'], data: [92, 8], colors: ['#9966FF', '#FF6384'], label: 'Color Contrast' },
    { id: 'PosterLayout', labels: ['Well Structured', 'Needs Improvement'], data: [92, 8], colors: ['#FF9F40', '#FF6384'], label: 'Poster Layout' },
    { id: 'hyperlinks', labels: ['Functional', 'Broken'], data: [95, 5], colors: ['#4CAF50', '#FF6384'], label: 'Hyperlinks' },
    { id: 'overall', labels: ['Good', 'Average', 'Poor'], data: [85, 10, 5], colors: ['#4CAF50', '#FFC107', '#FF6384'], label: 'Overall Poster Score' }
];

// Store chart instances for updating colors dynamically
const chartInstances = [];

chartsData.forEach(chart => {
    const pieChartId = `${chart.id}PieChart`; // Match exact ID in HTML
    const barChartId = `${chart.id}BarChart`;

    chartInstances.push(createChart(pieChartId, 'doughnut', chart.labels, chart.data, chart.colors, chart.label));
    chartInstances.push(createChart(barChartId, 'bar', chart.labels, chart.data, chart.colors, chart.label));
});

// Set initial graph display and filter criteria on load
updateGraphDisplay();
filterEvaluation();
});
// Function to download PDF report with chart data
document.getElementById("downloadReportBtn").addEventListener("click", downloadPDFReport);

function downloadPDFReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set title for the PDF
    doc.setFontSize(16);
    doc.text("Poster Evaluation Report", 10, 10);

    // Data to be included in the report
    const chartsData = [
        { label: 'Logos', data: { Clear: 80, "Not Clear": 20 } },
        { label: 'Font Style', data: { Accessible: 90, Inaccessible: 10 } },
        { label: 'Font Size', data: { "Meets Standards": 88, "Too Small": 12 } },
        { label: 'Color Contrast', data: { "Good Contrast": 92, "Poor Contrast": 8 } },
        { label: 'Poster Layout', data: { "Well Structured": 92, "Needs Improvement": 8 } },
        { label: 'Hyperlinks', data: { Functional: 95, Broken: 5 } },
        { label: 'Overall Poster Score', data: { Good: 85, Average: 10, Poor: 5 } }
    ];

    let yOffset = 20; // Starting Y position for content

    chartsData.forEach((chart, index) => {
        doc.setFontSize(14);
        doc.text(`${index + 1}. ${chart.label}`, 10, yOffset);
        yOffset += 8;

        Object.entries(chart.data).forEach(([key, value]) => {
            doc.setFontSize(12);
            doc.text(`- ${key}: ${value}%`, 15, yOffset);
            yOffset += 6;
        });

        yOffset += 10; // Add space between sections
    });

    // Save the PDF
    doc.save("Poster_Evaluation_Report.pdf");
}

