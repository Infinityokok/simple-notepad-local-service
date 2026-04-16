const CACHE_NAME = 'local-notepad-v1';
const ASSETS = [
    '/',               // This matches your app.get('/')
    '/notepad.css',    // Ensure these are in the 'public' folder
    '/notepad.js',
    '/favicon.ico'     // Remove this line if you don't have a favicon file!
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Installing new worker...');
            // We use map to catch which specific file fails
            return Promise.all(
                ASSETS.map(url => {
                    return cache.add(url).catch(err => {
                        console.error(`Failed to cache: ${url}`, err);
                    });
                })
            );
        })
    );
});