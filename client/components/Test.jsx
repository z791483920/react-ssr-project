import React, { useReducer, createContext } from 'react';

const CountContext = createContext();

export default CountContext;
// const defaultContext = React.createContext('default');
// export const { Provider, Consumer } = defaultContext;
// export default defaultContext;

// const myContext = React.createContext();
// const ContextProvider = (children) => {
//     console.log(children, '---asd');
//     const products = useReducer(productsReducer, { count: 0 });
//     const order = useReducer(orderReducer, { order: [] });
//     const store = {
//         product: products,
//         order // [ order,deOrder ]
//     };
//     return <myContext.Provider value={store}>{children}</myContext.Provider>;
// };

// export default myContext;
