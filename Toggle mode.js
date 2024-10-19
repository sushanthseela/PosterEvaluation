document.addEventListener('DOMContentLoaded', function () {
    const themeButton = document.getElementById('theme-button');
    const body = document.body;

    // Set initial theme based on user preference or default to dark mode
    let currentTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.add(currentTheme);
    themeButton.textContent = currentTheme === 'dark-mode' ? '🌙' : '☀️';

    // Toggle the theme on button click
    themeButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeButton.textContent = '☀️';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeButton.textContent = '🌙';
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});
