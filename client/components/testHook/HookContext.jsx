import React, { createContext, useReducer, useMemo } from 'react';

export const HookContext = createContext();

export const actionType = {
    up: 'up',
    down: 'down'
};

function reducer(state, action) {
    switch (action.type) {
    case actionType.up:
        return {
            ...state,
            color: 'red'
        };
    case actionType.down:
        return {
            ...state,
            color: 'green'
        };
    default:
        return state;
    }
}

export function ColorHook({ children }) {
    const [state, dispatch] = useReducer(reducer, { color: 'yellow' });

    return (
        <HookContext.Provider value={{ state, dispatch }}>
            {children}
        </HookContext.Provider>
    );
}
