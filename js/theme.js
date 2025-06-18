const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const themeButtons = document.querySelectorAll('.dropdown-item');

function setThemeIcon(theme) {
    switch (theme) {
        case 'light':
            themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          <path d="M8 0a.5.5 0 0 1 .5.5V2a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 8 0zM8 14a.5.5 0 0 1 .5.5V16a.5.5 0 0 1-1 0v-1.5A.5.5 0 0 1 8 14zM16 8a.5.5 0 0 1-.5.5H14a.5.5 0 0 1 0-1h1.5A.5.5 0 0 1 16 8zM2 8a.5.5 0 0 1 .5.5H0a.5.5 0 0 1 0-1h2.5A.5.5 0 0 1 2 8zM13.657 2.343a.5.5 0 0 1 .707.707L13.207 4.5a.5.5 0 0 1-.707-.707l1.157-1.157zM3.5 12.5a.5.5 0 0 1 .707-.707L5.364 13.207a.5.5 0 0 1-.707.707L3.5 12.5zM12.5 12.5a.5.5 0 0 1-.707-.707L13.207 11.5a.5.5 0 0 1 .707.707l-1.414 1.414zM3.5 3.5a.5.5 0 0 1 .707.707L3.05 5.364a.5.5 0 1 1-.707-.707L3.5 3.5z"/>
        </svg>`;
            break;

        case 'dark':
            themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M785.334 194.943c174.789 174.787 174.789 459.179 0 633.967-174.787 174.787-459.178 174.787-633.967 0-13.206-13.205-26.22-28.336-39.807-46.314a19.672 19.672 0 0 1-2.223-20.012 19.777 19.777 0 0 1 16.54-11.442c98.838-6.698 191.601-48.753 261.234-118.386C530.853 489.014 546.472 258.475 423.392 96.51a19.553 19.553 0 0 1-2.249-19.981 19.554 19.554 0 0 1 16.54-11.497c129.587-8.759 256.325 38.583 347.651 129.911z" fill="#ffea00"></path><path d="M785.334 194.943c-14.266-14.268-29.484-27.325-45.354-39.399 151.302 175.925 143.723 442.269-22.987 608.98-121.85 121.85-307.044 190.195-461.161 142.154 60.038 35.511 140.886 47.603 167.101 50.984 129.417 13.067 263.464-29.816 362.401-128.753 174.789-174.787 174.789-459.179 0-633.966z" fill="#030504"></path></g></svg>`;
            break;

        case 'system':
        default:
            themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0b5ed7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998" stroke="#0b5ed7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="#0b5ed7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="#0b5ed7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001" stroke="#0b5ed7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
            break;
    }
}

function applyTheme(theme) {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark-mode', isDark);
    setThemeIcon(theme);
    themeLabel.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
}

function getStoredTheme() {
    return localStorage.getItem('theme') || 'system';
}

function storeTheme(theme) {
    localStorage.setItem('theme', theme);
}

function initTheme() {
    const theme = getStoredTheme();
    applyTheme(theme);
}

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selected = btn.dataset.theme;
        storeTheme(selected);
        applyTheme(selected);
    });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const theme = getStoredTheme();
    if (theme === 'system') {
        applyTheme('system');
    }
});

initTheme();
