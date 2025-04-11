import React from "react";
import { Row, Col, Card, Space, Tag, Spin, Image } from "antd";

import {
  GetListDocumentApiResponse,
  useGetListDocumentQuery,
} from "@/api/document";
import { DownloadOutlined, EyeFilled } from "@ant-design/icons";
import { handleGetFile } from "@/utils";

const DocumentList = () => {
  const { data, isLoading } = useGetListDocumentQuery({});

  const documentList = data as GetListDocumentApiResponse;

  return (
    <Spin spinning={isLoading}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-xl font-semibold mb-4">Phổ biến</h2>
        <Row gutter={[16, 16]}>
          {documentList?.data?.data?.map((doc) => (
            <Col xs={24} sm={12} md={8} lg={6} key={doc.id}>
              <Card
                hoverable
                className="border border-gray-200 rounded-lg"
                cover={
                  <Image
                    className="w-full !h-[200px] object-cover"
                    preview={false}
                    src={handleGetFile(doc.instruct_path || "")}
                    alt=""
                  />
                }
              >
                <div className="flex justify-between items-center mb-2">
                  <Space>
                    <DownloadOutlined />
                    <span>{doc?.download_count || 0}</span>
                  </Space>

                  <Space>
                    <EyeFilled />
                    <span>{doc?.view_count || 0}</span>
                  </Space>
                </div>
                <h3 className="text-base font-medium">{doc.title}</h3>

                <div className="flex justify-between mt-2 items-center">
                  <div className="flex flex-wrap gap-1">
                    {doc.documentCategories?.map((category) => (
                      <Tag key={category?.category?.id} color="blue">
                        #{category?.category?.name}
                      </Tag>
                    ))}
                  </div>

                  <span className="text-teal-500 font-semibold">
                    {Number(doc.price).toLocaleString("vi-VN")} VND
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Spin>
  );
};

export default DocumentList;
