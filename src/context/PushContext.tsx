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

interface Props {
    //
}

interface State {
    sendPushAsync: (data: {
        authToken: string;
        title: string;
        body: string;
    }) => void;
}

const initialState: State = {
    sendPushAsync: () => undefined,
};

const PushContext = createContext<State>(initialState);

export const PushContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [token, setToken] = useState<string>();
    useEffect(() => {
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
        });

        getToken(messaging, {
            vapidKey: publicRuntimeConfig.VAPIDKEY,
        })
            .then((token) => {
                setToken(token);
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
                sendPushAsync,
            }}
        >
            {props.children}
        </PushContext.Provider>
    );
};

export default PushContext;
