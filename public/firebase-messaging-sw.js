// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyCqgyrPBEXQXLZYwhYTIhwxW-83gnEdxhg',
    authDomain: 'pushtest-83a71.firebaseapp.com',
    projectId: 'pushtest-83a71',
    storageBucket: 'pushtest-83a71.appspot.com',
    messagingSenderId: '907891224152',
    appId: '1:907891224152:web:98cc63846206338ce9242d',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('background');
    console.log(payload.notification?.title);
    console.log(payload.notification?.body);
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
