import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const [appServerPublicKey, setKey] = useState('');
    const registerRef = useRef<ServiceWorkerRegistration>();
    useEffect(() => {
        (async () => {
            if (!('serviceWorker' in navigator)) return;
            const register = await navigator.serviceWorker.register('/sw.js');
            registerRef.current = register;
        })();
    }, []);

    function urlB64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    useEffect(() => {
        (async () => {
            const p = await Notification.requestPermission();
            if (p !== 'granted') {
                console.log('permission', p);
                return;
            }

            if (!appServerPublicKey) return;
            const applicationServerKey = urlB64ToUint8Array(appServerPublicKey);
            if (!registerRef.current) return;
            registerRef.current.pushManager
                .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey,
                })
                .then((subscription) => {
                    console.log('User is subscribed.');
                    console.log(JSON.stringify(subscription));
                })
                .catch((err) => {
                    console.log('Failed to subscribe the user: ', err);
                });
        })();
    }, [appServerPublicKey]);

    return (
        <div className={styles.container}>
            <input
                value={appServerPublicKey}
                onChange={(e) => setKey(e.target.value)}
            ></input>
        </div>
    );
};

export default Home;
