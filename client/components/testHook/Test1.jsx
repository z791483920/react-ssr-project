import React, { useState, useReducer } from 'react';
import { Button } from 'antd';

export default function () {
    const [count, setCount] = useState(0);
    console.log('123');
    return (
        <div>
            <div>{count}</div>

            <Button
                onClick={() => {
                    setCount(123);
                }}
            >
        测试1
            </Button>
        </div>
    );
}
