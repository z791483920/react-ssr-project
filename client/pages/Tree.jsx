import React from 'react';
import { Tree, Form, Input, Icon, Button, Popover } from 'antd';
import _ from 'lodash';
import Box from '../components/Box';
import './Home.css';

const { TreeNode, DirectoryTree } = Tree;
const { Search } = Input;

class Demo extends React.Component {
  state = {
      selectedKeys: [],
      dragList: [{ name: 1, id: 1 }, { name: 2, id: 2 }, { name: 3, id: 3 }]
  };

  onSelect = (keys, event) => {
      const allKeys = [...this.state.selectedKeys];
      const existKey = _.indexOf(allKeys, keys[0]);
      if (existKey > -1) {
          _.remove(allKeys, o => o === keys[0]);
      } else {
          allKeys.push(keys[0]);
      }
      this.setState({ selectedKeys: allKeys });
  };

  onExpand = () => {
      console.log('Trigger Expand');
  };

  componentDidMount() {
      console.log(document.querySelector('.name111'), '222');
  }

  dragStart(event) {
      event.dataTransfer.setData('Text', event.target.id);
  }

  dragging(event) {}

  allowDrop(event) {
      event.preventDefault();
  }

  drop(event) {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');

      console.log(event, '--<>a');
      event.target.appendChild(document.getElementById(data));
  }

  render() {
      const { selectedKeys, dragList } = this.state;
      const {
          getFieldDecorator,
          getFieldsError,
          getFieldError,
          isFieldTouched
      } = this.props.form;
      const usernameError =      isFieldTouched('username') && getFieldError('username');
      const passwordError =      isFieldTouched('password') && getFieldError('password');
      return (
          <div className="tree">
              {/* <DirectoryTree
                  multiple
                  defaultExpandAll
                  onSelect={this.onSelect}
                  onExpand={this.onExpand}
                  selectedKeys={this.state.selectedKeys}
              >
                  <TreeNode title="parent 0" key="0-0" selectable={false}>
                      <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                      <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                  </TreeNode>
                  <TreeNode title="parent 1" key="0-1" selectable={false}>
                      <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                      <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                  </TreeNode>
              </DirectoryTree> */}
              {/* <div>
                  {dragList.map(v => (
                      <div
                          key={v.id}
                          draggable
                          id={`v${v.id}`}
                          style={{ width: '100px', margin: '20px', background: 'skyblue' }}
                          onDragStart={this.dragStart}
                          onDrag={this.dragging}
                          onDrop={this.drop}
                          onDragOver={this.allowDrop}
                      >
                          {v.name}
                      </div>
                  ))}
              </div> */}
              <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item>
                      {getFieldDecorator('username', {
                          rules: [
                              { required: true, message: 'Please input your username!' }
                          ]
                      })(
                          <Input
                              prefix={
                                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                              }
                              placeholder="Username"
                          />
                      )}
                  </Form.Item>
                  <Form.Item className="name111">
                      {getFieldDecorator('username1', {
                          initialValue: '123123',
                          rules: [
                              { required: true, message: 'Please input your username!' }
                          ]
                      })(
                          <Box
                              afterIcon={
                                  <Popover
                                      getPopupContainer={() => document.querySelector('.name111')}
                                      content={
                                          <div>
                                              <div>
                          122222222222222222222221222222222222222222222222222222222222223222
                                              </div>
                                              <div>12</div>
                                          </div>
                                      }
                                      visible
                                      placement="bottom"
                                  >
                                      <Icon type="setting" />
                                  </Popover>
                              }
                          />
                      )}
                  </Form.Item>
                  <Form.Item className="name1113">
                      {getFieldDecorator('username1', {
                          initialValue: '123123',
                          rules: [
                              { required: true, message: 'Please input your username!' }
                          ]
                      })(
                          <Box
                              afterIcon={
                                  <Popover
                                      getPopupContainer={() => document.querySelector('.name1113')
                                      }
                                      content={
                                          <div>
                                              <div>
                          122222222222222222222221222222222222222222222222222222222222223222
                                              </div>
                                              <div>12</div>
                                          </div>
                                      }
                                      visible
                                      placement="bottom"
                                  >
                                      <Icon type="setting" />
                                  </Popover>
                              }
                          />
                      )}
                  </Form.Item>
                  {/* <Form.Item
                      validateStatus={passwordError ? 'error' : ''}
                      help={passwordError || ''}
                  >
                      {getFieldDecorator('password', {
                          rules: [
                              { required: true, message: 'Please input your Password!' }
                          ]
                      })(
                          <Search
                              onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  event.target.blur();
                              }}
                              placeholder="input search text"
                              enterButton={
                                  <Popover
                                      content="12222222222222222222222222"
                                      visible
                                      placement="bottom"
                                  >
                                      <Icon type="setting" />
                                  </Popover>
                              }
                          />
                      )}
                  </Form.Item> */}
                  <Form.Item>
                      <Button type="primary" htmlType="submit">
              Log in
                      </Button>
                  </Form.Item>
              </Form>
          </div>
      );
  }
}

export default Form.create()(Demo);
