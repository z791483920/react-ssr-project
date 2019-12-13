import React, { useState, useMemo, useCallback, memo } from 'react';

export default function App() {
    const [name, setName] = useState('名称');
    const [content, setContent] = useState('内容');
    return (
    <>
      <button onClick={() => setName(new Date().getTime())}>name</button>
      <button onClick={() => setContent(new Date().getTime())}>content</button>
      <MemoButton
          name={name}
          aaa={useCallback(() => {
              console.log('1');
          }, [])}
      >
          {content}
      </MemoButton>
    </>
    );
}

// function Button({ name, children }) {
//     function changeName(name) {
//         console.log('11');
//         return (
//             <div>
//                 <div>{name}改变name的方法</div>
//                 <a
//                     onClick={() => {
//                         console.log(children);
//                     }}
//                 >
//           123544
//                 </a>
//             </div>
//         );
//     }

//     const otherName = changeName(name);
//     return (
//     <>
//       <div>{otherName}</div>
//       <div>{children}</div>
//     </>
//     );
// }

function Button({ name, aaa, children }) {
    function changeName(name, aaa) {
        console.log('11');
        return (
            <div>
                <div>{name}改变name的方法</div>
                <a
                    onClick={() => {
                        aaa();
                    }}
                >
          123544
                </a>
            </div>
        );
    }

    const otherName = useMemo(() => changeName(name, aaa), [aaa, name]);
    return (
    <>
      <div>{otherName}</div>
      <div style={{ border: '1px solid' }}>{children}</div>
    </>
    );
}
const MemoButton = memo(Button);
