import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import React, { useEffect, useRef } from "react";
import { Alert, Button, Col, Form, FormGroup, Input, Table } from "reactstrap";
import "./home.css";
import { fetchBillboard } from "../../../store/actions/covid";
import Skelaton from "react-loading-skeleton";
import { CovidTest } from "../../../utils/interface";
const HomeScreen = (props: any) => {
  const _handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    props.fetchBillboard();
  }, []);

  const { billboards } = props;

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
            {billboards.isLoading ? (
              <Skelaton count={5} />
            ) : billboards.error ? (
              <Alert color="danger">
                {billboards.error.message} <p>{billboards.error.trace}</p>
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
                  {billboards.data.length < 1 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        = ไม่พบข้อมูล =
                      </td>
                    </tr>
                  ) : (
                    billboards.map((billboard: CovidTest, index: number) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{billboard.citizen_id}</td>
                        <td>{billboard.queqe_id}</td>
                        <td>{billboard.citizen_id}</td>
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
  billboards: state.covid.billboards,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchBillboard: () => dispatch(fetchBillboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
