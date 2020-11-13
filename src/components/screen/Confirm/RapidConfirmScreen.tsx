import axios from "axios";
import { set } from "lodash";
import moment from "moment";
import "moment/locale/th";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import Swal from "sweetalert2";
import config from "../../../config/index";
import { CovidTest, CovidTestResult } from "../../../utils/interface";
import "../Home/home.css";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { fetchQueqe } from "../../../store/actions/covid";
import Skelaton from "react-loading-skeleton";

moment.locale("th");

const RapidConfirmScreen = (props: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const [input, setInput] = useState({
    citizen_id: "",
    status: CovidTestResult.PASS,
  });

  const { queqes } = props;

  const checkTab = async () => {
    const tab = await localStorage.getItem("tab");
    if (!tab) {
      await localStorage.setItem("tab", "0");
      setActiveTab(0);
    } else {
      setActiveTab(parseInt(tab));
    }
  };
  useEffect(() => {
    props.fetchQueqe();
    checkTab();
  }, []);

  const _handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const respose = await axios.post(
        `${config.api.server}/covid/rapidTestConfirm`,
        {
          citizen_id: input.citizen_id,
        }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "ข้อมูลได้ถูกส่งไปยังเครื่งพิมพ์เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      setInput({ ...input, citizen_id: "" });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const _handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangeTab = async (index: number): Promise<void> => {
    await localStorage.setItem("tab", index.toString());
    setActiveTab(index);
  };

  return (
    <div>
      <div className="p-5">
        <div className="main-content">
          <h1>บันทึกผลตรวจ COVID-19</h1>
          <div className="mt-5">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === 0 ? "active" : ""}
                    onClick={() => {
                      handleChangeTab(0);
                    }}
                  >
                    <i className="fa fa-fighter-jet" aria-hidden="true"></i>{" "}
                    RAPID TEST
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === 1 ? "active" : ""}
                    onClick={() => {
                      handleChangeTab(1);
                    }}
                  >
                    <i
                      className="fa fa-thermometer-full"
                      aria-hidden="true"
                    ></i>{" "}
                    PCR TEST
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="bg-white p-3">
                <TabPane tabId={0}>
                  <Row>
                    <Col sm="12">
                      <h4 className=" text-color-default">บันทึกผลการตรวจ RAPID TEST</h4>
                      <Form onSubmit={_handleSubmitSearch}>
                        <FormGroup row>
                          <Col sm={{ size: 8, offset: 2 }}>
                            <FormGroup tag="fieldset">
                              <legend>Radio Buttons</legend>
                              <FormGroup check>
                                <Label check>
                                  <Input type="radio" name="radio1" /> Option
                                  one is this and that—be sure to include why
                                  it's great
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="radio" name="radio1" /> Option
                                  two can be something else and selecting it
                                  will deselect option one
                                </Label>
                              </FormGroup>
                            </FormGroup>
                            <Input
                              autoFocus
                              className="placeholder-center"
                              placeholder="กรอกหมายเลขบาร์โค๊ดที่นี่"
                              bsSize="lg"
                              value={input.citizen_id}
                              onChange={_handleChangeInput}
                            />
                            <div className="center">
                              <Button color="outline-primary" className="mt-2">
                                <i
                                  className="fa fa-print"
                                  aria-hidden="true"
                                ></i>{" "}
                                บันทึกผล
                              </Button>
                            </div>
                          </Col>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                  <div className="bg-white rounded">
                    <h4 className="text-dark p-3">
                      <i className="fa fa-user" aria-hidden="true"></i>{" "}
                      รายการผลการตรวจสอบ
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
                            queqes.data.map(
                              (queqe: CovidTest, index: number) => (
                                <tr key={index}>
                                  <td>{queqe.citizen_id}</td>
                                  <td>{queqe.queqe_id}</td>
                                  <td>{queqe.fullname}</td>
                                  <td>
                                    {moment(queqe.checkin_datetime).format(
                                      "lll"
                                    )}{" "}
                                    น.
                                  </td>
                                </tr>
                              )
                            )
                          )}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </TabPane>
                <TabPane tabId={1}>
                  <Row>
                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </CardText>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </CardText>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RapidConfirmScreen);
