import React, { useContext } from 'react';
import { ColorContext, UPDATE_COLOR } from './Color';

export function ShowArea() {
    const { color } = useContext(ColorContext);
    return <div style={{ color }}>字体颜色为{color}</div>;
}

export function Buttons() {
    const { dispatch } = useContext(ColorContext);
    return (
        <div>
            <button
                onClick={() => {
                    dispatch({ type: UPDATE_COLOR, color: 'red' });
                }}
            >
        红色
            </button>
            <button
                onClick={() => {
                    dispatch({ type: UPDATE_COLOR, color: 'yellow' });
                }}
            >
        黄色
            </button>
        </div>
    );
}

export default { Buttons, ShowArea };
