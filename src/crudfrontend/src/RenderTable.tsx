import React from 'react';
import { Table, Empty, Spin } from 'antd';
import { Column } from './types';

type TableProps<T> = {
  data: T[],
  columns: Column[],
  title: string,
  isFetching: boolean
}

function RenderTable<T extends { id: number }>({
  data,
  columns,
  title,
  isFetching
}: TableProps<T>
) {
    if (isFetching) {
        return <Spin />
    }
    if (!isFetching && data.length <= 0) {
        return <Empty />
    }

    return (
        <Table
        dataSource={data}
        columns={columns}
        title={() => `${title}`}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        rowKey={(element: T) => element.id}
        />
    )
}

export default RenderTable;