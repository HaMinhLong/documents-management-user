import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import "./index.css";

const { Header } = Layout;

const HeaderPage = () => {
  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "#fff",
  };

  const menuItems = [
    {
      key: "document",
      label: <Link to="/document">Tài liệu</Link>,
    },
    {
      key: "university",
      label: <Link to="/university">Trường học</Link>,
    },
    {
      key: "subject",
      label: <Link to="/subject">Môn học</Link>,
    },
    {
      key: "category",
      label: <Link to="/category">Chuyên ngành</Link>,
    },
    {
      key: "recharge",
      label: <Link to="/recharge">Nạp tiền</Link>,
    },
    {
      key: "download-document",
      label: <Link to="/download-document">Tải tài liệu</Link>,
    },
  ];

  return (
    <Header style={headerStyle}>
      <div className="demo-logo" />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["dashboard"]}
        items={menuItems}
        className="flex-1 w-fit"
      />
    </Header>
  );
};

export default HeaderPage;
