import React from 'react';

export default class Box extends React.Component {
    render() {
        return (
            <div className="test-box-wrapper">
                <div className="test-box" style={{ width: '120px' }}>
                    {this.props.value}
                </div>
                <div className="addon">{this.props.afterIcon}</div>
            </div>
        );
    }
}
