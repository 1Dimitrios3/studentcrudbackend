import React, { useState, useEffect } from 'react';
import {
  Breadcrumb,
  Layout,
  Menu
} from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import RenderTable from './RenderTable';
import { renderStudentColumns } from './StudentColumns';
import { getAllStudents } from './StudentService';
import { Student, MenuItem, getItem, ErrorResponse } from './types';
import './App.css';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { errorNotification } from './Notification';

const items: MenuItem[] = [
  getItem('Users', '1', <TeamOutlined />),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')])
];

const backGroundColor = 'rgba(255, 255, 255, 0.2)';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [collapsed, setCollapsed] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (!showDrawer) {
      setSelectedStudent(undefined);
    }
  }, [showDrawer, setSelectedStudent]);


  const fetchStudents = () => {
    setIsFetching(true);
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        setStudents(data)
      })
      .catch((err) => {
        console.log(err.response);
        err.response.json()
          .then((res: ErrorResponse) => {
          errorNotification(
            'An unexpected error occured',
            `${res.message} [statusCode]: ${res.status} [${res.error}]`
            )
        })
      })
      .finally(() => setIsFetching(false));
  }

      const studentColumns = renderStudentColumns(
        fetchStudents,
        setShowDrawer,
        setSelectedStudent
        );

  return(
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: backGroundColor }} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: backGroundColor }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 360, background: backGroundColor }}>
          <RenderTable
            data={students}
            columns={studentColumns}
            isFetching={isFetching}
            fetchData={fetchStudents}
            drawerTitle={`${selectedStudent === undefined ? 'Create' : 'Edit'} a student`}
            btnTitle='Add New Student'
            setShowDrawer={setShowDrawer}
            showDrawer={showDrawer}
            selectedEntity={selectedStudent}
            />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Dimitris 2023</Footer>
    </Layout>
  </Layout>
  )
}

export default App;

