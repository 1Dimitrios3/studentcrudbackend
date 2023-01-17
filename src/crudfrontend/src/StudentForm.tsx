import React, { useState } from 'react';
import { Form, Row, Col, Input, Select, Button, Spin } from 'antd';
import { Student } from './types';
import { LoadingOutlined } from '@ant-design/icons';
import { createStudent, editStudent } from './Operations';

const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

type StudentFormProps = {
    onClose: () => void
    fetchStudents: () => void
    selectedStudent?: Student
}

const initialStudent = {
    name: undefined,
    email: undefined,
    gender: undefined
};

function StudentForm({
    onClose,
    fetchStudents,
    selectedStudent
}: StudentFormProps) {
    const [submitting, setSubmitting] = useState(false);

    const onFinish = (values: Student) => {
        setSubmitting(true);
        if (selectedStudent) {
            editStudent(
                {...selectedStudent, ...values},
                fetchStudents,
                onClose,
                setSubmitting);
        } else {
            createStudent(
                values,
                fetchStudents,
                onClose,
                setSubmitting
            )
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        // alert(JSON.stringify(errorInfo, null, 2));
    };

    const fieldsData = Object.entries((selectedStudent || initialStudent) as Partial<Student>).map((student) => ({
        name: student[0],
        value: student[1]
    }));

    return (
        <Form layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        fields={fieldsData}
        hideRequiredMark>
      <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                  name="name"
                  label="Name"
                  rules={[{required: true, message: 'Please enter student name'}]}
              >
                  <Input
                   placeholder="Please enter student name"/>
              </Form.Item>
          </Col>
          <Col span={12}>
              <Form.Item
                  name="email"
                  label="Email"
                  rules={[{required: true, message: 'Please enter student email'}]}
              >
                  <Input placeholder="Please enter student email"/>
              </Form.Item>
          </Col>
      </Row>
      <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                  name="gender"
                  label="gender"
                  rules={[{required: true, message: 'Please select a gender'}]}
              >
                  <Select placeholder="Please select a gender">
                      <Option value="MALE">MALE</Option>
                      <Option value="FEMALE">FEMALE</Option>
                      <Option value="OTHER">OTHER</Option>
                  </Select>
              </Form.Item>
          </Col>
      </Row>
      <Row>
          <Col span={12}>
              <Form.Item >
                  <Button
                    type="primary"
                    htmlType="submit"
                    >
                      Submit
                  </Button>
              </Form.Item>
          </Col>
      </Row>
      <Row>
        {submitting && <Spin indicator={antIcon} />}
      </Row>
  </Form>
    )
}

export default StudentForm;