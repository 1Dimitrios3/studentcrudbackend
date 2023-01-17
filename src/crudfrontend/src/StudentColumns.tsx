import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Space } from "antd";
import { removeStudent } from "./Operations";
import { Student } from "./types";

const TheAvatar = ({ name }: {name: string}) => {
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return <Avatar icon={<UserOutlined />} />
  }

  const split = trimmedName.split(" ");
  if (split.length === 1) {
    return <Avatar>{name.charAt(0)}</Avatar>
  }
  return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>
}

export const renderStudentColumns = (
  fetchData: () => void,
  setShowDrawer: (status: boolean) => void,
  setSelectedStudent: (std: Student) => void
  ) => [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string, student: Student) =>
        <TheAvatar name={student.name} />
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      key: 'action',
      render: (student: Student) => (
        <>
         <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Popconfirm
              placement='topRight'
              title={`Are you sure you want to delete ${student.name}`}
              onConfirm={() => removeStudent(student.id, fetchData)}
              okText='Yes'
              okType='primary'
              cancelText='No'
            >
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                size="small"
                danger
              >
                Delete
              </Button>
            </Popconfirm>

            <Button
                icon={<EditOutlined />}
                type="primary"
                size="small"
                style={{ backgroundColor: 'orange' }}
                onClick={() => {
                  setSelectedStudent(student);
                  setShowDrawer(true);
                }}
                danger
              >
                Update
              </Button>
            </Space>
          </>
      ),
    }
  ];