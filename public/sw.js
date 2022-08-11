self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
});

// TODO: Notification click event
self.addEventListener('notificationclick', function (event) {
    console.log('Push clicked');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://github.com/leegeunhyeok/pwa-example')
    );
});

// Functional: PUSH
self.addEventListener('push', (event) => {
    console.log('Push ' + event.data.text());

    const title = 'My PWA!';
    const options = {
        body: event.data.text(),
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
