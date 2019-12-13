import React, { useState, createContext, useContext } from 'react';
import defaultContext from './Test';

function Counter() {
    const count = useContext(defaultContext); // 一句话就可以得到count
    return <h2>{count}</h2>;
}

export default Counter;
