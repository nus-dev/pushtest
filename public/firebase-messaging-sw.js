importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

firebase.initializeApp({
    apiKey: 'AIzaSyCqgyrPBEXQXLZYwhYTIhwxW-83gnEdxhg',
    authDomain: 'pushtest-83a71.firebaseapp.com',
    projectId: 'pushtest-83a71',
    storageBucket: 'pushtest-83a71.appspot.com',
    messagingSenderId: '907891224152',
    appId: '1:907891224152:web:98cc63846206338ce9242d',
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
