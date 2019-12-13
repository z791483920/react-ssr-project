import { Component } from 'react';

// import React from 'react';

// // 浅比较逻辑
// const shallowEqual = function (oldState, nextState) {
//     const oldKeys = Object.keys(oldState);
//     const newKeys = Object.keys(nextState);

//     if (oldKeys.length !== newKeys.length) {
//         return false;
//     }

//     let flag = true;
//     for (let i = 0; i < oldKeys.length; i++) {
//         if (!nextState.hasOwnProperty(oldKeys[i])) {
//             flag = false;
//             break;
//         }

//         if (nextState[oldKeys[i]] !== oldState[oldKeys[i]]) {
//             flag = false;
//             break;
//         }
//     }

//     return flag;
// };

// class PureComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.props = props || {};
//         this.state = {};
//     }

//   shouldComponentUpdate = (nextProps, nextState) => {
//       console.log(this, '-21');
//       const cpState = this.state;
//       const cpProps = this.props;
//       if (
//           !shallowEqual(cpState, nextState)
//       || !shallowEqual(cpProps, nextProps)
//       ) {
//           return true; // 只要 state 或 props 浅比较不等的话，就进行渲染
//       }
//       return false; // 浅比较相等的话，不渲染
//   };

//     //   setState = (updater, cb) => {
//     //       console.log(this, '--213213');
//     //       this.shouldComponentUpdate.call(this);
//     //       //   shouldComponentUpdate.call(this); // 调用 setState 时，让 this 指向子类的实例，目的取到子类的 this.state
//     //       // asyncRender(updater, this, cb);
//     //       this.render(updater, this, cb);
//     //   };
// }

// PureComponent.prototype.setState = function (updater, cb) {
//     this.shouldComponentUpdate.call(this); // 调用 setState 时，让 this 指向子类的实例，目的取到子类的 this.state
//     asyncRender(updater, this, cb);
// };

// export default PureComponent;

class PureComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props || {};
        this.state = {};

        // isShouldComponentUpdate.call(this); // 为每个 PureComponent 绑定 shouldComponentUpdate 方法

        this.shouldComponentUpdate = function (nextProps, nextState) {
            // console.log('nextProps', nextProps);
            const cpState = this.state;
            const cpProps = this.props;
            // console.log(this.state, '-0------------this');
            // console.log('nextState', nextState);

            // console.log('cpProps', cpProps);

            // console.log('cpState', cpState);
            if (
                !shallowEqual(cpState, nextState)
        || !shallowEqual(cpProps, nextProps)
            ) {
                // console.log('更新');
                return true; // 只要 state 或 props 浅比较不等的话，就进行渲染
            }
            // console.log('不更新');
            return true; // 浅比较相等的话，不渲染
        };
    }
}

// function PureComponent(props) {
//     this.props = props || {};
//     this.state = {};

//     isShouldComponentUpdate.call(this); // 为每个 PureComponent 绑定 shouldComponentUpdate 方法
// }

// PureComponent.prototype.setState = function (updater, cb) {
//     isShouldComponentUpdate.call(this); // 调用 setState 时，让 this 指向子类的实例，目的取到子类的 this.state
//     // asyncRender();
//     console.log(this, '213');
//     this.render(updater, cb);
// };

function isShouldComponentUpdate() {
    const cpState = this.state;
    const cpProps = this.props;
    // console.log(this.state, '1');
    this.shouldComponentUpdate = function (nextProps, nextState) {
    // console.log('nextProps', nextProps);
        console.log(this.state, '-0------------this');
        console.log('nextState', nextState);

        // console.log('cpProps', cpProps);

        console.log('cpState', cpState);
        if (
            !shallowEqual(cpState, nextState)
      || !shallowEqual(cpProps, nextProps)
        ) {
            console.log('更新');
            return true; // 只要 state 或 props 浅比较不等的话，就进行渲染
        }
        console.log('不更新');
        return false; // 浅比较相等的话，不渲染
    };
}

// 浅比较逻辑
const shallowEqual = function (oldState, nextState) {
    const oldKeys = Object.keys(oldState);
    const newKeys = Object.keys(nextState);
    if (oldKeys.length !== newKeys.length) {
        return false;
    }

    let flag = true;
    for (let i = 0; i < oldKeys.length; i++) {
        if (!nextState.hasOwnProperty(oldKeys[i])) {
            flag = false;
            break;
        }

        if (nextState[oldKeys[i]] !== oldState[oldKeys[i]]) {
            flag = false;
            break;
        }
    }

    return flag;
};

export default PureComponent;
