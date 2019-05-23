import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import IconFont from "components/iconFont";
import styles from './index.module.less'
import bg from './bg.png'
import storage from 'utils/storage'
@Form.create()
export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        storage.setItem('user', 'true')
        this.props.history.push('/')
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div className={styles.login} style={{ background: `url(${bg})` }}>
      <div className={styles.form}>
        <div className={styles.title}><strong>ReactMultiplePage</strong> <small>平台管理系统</small></div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '账号不能为空' }],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入账号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空' }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '验证码不能为空' }],
            })(
              <div className={styles.code}>
                <Input size="large" prefix={<IconFont type="code" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="请输入右侧验证码" />
                <img src="https://api.yjgeek.com/captcha/default?Ad1OkEM7" alt=""/>
              </div>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" style={{width: '100%'}} htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>)
  }
}