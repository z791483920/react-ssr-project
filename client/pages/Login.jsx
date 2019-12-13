import React from 'react';
import _ from 'lodash';
import './login.css';
import styled from 'styled-components';
// import styles from './login.css';
import PubSub from '../utils/PubSub';

import Observer, { Subject } from '../utils/Observer';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const a = 1;
const b = 1;
class Login extends React.Component {
  state = {
      bitNum: '123123',
      aa: 1,
      bb: 1
  };

  componentDidMount() {
      // todolist dosomething
      this.setState({ bitNum: BigInt('123413254657687432') });
      this.pubSubWrapper();
      this.observeWrapper();
  }

  pubSubWrapper = () => {
      this.pubSub = new PubSub();

      this.pubSub.on('click', this.pubSubFunc1);
      this.pubSub.on('click', this.pubSubFunc2);
  };

  observeWrapper = () => {
      const observer1 = new Observer('老王');
      const observer2 = new Observer('老李');
      this.sub = new Subject();
      this.sub.listen(observer1);
      this.sub.listen(observer2);
  };

  pubSubFunc1 = arg => new Promise((resolve) => {
          setTimeout(() => {
              resolve();
              console.log('click --->我是张三', arg);
          }, 2000);
      });

  pubSubFunc2 = arg => new Promise((resolve) => {
          setTimeout(() => {
              resolve();
              console.log('click --->我是里斯', arg);
          }, 1000);
      });

  test() {
      let fff;
      const value = this.state.aa + a;
      this.setState({ aa: value }, () => {
          requestAnimationFrame(() => {
              this.test();
          });
      });
  }

  test1() {
      let fff;
      const value = this.state.bb + b;
      this.setState({ bb: value }, () => {
          requestIdleCallback(() => {
              this.test1();
          });
      });
  }

  render() {
      const { bitNum, aa, bb } = this.state;
      return (
          <Wrapper>
              <div>
                  <h1>test: {aa}</h1>
                  <h1>test1: {bb}</h1>
              </div>
              <Title>Test page</Title>
              <div className="login">
                  <div>登陆页面</div>
                  <button
                      type="button"
                      className="btn"
                      onClick={() => {
                          alert('23123123sdasd31213');
                      }}
                  >
            click
                  </button>

                  <a
                      onClick={() => {
                          const aa = _.cloneDeep({ a: 1 });
                          this.props.history.push('/');
                      }}
                  >
            去home
                  </a>
              </div>
              <hr />
              <h2>发布-订阅</h2>
              <button
                  type="button"
                  className="btn"
                  onClick={() => {
                      this.pubSub.emit('click', { ccc: 2 });
                  }}
              >
          click
              </button>
              <button
                  type="button"
                  className="btn"
                  onClick={() => {
                      this.pubSub.remove('click', this.observerFunc2);
                  }}
              >
          remove
              </button>
              <hr />
              <h2>观察者</h2>
              <button
                  type="button"
                  className="btn"
                  onClick={() => {
                      this.sub.notify('阿萨德的');
                  }}
              >
          点击
              </button>
              <button type="button" className="btn" onClick={() => {}}>
          删除
              </button>
          </Wrapper>
      );
  }
}

export default Login;
