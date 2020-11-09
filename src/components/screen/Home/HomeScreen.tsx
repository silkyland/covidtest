import React, { useRef } from "react";
import { Alert, Button, Col, Form, FormGroup, Input, Table } from "reactstrap";
import "./home.css";
const HomeScreen = (props: object) => {
  const _handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="p-5">
        <div className="main-content">
          <h1>เช็คอินรับบัตรคิว</h1>
          <Alert color="danger">
            <h4>มีข้อผิดพลาด</h4> ไม่สามารถอธิบายได้
          </Alert>
          <div className="m-5">
            <Form onSubmit={_handleSubmitSearch}>
              <FormGroup row>
                <Col sm={{ size: 8, offset: 2 }}>
                  <Input
                    autoFocus
                    className="placeholder-center"
                    placeholder="กรอกหมายเลขบาร์โค๊ดที่นี่"
                    bsSize="lg"
                  />
                  <div className="center">
                    <Button color="outline-primary" className="mt-2 mr-2">
                      <i className="fa fa-search" aria-hidden="true"></i> ค้นหา
                    </Button>
                    <Button color="outline-warning" className="mt-2">
                      <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                      เพิ่มใหม่
                    </Button>
                  </div>
                </Col>
              </FormGroup>
            </Form>
          </div>
          <div className="bg-white rounded">
            <h4 className="text-dark p-3">
              <i className="fa fa-user" aria-hidden="true"></i> รายชื่อ
            </h4>
            <Table striped hover className="tableBodyScroll rounded">
              <thead>
                <tr>
                  <th>#</th>
                  <th>รหัส</th>
                  <th>คิว</th>
                  <th>ชื่อ-สกุล</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1251200011314</td>
                  <td>1</td>
                  <td>สมชาย แปงคำเอ้ย</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1251200011313</td>
                  <td>2</td>
                  <td>รักษา รักษ์สัตย์</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
