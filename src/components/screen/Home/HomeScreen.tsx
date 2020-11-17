import React, { useEffect, useState } from "react";
import Skelaton from "react-loading-skeleton";
import { connect } from "react-redux";
import { Alert, Button, Col, Form, FormGroup, Input, Table } from "reactstrap";
import { checkin, fetchQueqe } from "../../../store/actions/covid";
import { CovidTest } from "../../../utils/interface";
import moment from "moment";
import "moment/locale/th";
import "./home.css";
import _ from "lodash";

moment.locale("th");

const HomeScreen = (props: any) => {
  const _handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.checkin(citizenId);
    setCitizenId("");
  };

  const _handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCitizenId(e.target.value);
  };

  const [citizenId, setCitizenId] = useState("");

  useEffect(() => {
    props.fetchQueqe();
  }, []);

  const { queqes, covid, covids } = props;

  return (
    <div>
      <div className="p-5">
        <div className="main-content">
          <h1>จุดที่ 1 รับบัตรคิว</h1>
          {!_.isEmpty(covid.error) ? (
            <Alert color="danger">
              <h4>{covid.error.message}</h4> {covid.error.trace}
            </Alert>
          ) : null}

          <div className="m-5">
            <Form onSubmit={_handleSubmitSearch}>
              <FormGroup row>
                <Col sm={{ size: 8, offset: 2 }}>
                  <Input
                    autoFocus
                    className="placeholder-center"
                    placeholder="กรอกหมายเลขบาร์โค๊ดที่นี่"
                    bsSize="lg"
                    value={citizenId}
                    onChange={_handleChangeInput}
                  />
                  <div className="center">
                    <Button color="outline-primary" className="mt-2 mr-2">
                      <i className="fa fa-id-card-o" aria-hidden="true"></i>{" "}
                      รับคิว
                    </Button>
                    <Button
                      onClick={() => {
                        props.history.push("/reprint");
                      }}
                      color="outline-warning"
                      className="mt-2"
                    >
                      <i className="fa fa-print" aria-hidden="true"></i>{" "}
                      พิมพ์คิวใหม่
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
                    <th>รหัส</th>
                    <th>คิว</th>
                    <th>ชื่อ-สกุล</th>
                    <th>เวลา</th>
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
                        <td>{queqe.citizen_id}</td>
                        <td>{queqe.queqe_id}</td>
                        <td>{queqe.fullname}</td>
                        <td>
                          {moment(queqe.checkin_datetime).format("lll")} น.
                        </td>
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
  covid: state.covid.covid,
  covids: state.covid.covids,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchQueqe: () => dispatch(fetchQueqe()),
  checkin: (citizen_id: string) => dispatch(checkin(citizen_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
