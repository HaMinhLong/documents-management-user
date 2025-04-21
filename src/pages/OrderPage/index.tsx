import React, { useEffect, useState } from "react";
import { Table, Typography, Image, Layout, Button, message } from "antd";
import { handleGetFile } from "@/utils";
import PageContainer from "@/layouts/PageContainer";

const { Content } = Layout;

const OrderPage = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  }, []);

  const handleRemove = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    message.success("Đã xóa khỏi đơn hàng!");
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "fileImages",
      key: "image",
      render: (fileImages: any[]) => (
        <Image
          width={60}
          src={
            fileImages?.[0]?.image_path
              ? handleGetFile(fileImages?.[0]?.image_path || "")
              : "https://www.testo.com/images/not-available.jpg"
          }
        />
      ),
    },
    {
      title: "Tên tài liệu",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        price === 0
          ? "Miễn phí"
          : `${Number(price).toLocaleString("vi-VN")} VNĐ`,
    },
    {
      title: "Lượt xem",
      dataIndex: "view_count",
      key: "view_count",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => handleRemove(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <Layout className="bg-[#fff]" style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "16px" }} className="container mx-auto">
          <Typography.Title level={5} className="uppercase mb-4">
            Đơn hàng của bạn
          </Typography.Title>

          <Table
            columns={columns}
            dataSource={cart}
            rowKey="id"
            pagination={false}
            locale={{ emptyText: "Không có tài liệu nào trong đơn hàng." }}
          />

          <div className="mt-6 flex justify-end">
            <Button
              type="primary"
              disabled={cart.length === 0}
              onClick={() => {
                localStorage.removeItem("cart");
                setCart([]);
                message.success("Thanh toán thành công!");
              }}
            >
              Thanh toán
            </Button>
          </div>
        </Content>
      </Layout>
    </PageContainer>
  );
};

export default OrderPage;
