import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
} from 'react';

export interface Push {}

interface Props {
    //
}

interface State {
    pushes: Array<Push>;
}

const initialState: State = {
    pushes: [],
};

const PushHistoryContext = createContext<State>(initialState);

export const PushHistoryContextProvider: React.FC<PropsWithChildren> = (
    props
) => {
    const [pushes, setPushes] = useState<Array<Push>>([]);

    useEffect(() => {
        //
    }, []);

    return (
        <PushHistoryContext.Provider
            value={{
                pushes,
            }}
        >
            {props.children}
        </PushHistoryContext.Provider>
    );
};

export default PushHistoryContext;
