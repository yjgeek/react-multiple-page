import React, { useState } from 'react'
import { HashRouter, Switch, Link, Redirect } from "react-router-dom";
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
import AuthRouter from 'components/authRouter';
import styles from './index.module.less'
const { Header, Content, Sider, Footer } = Layout;
function BaseLayout(props = {}) {
  const { routers = [], menus = [] } = props || [];
  const router = routers.filter(item => item.path === props.location.pathname)[0] || {}
  const breads = router.bread || [];
  return (
    <div className="base-layout">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={256}
          trigger={null}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            zIndex: 100
          }}
        >
          <div className={styles.logo} />
          <TraverseMenu sources={menus} />
        </Sider>
        <Layout style={{ paddingLeft: '256px' }}>
          <Header className={styles.header}>
            <div className={styles.nav}>
              <Menu mode="horizontal" style={{float: 'right'}}>
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="setting" />设置
                    </span>
                  }
                >
                  <Menu.Item key="setting:1"><Link to="/"><Icon type="user" />修改密码</Link></Menu.Item>
                  <Menu.Item key="setting:2"><Link to="/login"><Icon type="user" />退出登录</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </div>
            <Breadcrumb className={styles.breadcrumb}>
              {
                breads.map(item => {
                  if (typeof item === 'object') {
                    return (
                      <Breadcrumb.Item key={item.text}><Link to={item.path}>{item.text}</Link></Breadcrumb.Item>
                    )
                  } else {
                    return (
                      <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                    )
                  }
                })
              }
            </Breadcrumb>
          </Header>

          <Content className={styles.main} style={{height: 'calc(100vh - 78px - 69px - 24px)', overflow: 'auto'}}>
            <HashRouter>
              <Switch>
                {
                  routers.map(item => {
                    const Component = item.component; 
                    return <AuthRouter exact path={item.path} key={item.path} component={
                      props => <Component  {...props} routers={routers} />
                    }></AuthRouter>
                  })
                }
                <Redirect from='*' to='/404' />
              </Switch>
            </HashRouter>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ReactMultiplePage只为让前端早点下班</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export function TraverseMenu(props) {
  const sources = props.sources || [];
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  function menu(sources) {
    return sources.map(item => {
      if (item.children) {
        return <SubMenu key={item.path} title={
          <span>
            <Icon type={item.icon} />
            <span>{item.text}</span>
          </span>
        }>
          {menu(item.children)}
        </SubMenu>
      } else {
        return (
          <Menu.Item key={item.path}>
            <Icon type={item.icon} />
            <Link to={item.path}>{item.text}</Link>
          </Menu.Item>
        )
      }
    })
  }
  return (
    <Menu
      theme='dark'
      style={{ width: 256 }}
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
      mode="inline"
      onSelect={
        e => setSelectedKeys([e.key])
      }
    >
      {menu(sources)}
    </Menu>
  )
}
export default BaseLayout;