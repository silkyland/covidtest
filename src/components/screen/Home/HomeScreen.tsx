import React, { useEffect } from "react";
import Skelaton from "react-loading-skeleton";
import { connect } from "react-redux";
import { Alert, Button, Col, Form, FormGroup, Input, Table } from "reactstrap";
import { fetchQueqe } from "../../../store/actions/covid";
import { CovidTest } from "../../../utils/interface";
import "./home.css";
const HomeScreen = (props: any) => {
  const _handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    props.fetchQueqe();
  }, []);

  const { queqes } = props;

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
            {queqes.isLoading ? (
              <Skelaton count={5} />
            ) : queqes.error ? (
              <Alert color="danger">
                {queqes.error.message} <p>{queqes.error.trace}</p>
              </Alert>
            ) : (
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
                  {queqes.data.length < 1 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        = ไม่พบข้อมูล =
                      </td>
                    </tr>
                  ) : (
                    queqes.data.map((queqe: CovidTest, index: number) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{queqe.citizen_id}</td>
                        <td>{queqe.queqe_id}</td>
                        <td>{queqe.fullname}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  error: state.app.error,
  loading: state.app.loading,
  queqes: state.covid.queqes,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchQueqe: () => dispatch(fetchQueqe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
