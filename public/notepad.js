const notepad = document.getElementById('notepad');
const saveButton = document.getElementById('save-button');
let savedContent = localStorage.getItem('notepadContent') || '';

// Load saved content on page load
notepad.value = savedContent;

// Autosave content on change
notepad.addEventListener('input', () => {
    const currentContent = notepad.value;
    localStorage.setItem('notepadContent', currentContent);
    console.log('Content autosaved.');
});

// Function to save content (called on button click and Ctrl+S)
function saveContent() {
    const currentContent = notepad.value;
    localStorage.setItem('notepadContent', currentContent);
    console.log('Content saved.');
    alert('Content saved successfully!');
}

// Save content manually on button click
saveButton.addEventListener('click', saveContent);

// Save content on Ctrl+S key press
document.addEventListener('keydown', (event) => {
    if ((navigator.platform.match('Mac') ? event.metaKey : event.ctrlKey) && event.keyCode === 83) {
        event.preventDefault(); // Prevent default behavior of Ctrl+S
        saveContent();
    }
});

// Alert on closing the window if there are unsaved changes
window.addEventListener('beforeunload', (event) => {
    if (savedContent !== notepad.value && localStorage.getItem('notepadContent') !== notepad.value) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
});

const dateDisplay = document.getElementById('date-display')
const now = new Date();
const nowOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date = now.toLocaleDateString('en-US', nowOptions);

dateDisplay.textContent = `The current date is ${date}`

// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}