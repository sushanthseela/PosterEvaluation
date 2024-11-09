// Function to provide audio feedback using SpeechSynthesis
function speak(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Redirect to Home Page with audio feedback
function redirectToHome() {
    speak("Redirecting to home page.");
    window.location.href = "upload-poster.html"; // Change this URL if your home page is different
}

// Redirect to About Page with audio feedback
function redirectToAboutpage() {
    speak("Redirecting to about page.");
    window.location.href = "About page.html"; // Change this URL if your about page is different
}

// Retrieve the uploaded poster data from localStorage and display it
window.onload = function () {
    const uploadedPosterData = localStorage.getItem('uploadedPoster');
    const posterImage = document.querySelector('.poster-img'); // Target the image element

    if (uploadedPosterData) {
        posterImage.src = uploadedPosterData;
        posterImage.style.display = 'block';
        speak("Poster loaded successfully. Displaying poster.");
    } else {
        alert("No uploaded poster found.");
        speak("No uploaded poster found.");
    }
};

// Function to start the process with a progress bar and audio feedback
function startProcess() {
    // Show the progress bar
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');

    // Make the progress container visible
    progressContainer.style.visibility = 'visible';
    progressContainer.classList.remove('hidden'); // Remove hidden class if it exists

    // Start audio feedback for process start
    speak("Starting process. Please wait.");

    let progress = 0;
    const interval = setInterval(function () {
        if (progress < 100) {
            progress += 10;
            progressBar.style.width = progress + '%';
        } else {
            clearInterval(interval);
            speak("Process complete. Redirecting to dashboard.");
            // After progress bar completes, redirect to the dashboard page
            window.location.href = 'dashboard.html'; // Change this to your actual dashboard page
        }
    }, 300); // Adjust the interval timing as needed
}

// Dark/Light Mode Toggle with audio feedback
const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Change button text and announce mode change
    themeButton.textContent = isDarkMode ? '☀️' : '🌙';
    speak(isDarkMode ? "Dark mode enabled." : "Light mode enabled.");
});
