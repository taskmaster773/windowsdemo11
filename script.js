// Password
const CORRECT_PASSWORD = 'password123';

// Update time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

// Check password
function checkPassword() {
    const input = document.getElementById('passwordInput');
    if (input.value === CORRECT_PASSWORD) {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('desktop').classList.add('active');
        input.value = '';
    } else {
        alert('Incorrect password!');
        input.value = '';
    }
}

// Allow Enter key to submit password
document.addEventListener('keypress', function(e) {
    if (document.getElementById('loginScreen').classList.contains('active') && e.key === 'Enter') {
        checkPassword();
    }
});

// Toggle Start Menu
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.classList.toggle('active');
}

// Close start menu when clicking elsewhere
document.addEventListener('click', function(e) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-button');
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
        startMenu.classList.remove('active');
    }
});

// Open Browser
function openBrowser() {
    document.getElementById('browserWindow').classList.remove('hidden');
    bringToFront('browserWindow');
    document.getElementById('startMenu').classList.remove('active');
}

// Open Settings
function openSettings() {
    document.getElementById('settingsWindow').classList.remove('hidden');
    bringToFront('settingsWindow');
    document.getElementById('startMenu').classList.remove('active');
}

// Navigate in browser
function navigateTo() {
    const urlBar = document.getElementById('urlBar');
    let url = urlBar.value;
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    const iframe = document.getElementById('browserFrame');
    
    // Check if the URL is iframeable
    try {
        iframe.src = url;
    } catch (e) {
        alert('This website cannot be loaded in the browser. Try a different URL.');
    }
}

// Allow Enter key to navigate
document.getElementById('urlBar').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        navigateTo();
    }
});

// Close Window
function closeWindow(windowId) {
    document.getElementById(windowId).classList.add('hidden');
}

// Minimize Window
function minimizeWindow(windowId) {
    const window = document.getElementById(windowId);
    window.style.display = 'none';
}

// Maximize Window
function maximizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window.style.width === '100%') {
        window.style.width = window.dataset.originalWidth || '800px';
        window.style.height = window.dataset.originalHeight || '500px';
        window.style.top = window.dataset.originalTop || '100px';
        window.style.left = window.dataset.originalLeft || '100px';
    } else {
        window.dataset.originalWidth = window.style.width;
        window.dataset.originalHeight = window.style.height;
        window.dataset.originalTop = window.style.top;
        window.dataset.originalLeft = window.style.left;
        window.style.width = '100%';
        window.style.height = 'calc(100% - 48px)';
        window.style.top = '0';
        window.style.left = '0';
    }
}

// Minimize All
function minimizeAll() {
    document.getElementById('browserWindow').style.display = 'none';
    document.getElementById('settingsWindow').style.display = 'none';
}

// Change Theme
function changeTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Change Brightness
function changeBrightness(value) {
    document.body.style.filter = `brightness(${value}%)`;
}

// Logout
function logout() {
    document.getElementById('desktop').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
    document.getElementById('browserWindow').classList.add('hidden');
    document.getElementById('settingsWindow').classList.add('hidden');
    document.getElementById('startMenu').classList.remove('active');
}

// Make windows draggable
const windows = document.querySelectorAll('.window');
windows.forEach(windowEl => {
    makeWindowDraggable(windowEl);
});

function makeWindowDraggable(element) {
    const header = element.querySelector('.window-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        bringToFront(element.id);
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Bring window to front
function bringToFront(windowId) {
    const maxZ = Math.max(
        ...Array.from(document.querySelectorAll('.window')).map(el => parseInt(window.getComputedStyle(el).zIndex))
    );
    document.getElementById(windowId).style.zIndex = maxZ + 1;
}

// Initialize
console.log('Windows 11 Demo loaded! Password: password123');
