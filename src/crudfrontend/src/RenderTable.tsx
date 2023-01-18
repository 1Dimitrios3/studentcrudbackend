import React from 'react';
import { Table, Empty, Spin, Button, Badge, Tag } from 'antd';
import { Column } from './types';
import { PlusOutlined } from '@ant-design/icons';
import DrawerForm from './DrawerForm';

type TableProps<T> = {
  data: T[],
  columns: Column[],
  btnTitle: string,
  isFetching: boolean,
  drawerTitle: string,
  fetchData: () => void,
  setShowDrawer: (status: boolean) => void,
  selectedEntity?: T,
  showDrawer: boolean
}

type ButtonProps = {
  setShowDrawer: (status: boolean) => void,
  showDrawer: boolean,
  btnTitle: string
}

const RenderBtn: React.FC<ButtonProps> = ({
  setShowDrawer,
  showDrawer,
  btnTitle,
}) => (
    <Button
    onClick={() => setShowDrawer(!showDrawer)}
    type="primary"
    shape="round"
    icon={<PlusOutlined />} size="small"
    >
    {btnTitle}
  </Button>
);

function RenderTable<T extends { id: number }>({
  data,
  columns,
  btnTitle,
  isFetching,
  drawerTitle,
  setShowDrawer,
  showDrawer,
  selectedEntity,
  fetchData
}: TableProps<T>
) {
    if (isFetching) {
        return <Spin />
    }

    return (
      <>
      <DrawerForm
        title={drawerTitle}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        fetchData={fetchData}
        selectedEntity={selectedEntity}
      />
      {!isFetching && data.length <= 0 ?
      <>
        <RenderBtn
          setShowDrawer={setShowDrawer}
          showDrawer={showDrawer}
          btnTitle={btnTitle}
        />
        <Empty />
      </> :
        <Table
          dataSource={data}
          columns={columns}
          title={() =>
            <>
            <div style={{ marginBottom: '10px' }}>
            <Tag>Number of {`${btnTitle.slice(btnTitle.lastIndexOf(' '))}s`}</Tag>
            <Badge
              style={{ backgroundColor: '#1677ff' }}
              className="site-badge-count-109"
              count={data.length}
              showZero
            />
            </div>
            <RenderBtn
              setShowDrawer={setShowDrawer}
              showDrawer={showDrawer}
              btnTitle={btnTitle}
      />
            </>
        }
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 500 }}
        rowKey={(element: T) => element.id}
        />
      }
        </>
    )
}

export default RenderTable;