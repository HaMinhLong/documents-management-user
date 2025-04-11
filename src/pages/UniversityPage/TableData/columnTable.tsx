/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Popconfirm } from "antd";
import { UserStatusType } from "@/type/global";
import { useMessage } from "@/context/MessageContext";
import { TypeUniversity, useDeleteUniversityMutation } from "@/api/university";

interface PropsType {
  getList: any;
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useColumnTable = ({
  getList,
  setEditId,
  setIsModalVisible,
}: PropsType) => {
  const messageApi = useMessage();
  const [deleteRecord] = useDeleteUniversityMutation();

  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "left",
    },
    {
      title: "Tên trường học",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: UserStatusType) => {
        return <div>{status}</div>;
      },
    },
    {
      title: "Action",
      render: (record: TypeUniversity) => {
        return (
          <div className="flex gap-x-2">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setIsModalVisible(true);
                setEditId(record?.id || 0);
              }}
            >
              Sửa
            </Button>

            <Popconfirm
              title="Xác nhận xoá"
              description="Bạn có chắc chắn muốn xoá bản ghi này không?"
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={() => {
                deleteRecord({ id: record?.id || 0 }).then((res: any) => {
                  if (res?.data?.success) {
                    messageApi.success("Xoá bản ghi thành công");
                    getList();
                  } else {
                    messageApi.error(" Xoá bản ghi không thành công");
                  }
                });
              }}
            >
              <Button color="danger" variant="link">
                Xoá
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};
