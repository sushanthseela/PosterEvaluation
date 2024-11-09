function redirectToHome() {
    window.location.href = "upload-poster.html"; // Change this URL if your home page is different
}
function redirectToAboutpage() {
    window.location.href = "About page.html"; // Change this URL if your home page is different
}

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

// Function to redirect to home page
function redirectToHome() {
    window.location.href = "upload-poster.html"; // Change this URL if your home page is different
}

// Event listener for form submission
document.getElementById('posterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('poster-upload');
    const file = fileInput.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');

        progressContainer.style.visibility = 'visible';

        reader.onloadstart = function () {
            progressBar.style.width = '0%';
            speak("poster uploaded successfully. Redirecting to view the poster. ");
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
            speak("Poster uploaded successfully. Redirecting to view the poster.");

            // Redirect to view-poster.html
            setTimeout(() => {
                window.location.href = 'view-poster.html';
            }, 500); // Wait for 0.5 seconds before redirecting
        };

        reader.readAsDataURL(file);
    } else {
        speak("Please select a valid image file to upload.");
        alert("Please select a valid image file to upload.");
    }
});

// Function to update the file name display with audio feedback
function updateFileName() {
    const fileInput = document.getElementById('poster-upload');
    const fileNameDisplay = document.getElementById('file-name');

    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileNameDisplay.textContent = fileName;
        speak(`File selected: ${fileName}`);
    } else {
        fileNameDisplay.textContent = 'No file chosen';
        speak("No file chosen. Please select a file.");
    }
}

// Check if file is selected before form submission with audio feedback
document.getElementById('posterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('poster-upload');
    if (!fileInput.files.length) {
        speak("Please select a file to upload.");
        alert("Please select a file to upload.");
        return;
    }
    // Proceed with reading the file and uploading
});

// Function to handle file upload asynchronously with audio feedback
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('poster', file);

    // Announce that the file is being uploaded
    speak("Uploading poster. Please wait.");

    // Upload the file and get the unique ID or file path in response
    const response = await fetch('YOUR_UPLOAD_API_ENDPOINT', {
        method: 'POST',
        body: formData,
    });
    const result = await response.json();
    setPosterId(result.id); // Assuming `result.id` is the unique identifier

    speak("Poster uploaded successfully.");
};

// Dark/Light Mode Toggle with audio feedback
document.getElementById("theme-button").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change button text based on mode
    if (document.body.classList.contains("dark-mode")) {
        this.textContent = "🌞"; // Light mode icon
        speak("Dark mode enabled.");
    } else {
        this.textContent = "🌙"; // Dark mode icon
        speak("Light mode enabled.");
    }
});
