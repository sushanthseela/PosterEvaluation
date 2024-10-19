document.getElementById('posterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('poster-upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');

        progressContainer.style.visibility = 'visible';

        reader.onloadstart = function () {
            progressBar.style.width = '0%';
        };

        reader.onprogress = function (event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progressBar.style.width = percentComplete + '%';
            }
        };

        reader.onload = function (event) {
            const posterData = event.target.result;

            // Save poster data in localStorage
            localStorage.setItem('uploadedPoster', posterData);

            // Redirect to view-poster.html
            setTimeout(() => {
                window.location.href = 'view-poster.html';
            }, 500); // Wait for 0.5 seconds before redirecting
        };

        reader.readAsDataURL(file);
    }
});

// Function to update the file name display
function updateFileName() {
    const fileInput = document.getElementById('poster-upload');
    const fileNameDisplay = document.getElementById('file-name');

    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = 'No file chosen';
    }
}

// Dark/Light Mode Toggle
const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
