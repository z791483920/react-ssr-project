import React from 'react';
import Header from '../components/Header';
import Test1 from '../components/testHook/Test1';
import Test2 from '../components/testHook/Test2';
import Test3 from '../components/testHook/Test3';
import Test4 from '../components/testHook/Test4';
import Test5 from '../components/testHook/Test5';
import './Home.css';

class Home extends React.Component {
    // class Home extends React.PureComponent {

    render() {
        return (
            <div>
                <div>
                    <Header />
                    <hr />
                    <Test1 />
                    <hr />
                    <Test2 />
                    <hr />
                    <Test3 />
                    <hr />
                    <Test4 />
                    <hr />
                    <Test5 />
                    <hr />
                </div>
            </div>
        );
    }
}

export default Home;
