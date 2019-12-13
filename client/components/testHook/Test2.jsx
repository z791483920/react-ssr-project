import React, { useReducer } from 'react';
import { Button } from 'antd';

function reducer(state, action) {
    switch (action.type) {
    case 'UP':
        return {
            ...state,
            count: state.count + 1
        };
    case 'DOWN':
        return {
            ...state,
            count: state.count - 1
        };
    default:
        return state;
    }
}
export default function () {
    const [state, dispatch] = useReducer(reducer, { count: 11 });
    return (
        <div>
            <div>{state.count}</div>

            <Button
                onClick={() => {
                    dispatch({ type: 'UP' });
                }}
            >
        测试+
            </Button>
            <Button
                onClick={() => {
                    dispatch({ type: 'DOWN' });
                }}
            >
        测试-
            </Button>
        </div>
    );
}
