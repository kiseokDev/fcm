// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAS8X7E5Un6yXFSodA2uAoCbTH8FBtKAUg",
    authDomain: "fcm-test-32da4.firebaseapp.com",
    projectId: "fcm-test-32da4",
    storageBucket: "fcm-test-32da4.appspot.com",
    messagingSenderId: "197120868708",
    appId: "1:197120868708:web:e8eedc7a1e6c0e835afa71",
    measurementId: "G-3FKX2495V4"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging(firebaseApp);
console.log("messaging2 ", messaging);
console.log("messaging.vapidKey ", messaging.vapidKey);

messaging.onBackgroundMessage(function (payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('push', function (event) {
    console.log("push event ", event);
    if (event.data) {
        console.log("This push event has data: ", event.data.text());
    } else {
        console.log("This push event has no data.");
    }
    self.registration.showNotification(event.data.title,
        event.data.body);
});