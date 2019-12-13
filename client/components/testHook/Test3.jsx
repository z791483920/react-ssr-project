import React, { useReducer, useEffect } from 'react';
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
    useEffect(() => {
        console.log('挂载');
        return () => {
            console.log('卸载');
        };
    });
    return (
        <div>
            <div>{state.count}</div>

            <Button
                onClick={() => {
                    dispatch({ type: 'UP' });
                }}
            >
        测试3+
            </Button>
            <Button
                onClick={() => {
                    dispatch({ type: 'DOWN' });
                }}
            >
        测试3-
            </Button>
        </div>
    );
}
