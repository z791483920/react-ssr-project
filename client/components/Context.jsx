import React, {
    useContext,
    useState,
    Component,
    useEffect,
    createContext,
    useMemo,
    useRef
} from 'react';
// import defaultContext from './Test';
import Counter from './Counter';

import defaultContext from './Test';
// export default Example4;

import { ShowArea, Buttons } from './ShowArea';
import { Color } from './Color';
// const ContextComponent = (props) => {
//     const value = useContext(defaultContext);
//     return (
//         <div>
//             <h1>{value}</h1>
//         </div>
//     );
// };

// export default ContextComponent;

// class Index extends Component {
//     componentDidMount() {
//         setTimeout(() => console.log('classComponent', this.state.value), 1000);
//         this.setState({ value: 5 });
//     }

//     render() {
//         const { aa } = this.props;
//         return <div>{aa}</div>;
//     }
// }

// App.js
// function App() {
//     // const [value, updateVal] = useState(0);
//     const [val, updateVal] = useState(0);
//     useEffect(() => {
//     // hooks1
//         console.log('1----------->first');
//         updateVal(2);
//     }, []);
//     useLayoutEffect(() => {
//     // hooks2
//         console.log('12------------->second');
//         console.log(val, '-----val'); // ---- 0
//         return () => {
//             console.warn('卸载了·');
//         };
//     });

//     // useEffect(() => {
//     //     updateVal(5);
//     //     setTimeout(() => console.log('FunctionComponent', value), 1000);
//     // }, []);
//     return <Index aa={val} />;
// }

// export default App;

// const Todo = () => {
//     // const { product, order } = useContext(defaultContext);
//     const params = useContext(defaultContext);
//     console.log(params, '--->213');
//     return (
//         <React.Fragment>
//             {/* {JSON.stringify(state, null, 4)} */}
//             {/* <button onClick={product.dispatch}> product dispatch </button> */}
//         </React.Fragment>
//     );
// };

// export default Todo;
function Example4() {
    const [count, setCount] = useState(0);
    const ref = useRef();
    const getCount = () => {
        console.log(count, '213123getCount');
    };
    // useEffect(() => {
    // // console.log(count, '231');
    // // console.log(ref, 'ref');
    // // getCount();
    // // setCount(count + 1);
    //     const id = setInterval(() => {
    //         console.log('1');
    //         setCount(count + 1);
    //     }, 1000);
    //     return () => clearInterval(id);
    // }, [count]);

    return (
        <div ref={ref}>
            <p>You clicked {count} times</p>
            <button
                onClick={() => {
                    setCount(count + 1);
                    setTimeout(() => {
                        setCount(count + 11);
                    }, 1000);
                }}
            >
        click me
            </button>
            <defaultContext.Provider value={count}>
                <Counter />
            </defaultContext.Provider>
        </div>
    );
}

function Example6() {
    return (
        <div>
            <Color>
                <ShowArea />
                <Buttons />
            </Color>

            <hr />
            <Example4 />
            <hr />
            <Example7 />
        </div>
    );
}

function ChildComponent({ name, children }) {
    function changeXiaohong(name) {
        console.log('她来了，她来了。小红向我们走来了');
        return `${name},小红向我们走来了`;
    }

    // const actionXiaohong = changeXiaohong(name);
    // const actionXiaohong = useMemo(() => {
    //     changeXiaohong(name);
    // }, [name]);
    const actionXiaohong = useMemo(() => changeXiaohong(name), [name]);
    return (
        <div>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </div>
    );
}

function Example7() {
    const [xiaohong, setXiaohong] = useState('小红待客状态');
    const [zhiling, setZhiling] = useState('志玲待客状态');
    return (
    <>
      <button
          onClick={() => {
              setXiaohong(new Date().getTime());
          }}
      >
        小红
      </button>
      <button
          onClick={() => {
              setZhiling(`${new Date().getTime()},志玲向我们走来了`);
          }}
      >
        志玲
      </button>
      <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
    </>
    );
}

export default Example6;
