import React, { useReducer, useEffect } from 'react';
import _ from 'lodash';

const reducer = (state, action) => {
    // console.log(action, '2');
    switch (action.type) {
    case 'ADD_TODO':
        return [...state, action.todo];
        break;
    case 'CHANGE_TODO':
        const findIndex = _.findIndex(state, o => o.id === action.id);
        if (findIndex > -1) {
            if (state[findIndex].status === 'change') {
                state[findIndex].status = 'noChange';
            } else {
                state[findIndex].status = 'change';
            }
        }
        return [...state];
        break;
    default:
        return state;
    }
};

export default function TestReducer() {
    const aaa = React.useRef();
    const [state, dispatch] = useReducer(reducer, [
        {
            id: Date.now(),
            value: 'Hello react'
        }
    ]);
    const change = (id) => {
        dispatch({
            type: 'CHANGE_TODO',
            id
        });
    };

    useEffect(() => {
    // console.log(state, '2123');
    }, [state]);
    return (
        <div ref={aaa}>
            <button
                onClick={() => {
                    dispatch({
                        type: 'ADD_TODO',
                        todo: { id: Date.now(), value: 'Hello Hook' }
                    });
                }}
            >
        Add
            </button>
            {state.map((todo, index) => (
                <div
                    style={{ background: todo.status === 'change' ? 'red' : 'green' }}
                    key={index}
                    todo={todo.value}
                    onClick={() => {
                        change(todo.id);
                    }}
                    data-aab={index}
                >
                    {todo.value}
                </div>
            ))}
        </div>
    );
}
