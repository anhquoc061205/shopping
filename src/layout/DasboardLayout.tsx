import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`${key}`}>{label}</Link>, //nhap option 1 trên giao diện thì link tới https://localhost:5173/dasboard/1
  } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Product", "product", <PieChartOutlined />),  //nhấn cái label này => https://localhost:5173/dasboard/product
    getItem("User", "user", <UserOutlined />)  //nhấn cái label này => https://localhost:5173/dasboard/user
];

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "User" }, { title: "Bill" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* nơi chưa content */}
            {/* nhấn cái label nào thi render ra giao dien lien quan */}
            {/* gen ra những thằng con */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Truong ©{new Date().getFullYear()} Created 
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
