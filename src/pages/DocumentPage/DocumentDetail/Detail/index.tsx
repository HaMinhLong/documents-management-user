import React, { useEffect, useState } from "react";
import { Form, Typography, Spin, Image, List, Avatar, Tabs } from "antd";
import { useParams, Link } from "react-router-dom";

import {
  GetDetailDocumentApiResponse,
  GetListDocumentApiResponse,
  useGetRelatedDocumentsQuery,
  useLazyGetDetailDocumentQuery,
} from "@/api/document";
import { handleGetFile } from "@/utils";

const { TabPane } = Tabs;

const DetailPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("document");

  const [getDetail, { data, isFetching }] = useLazyGetDetailDocumentQuery();
  const { data: relatedData, isFetching: isFetchingRelated } =
    useGetRelatedDocumentsQuery(
      {
        id: Number(id),
        subject_id:
          (data && "data" in data && data.data?.subject_id) || undefined,
        page: 1,
        limit: 5,
      },
      { skip: !(data && "data" in data && data.data?.subject_id) }
    );

  useEffect(() => {
    if (id) {
      getDetail({ id: Number(id) });
    }
  }, [id]);

  const dataDetail = data as GetDetailDocumentApiResponse;
  const relatedDocuments =
    (relatedData as GetListDocumentApiResponse)?.data?.data || [];

  useEffect(() => {
    if (dataDetail) {
      form.setFieldsValue({
        title: dataDetail?.data?.title || "",
        price: dataDetail?.data?.price || "",
        subject_id: dataDetail?.data?.subject_id || "",
        university_id: dataDetail?.data?.university_id || "",
        status: dataDetail?.data?.status || "pending",
        description: dataDetail?.data?.description || "",
      });
    }
  }, [data]);

  return (
    <Spin spinning={isFetching || isFetchingRelated}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex gap-x-6">
          {/* Bên trái: Hình ảnh demo, lượt xem, lượt tải */}
          <div className="w-1/5">
            <div className="bg-[#fff] p-5 h-fit mb-4 flex items-start justify-center">
              <Image
                src={
                  dataDetail?.data?.fileImages?.[0]?.image_path
                    ? handleGetFile(
                        dataDetail?.data?.fileImages?.[0]?.image_path || ""
                      )
                    : "https://www.testo.com/images/not-available.jpg"
                }
                className=" !w-full object-cover"
                preview
              />
            </div>
            <div className="flex justify-between">
              <Typography.Text>
                Lượt xem: {dataDetail?.data?.view_count || 0}
              </Typography.Text>
              <Typography.Text>
                Lượt tải: {dataDetail?.data?.download_count || 0}
              </Typography.Text>
            </div>
          </div>

          {/* Bên phải: Thông tin tài liệu và nội dung */}
          <div className="flex-1 bg-[#fff] p-5 h-full">
            <Typography.Title level={3}>
              Tên tài liệu: {dataDetail?.data?.title || "ABC"}
            </Typography.Title>
            <Typography.Text>
              Trường:{" "}
              {dataDetail?.data?.university?.name ||
                "Đại học Công nghiệp Hà Nội"}
            </Typography.Text>
            <br />
            <Typography.Text>
              Môn: {dataDetail?.data?.subject?.name || "Lập trình kỹ thuật"}
            </Typography.Text>
            <div className="flex justify-between items-center mt-2">
              <Typography.Text>
                Giá:{" "}
                {dataDetail?.data?.price === 0
                  ? "Miễn phí"
                  : `${Number(dataDetail?.data?.price).toLocaleString(
                      "vi-VN"
                    )} VNĐ`}
              </Typography.Text>
              {dataDetail?.data?.file_path && (
                <Link
                  to={`${process.env.REACT_APP_SEVER_URL}/${dataDetail?.data?.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Link tải
                </Link>
              )}
            </div>

            {/* Tabs: Mở tài liệu và Hình ảnh */}
            <div className="mt-4">
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab="Mở tài liệu" key="document">
                  {dataDetail?.data?.file_path &&
                  /\.(jpe?g|png|gif|bmp|webp)$/i.test(
                    dataDetail?.data?.file_path
                  ) ? (
                    <Image
                      src={handleGetFile(dataDetail?.data?.file_path)}
                      className="!max-h-[300px] !w-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(
                        `${process.env.REACT_APP_SEVER_URL}/${dataDetail?.data?.file_path}`
                      )}&embedded=true`}
                      width="100%"
                      height="1000px"
                      frameBorder="0"
                      title="Document Preview"
                    />
                  )}
                </TabPane>
                <TabPane tab="Hình ảnh" key="images">
                  {dataDetail?.data?.fileImages?.length ? (
                    <List
                      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                      dataSource={dataDetail?.data?.fileImages}
                      renderItem={(image) => (
                        <List.Item>
                          <Image
                            src={handleGetFile(image.image_path || "")}
                            className="!max-h-[150px] !w-full object-cover"
                            preview
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Typography.Text>Không có hình ảnh</Typography.Text>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>

          <div className="bg-[#fff] p-5 w-1/5">
            <Typography.Title level={4}>Tài liệu liên quan</Typography.Title>
            <Spin spinning={isFetchingRelated}>
              {relatedDocuments.length > 0 ? (
                <List
                  grid={{ gutter: 16, xs: 24, sm: 24, md: 24, lg: 24 }}
                  dataSource={relatedDocuments}
                  renderItem={(doc) => (
                    <List.Item>
                      <Link to={`/document/${doc?.id}`}>
                        <div className="border rounded-lg p-4 hover:shadow-md">
                          <Image
                            src={
                              doc?.fileImages?.[0]?.image_path
                                ? handleGetFile(
                                    doc?.fileImages?.[0]?.image_path || ""
                                  )
                                : "https://www.testo.com/images/not-available.jpg"
                            }
                            className="!max-h-[150px] !w-full object-cover mb-2"
                            preview={false}
                          />

                          <div className="font-semibold text-left">
                            {doc?.title || ""}
                          </div>
                          <Typography.Text>
                            Giá:{" "}
                            {doc?.price === 0
                              ? "Miễn phí"
                              : `${Number(doc?.price).toLocaleString(
                                  "vi-VN"
                                )} VNĐ`}
                          </Typography.Text>
                        </div>
                      </Link>
                    </List.Item>
                  )}
                />
              ) : (
                <Typography.Text>Không có tài liệu liên quan</Typography.Text>
              )}
            </Spin>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default DetailPage;
