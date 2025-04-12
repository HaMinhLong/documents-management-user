import React, { useState } from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Space,
  Tag,
  Spin,
  Image,
  Empty,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  GetListDocumentApiResponse,
  TypeCategory,
  useGetListDocumentQuery,
} from "@/api/document";
import {
  GetListSubjectApiResponse,
  TypeSubject,
  useGetListSubjectQuery,
} from "@/api/subject";
import { DownloadOutlined, EyeFilled } from "@ant-design/icons";
import { handleGetFile } from "@/utils";
import Sider from "antd/es/layout/Sider";
import {
  GetListUniversityApiResponse,
  useGetListUniversityQuery,
} from "@/api/university";
import {
  GetListCategoryApiResponse,
  useGetListCategoryQuery,
} from "@/api/category";

const { Content } = Layout;

interface Filters {
  subject_id: number | null;
  category_id: number | null;
  university_id: number | null;
}
const DocumentList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    subject_id: null,
    category_id: null,
    university_id: null,
  });

  const { data, isLoading } = useGetListDocumentQuery({
    subject_id: filters?.subject_id || undefined,
    category_id: filters?.category_id || undefined,
    university_id: filters?.university_id || undefined,
    status: "active",
  });

  const { data: subjectsData, isLoading: isLoadingSubjects } =
    useGetListSubjectQuery({});

  const { data: universityData } = useGetListUniversityQuery({});

  const { data: categoryData } = useGetListCategoryQuery({});

  const documentList = data as GetListDocumentApiResponse;
  const subjects = subjectsData as GetListSubjectApiResponse;
  const universities = universityData as GetListUniversityApiResponse;
  const categories = categoryData as GetListCategoryApiResponse;

  const handleFilter = (type: keyof Filters, id: number): void => {
    setFilters((prev: Filters) => ({
      ...prev,
      [type]: prev[type] === id ? null : id,
    }));
  };

  return (
    <Layout>
      <Sider width={250} className="bg-white p-4">
        <h3 className="text-lg font-semibold mb-4">Lọc tài liệu</h3>
        <Spin spinning={isLoadingSubjects}>
          <div className="mb-6">
            <h4 className="text-base font-medium mb-2">Trường học</h4>
            <Menu
              mode="inline"
              selectedKeys={
                filters.university_id ? [String(filters.university_id)] : []
              }
              onClick={({ key }) =>
                handleFilter("university_id", parseInt(key))
              }
            >
              {universities?.data?.data?.map((subject: TypeSubject) => (
                <Menu.Item key={subject.id}>{subject.name}</Menu.Item>
              ))}
            </Menu>
          </div>

          <div className="mb-6">
            <h4 className="text-base font-medium mb-2">Môn học</h4>
            <Menu
              mode="inline"
              selectedKeys={
                filters.subject_id ? [String(filters.subject_id)] : []
              }
              onClick={({ key }) => handleFilter("subject_id", parseInt(key))}
            >
              {subjects?.data?.data?.map((subject: TypeSubject) => (
                <Menu.Item key={subject.id}>{subject.name}</Menu.Item>
              ))}
            </Menu>
          </div>

          <div>
            <h4 className="text-base font-medium mb-2">Chuyên ngành</h4>
            <Menu
              mode="inline"
              selectedKeys={
                filters.category_id ? [String(filters.category_id)] : []
              }
              onClick={({ key }) => handleFilter("category_id", parseInt(key))}
            >
              {categories?.data?.data?.map((category: TypeCategory) => (
                <Menu.Item key={category.id}>{category.name}</Menu.Item>
              ))}
            </Menu>
          </div>
        </Spin>
      </Sider>

      <Content className="p-6 bg-gray-100 min-h-screen">
        <Spin spinning={isLoading}>
          <Row gutter={[16, 16]}>
            {documentList?.data?.data?.length === 0 && (
              <Col span={24}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Col>
            )}
            {documentList?.data?.data?.map((doc) => (
              <Col xs={24} sm={12} md={8} lg={6} key={doc.id}>
                <Card
                  onClick={() => navigate(`/document/${doc.id}`)}
                  hoverable
                  className="border border-gray-200 rounded-lg"
                  cover={
                    <Image
                      className="w-full !h-[200px] object-cover"
                      preview={true}
                      src={
                        doc?.fileImages?.[0]?.image_path
                          ? handleGetFile(
                              doc?.fileImages?.[0]?.image_path || ""
                            )
                          : "https://www.testo.com/images/not-available.jpg"
                      }
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
                      {doc?.price === 0
                        ? "Miễn phí"
                        : `${Number(doc?.price).toLocaleString("vi-VN")} VNĐ`}
                    </span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Spin>
      </Content>
    </Layout>
  );
};

export default DocumentList;
