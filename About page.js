// Function to redirect to the home page
function redirectToHome() {
    window.location.href = "upload-poster.html"; // Change this URL if your home page is different
}

// Function to open a popup with detailed information about a metric
function openPopup(metric) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupText = document.getElementById('popupText');

    // Set popup content based on metric
    switch (metric) {
        case 'Logos':
            popupTitle.textContent = 'Logos Evaluation';
            popupText.textContent = 'To address the task of classifying complex and simple logos within images, a pre-trained object detection model, YOLOv5, was employed. This model was fine-tuned on a custom dataset comprising 200+ images of both logo type To enhance model performance and generalization, the dataset was augmented to 559 images using Roboflow. To simplify the learning task and focus on logo structure, all images were converted to grayscale, eliminating the potential influence of color variations. The fine-tuning process was conducted using Google Colab, leveraging the Roboflow API to download the augmented dataset. The resulting model is now capable of accurately detecting and classifying complex and simple logos within images';
            break;
        case 'Font Style':
            popupTitle.textContent = 'Font Style Evaluation';
            popupText.textContent = 'Analyze the font style to ensure it is clear and legible, avoiding complex or decoraCve fonts that may be difficult to read. Recommended: Sans-serif fonts such as Arial, Gill Sans, HelveCca, and Verdana for body and heading text. Serif fonts such as Times New Roman and Garamond are recommended for headings only R1';
            break;
        case 'fontSize':
            popupTitle.textContent = 'Font Size Evaluation';
            popupText.textContent = 'verify that the font size is sufficiently large to accommodate users with low vision or reading difficulCes. Main title: 72 point (minimum) - 158point (ideal) Section headings: 42 point (minimum) -56 point (ideal) Body text: 24 point (minimum) - 36point (ideal) Captons: 18 point (minimum) - 24 point(ideal)';
            break;
        case 'Color Contrast':
            popupTitle.textContent = 'Color Contrast Evaluation';
            popupText.textContent = 'To ensure adherence to the Web Content Accessibility Guidelines (WCAG) regarding color contrast, this project focused on evaluating the contrast between background and text colors within digital content. A k-means clustering algorithm was employed to extract the dominant background and text colors from the analyzed images. By calculating the RGB values of these colors and determining their ratio, it was possible to assess whether the contrast met the WCAG-specified threshold. This analysis provides valuable insights into the accessibility of the content and identifies areas that may require adjustments to enhance color contrast and improve user experience for individuals with visual impairments';
            break;
        case 'Poster Layout':
            popupTitle.textContent = 'Poster Layout Evaluation';
            popupText.textContent = 'Description of Poster Layout Evaluation';
            break;
        case 'Hyperlinks':
            popupTitle.textContent = 'Hyperlinks Evaluation';
            popupText.textContent = 'Description of Hyperlinks Evaluation';
            break;
        default:
            popupTitle.textContent = 'Evaluation';
            popupText.textContent = 'Detailed information about this evaluation will appear here.';
    }

    popup.style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Helper function to set text and background colors based on mode
function setFlashcardStyle(isDarkMode) {
    const textColor = isDarkMode ? '#fffff' : '#333'; // White text for dark mode
    const backgroundColor = isDarkMode ? '#333' : '#f9f9f9'; // Dark background for dark mode

    document.querySelectorAll('.flashcard').forEach(flashcard => {
        flashcard.style.color = textColor;
        flashcard.style.backgroundColor = backgroundColor;
    });
}

// Dark/Light Mode Toggle
document.getElementById("theme-button").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change button text based on mode
    const isDarkMode = document.body.classList.contains("dark-mode");
    this.textContent = isDarkMode ? "🌞" : "🌙"; // Toggle icon

    // Update flashcard text and background color in dark mode
    setFlashcardStyle(isDarkMode);
});