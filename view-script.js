function startProcess() {
    // Show the progress bar
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    progressContainer.style.visibility = 'visible';

    let progress = 0;
    const interval = setInterval(function () {
        if (progress < 100) {
            progress += 10;
            progressBar.style.width = progress + '%';
        } else {
            clearInterval(interval);
            // After progress bar completes, redirect to the dashboard page
            window.location.href = 'dashboard.html';  // Change this to your actual dashboard page
        }
    }, 300);  // Adjust the interval timing as needed
}

// Dark/Light Mode Toggle
const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
