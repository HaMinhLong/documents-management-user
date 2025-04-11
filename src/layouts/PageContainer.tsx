import React from "react";
import { Avatar, Dropdown, Input, Layout, MenuProps, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import SiderPage from "./SiderPage";
import logoPage from "../assets/image/logo_page.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { handleGetFile } from "@/utils";
import { logout } from "@/features/auth/auth.slice";

const { Content, Footer } = Layout;
const { Search } = Input;

interface PropsType {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PropsType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());

    window.location.href = "/login";
  };

  const items: MenuProps["items"] = [
    {
      label: <Link to="/user/profile">Cài đặt tài khoản</Link>,
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: "Đăng xuất",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Content>
      <div className="h-[80px] pr-8 pl-2 flex items-center justify-between bg-[#fff]">
        <Link to="/">
          <img width="180" height="80" className="logo" src={logoPage} alt="" />
        </Link>

        <div className="flex-1 mx-4">
          <Search
            placeholder="Tìm kiếm tài liệu, môn học..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
            enterButton
            className="[&_input]:h-8"
          />
        </div>

        <SiderPage />

        {user && (
          <div className="flex flex-end p-[10px] z-[1001] cursor-pointer">
            <Dropdown menu={{ items }} placement="bottom">
              <Space>
                <Avatar
                  src={handleGetFile(user?.avatar || "")}
                  icon={!user?.avatar && <UserOutlined />}
                />
                <span style={{ cursor: "pointer" }}>
                  {user?.username || ""}
                </span>
              </Space>
            </Dropdown>
          </div>
        )}
      </div>

      <Layout>
        <Content style={{ overflow: "initial" }}>
          <div className="bg-[#eee]">{children}</div>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by SAS
          </Footer>
        </Content>
      </Layout>
    </Content>
  );
};

export default PageContainer;
