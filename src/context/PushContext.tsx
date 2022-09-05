import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';
import getConfig from 'next/config';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();

export interface Push {
    title?: string;
    body?: string;
}

interface Props {
    //
}

interface State {
    pushes: Array<Push>;
    sendPushAsync: (data: {
        authToken: string;
        title: string;
        body: string;
    }) => void;
    ready: () => void;
}

const initialState: State = {
    pushes: [],
    sendPushAsync: () => undefined,
    ready: () => undefined,
};

const PushContext = createContext<State>(initialState);

export const PushContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [pushes, setPushes] = useState<Array<Push>>([]);
    const [token, setToken] = useState<string>();

    const ready = useCallback(() => {
        const firebaseConfig = {
            apiKey: publicRuntimeConfig.APIKEY,
            authDomain: publicRuntimeConfig.AUTHDOMAIN,
            projectId: publicRuntimeConfig.PROJECTID,
            storageBucket: publicRuntimeConfig.STORAGEBUCKET,
            messagingSenderId: publicRuntimeConfig.MESSAGINGSENDERID,
            appId: publicRuntimeConfig.APPID,
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        onMessage(messaging, (payload) => {
            new Notification(payload.notification?.title || 'title', {
                body: payload.notification?.body,
            });
            setPushes((pushes) => [
                {
                    title: payload.notification?.title,
                    body: payload.notification?.body,
                },
                ...pushes,
            ]);
        });

        getToken(messaging, {
            vapidKey: publicRuntimeConfig.VAPIDKEY,
        })
            .then((token) => {
                setToken(token);
                console.info('set token');
            })
            .catch((e) => console.error(e));
    }, []);

    const sendPushAsync = useCallback(
        async (data: { authToken: string; title: string; body: string }) => {
            await axios.post(
                'https://fcm.googleapis.com//v1/projects/pushtest-83a71/messages:send',
                {
                    message: {
                        token: token,
                        notification: {
                            title: data.title,
                            body: data.body,
                        },
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${data.authToken}`,
                    },
                }
            );
        },
        [token]
    );

    return (
        <PushContext.Provider
            value={{
                pushes,
                sendPushAsync,
                ready,
            }}
        >
            {props.children}
        </PushContext.Provider>
    );
};

export default PushContext;
