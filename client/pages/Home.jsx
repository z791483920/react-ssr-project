import React from 'react';
import Header from '../components/Header';
import './Home.css';
import { Provider, Consumer } from '../components/Test';
import Context from '../components/Context';
// import loadable from '@loadable/component';
import TestReducer from '../components/TestReducer';
import SPureComponent from '../utils/PureComponent';
import { observer, inject } from 'mobx-react';

import { Button, Spin } from 'antd';

// const Context = loadable(() => import('../components/Context'));

function log(target, name, descriptor) {
    const oldValue = descriptor.value;
    // console.log(target, '--->target');
    // console.log(name, '--->aname');∏
    // console.log(descriptor, '--->descriptor');
    descriptor.value = function () {
        console.log('preload');
        return oldValue.apply(target, arguments);
    };
}

const FancyButton = React.forwardRef((props, ref) => (
    <button
        ref={ref}
        className="FancyButton"
        onClick={() => {
            console.log(ref, '23123');
        }}
    >
        {props.children}
    </button>
));

@inject(stores => ({ homeStore: stores.homeStore }))
@observer
class Home extends SPureComponent {
  // class Home extends React.PureComponent {
  state = {
      userInfo: {
          name: 'lxfriday',
          age: 24
      },
      school: 'hzzz',
      count: 0,
      isShow: false
  };

  ref1 = React.createRef();

  listRef = React.createRef();

  aaa = 13123;

  static fetch = () => '1111';
  // static getDerivedStateFromProps(nextProps, prevState) {
  //     console.log(nextProps, 'nextProps');
  //     console.log(prevState, 'prevState');
  //     return null;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
      //   console.log('getSnapshotBeforeUpdate');
      return this.aaa;
  }

  componentDidMount() {
      //   console.log(this.ref1, 'this.ref1');
      console.log(this.props, '-......................a');
      // this.listRef.current.addEventListener('click', event => {
      //   console.log(event, '-------------->dasd');
      // });
      //   document.addEventListener(
      //       'click',
      //       (e) => {
      //           console.log('触发了顶层事件的捕获');
      //       },
      //       true
      //   );
      //   document.addEventListener(
      //       'click',
      //       (e) => {
      //           console.log('触发了顶层事件的冒泡');
      //       },
      //       false
      //   );
      //   const btn = document.querySelector('#testEventBtn');
      //   btn.addEventListener('click', (e) => {
      //       e.stopPropagation();
      //       console.log('测试按钮');
      //   });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      //   console.log(snapshot, ';1213snap');
  }

  static getDerivedStateFromError(error) {
      return { hasError: true };
  }

  handleChangeUserInfo = () => {
      const { userInfo } = this.state;
      userInfo.sex = 'male';
      this.setState({ userInfo });
  };

  handleChangeSchool = () => {
      this.setState({ school: 'zzzh' });
  };

  //   shouldComponentUpdate = () => true;

  @log
  testLog() {
      console.log(this, '-344--->this');
      console.log('jinlaikle');
      return 1112;
  }

  render() {
      const { userInfo, school, hasError, isShow } = this.state;
      const { homeStore } = this.props;
      //   const aa = BigInt(312345123123123123567897654323567890);
      //   console.log(
      //       this.state.count,
      //       'console.log(this.state.count)console.log(this.state.count)'
      //   );
      //   console.log(this.fff);
      //   if (!this.fff) {
      //       console.log('123123123');
      //       this.fff = 1;
      //       console.log(this.render());
      //   }
      return (
          <div>
              {/* <Spin spinning={homeStore.loading}> */}
              <div className="aae">
                  <Header />
                  {/* <div>{aa}</div> */}

                  <hr />
                  <div>
                      <div id="testEventBtn">213223425656873523测试事件按钮11</div>
                  </div>
                  <h1>{homeStore.aaa}</h1>
                  <Button
                      onClick={() => {
                          homeStore.aaa = `3444444${new Date()}`;
                      }}
                  >
            changeStoreState
                  </Button>
                  <hr />
                  <div>{JSON.stringify(isShow)}</div>
                  <Button
                      onClick={() => {
                          this.setState({ isShow: !isShow });
                      }}
                  >
            changeIsShow
                  </Button>
                  <hr />
                  <Context />
                  <hr />
                  <FancyButton ref={this.ref1}>Click me!</FancyButton>
                  <hr />
                  <Button onClick={this.testLog}>testLog</Button>
                  <Button
                      onClick={(e) => {
                          //   const a = this.testLog();
                          console.log(e.nativeEvent, 'eeeeeeeeeeeee');
                          console.log('123123');
                          //   log(this.testLog)();
                          //   console.log(a, '1testLog111');
                      }}
                  >
            testLog111
                  </Button>
                  {/* <div>
                  <button onClick={this.handleChangeUserInfo}>change userInfo</button>
                  <button onClick={this.handleChangeSchool}>change school</button>
                  <button
                      onClick={() => {
                          this.aaa += 1;
                      }}
                  >
            change aaa
                  </button>

                  <br />
                  {JSON.stringify(userInfo)}
                  <br />
              </div> */}
                  <TestReducer />
                  <div>
                      <Button
                          onClick={() => {
                              this.props.history.push('/login');
                          }}
                      >
              去login
                      </Button>
                      <Button
                          onClick={() => {
                              this.props.history.push('/t');
                          }}
                      >
              去t
                      </Button>
                  </div>
              </div>
              {/* </Spin> */}
          </div>
      );
  }
}

export default Home;
