import _ from "lodash";
import moment from "moment";
import "moment/locale/th";
import React, { useEffect, useState } from "react";
import Skelaton from "react-loading-skeleton";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import {
  fetchPCRTestList,
  fetchRapidTestList,
  submitTestResult,
} from "../../../store/actions/covid";
import { CovidTest, CovidTestResult } from "../../../utils/interface";
import "../Home/home.css";

moment.locale("th");

const ConfirmScreen = (props: any): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const [input, setInput] = useState({
    citizen_id: "",
    status: CovidTestResult.PASS,
  });

  const { rapids } = props;

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
    props.fetchRapidTestList();
    props.fetchPCRTestList();
    checkTab();
  }, []);

  const _handleSelectRadioChange = (name: string, value: string): void => {
    setInput({ ...input, [name]: parseInt(value) });
  };

  const _handleChangeInput = (field: string, value: string) => {
    setInput({ ...input, [field]: value });
  };

  const _submitRapidTest = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    if (input.status === CovidTestResult.FAIL) {
      const confirmation = await Swal.fire({
        title: "แน่ใจหรือไม่ที่จะเลือกตัวเลือกนี้ ?",
        confirmButtonText: "ยืนยัน",
        showCancelButton: true,
      });
      if (!confirmation.isConfirmed) {
        return false;
      }
    }
    props.submitTestResult("RAPID", input.citizen_id, input.status);
    setInput({ ...input, citizen_id: "", status: CovidTestResult.PASS });
  };

  return (
    <div className="p-2">
      <Container fluid>
        <h1>จุดที่ 2 บันทึกผลตรวจ COVID-19</h1>
        <Row>
          <Col sm="12">
            <h4 className="text-color-333">บันทึกผลการตรวจ RAPID TEST</h4>
            {!_.isEmpty(props?.covid?.error) ? (
              <Alert color="danger">
                <h4>{props.covid?.error?.message} </h4>
                <p>{props.covid?.error?.trace}</p>
              </Alert>
            ) : null}
            <Form onSubmit={_submitRapidTest}>
              <FormGroup row>
                <Col sm={{ size: 8, offset: 2 }}>
                  <FormGroup tag="fieldset" className=" mt-5 text-color-333">
                    <FormGroup check className="mb-3">
                      <Label check className="mr-5 mb-3">
                        <Input
                          type="radio"
                          name="status"
                          value={CovidTestResult.PASS}
                          onChange={(e) =>
                            _handleSelectRadioChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          checked={input.status === CovidTestResult.PASS}
                        />{" "}
                        <span className="ml-3 font-2x"> 😀 ผลการตรวจผ่าน</span>
                      </Label>
                      <Label check>
                        <Input
                          type="radio"
                          name="status"
                          value={CovidTestResult.FAIL}
                          onChange={(e) =>
                            _handleSelectRadioChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          checked={input.status === CovidTestResult.FAIL}
                        />{" "}
                        <span className="ml-3 font-2x">
                          🤧 ผลการตรวจไม่ผ่าน
                        </span>
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Input
                    autoFocus
                    className="placeholder-center"
                    placeholder="กรอกหมายเลขบาร์โค๊ดที่นี่"
                    bsSize="lg"
                    value={input.citizen_id}
                    onChange={(e) =>
                      _handleChangeInput("citizen_id", e.target.value)
                    }
                  />
                  <div className="center">
                    <Button color="outline-primary" className="mt-2">
                      💾 บันทึกผล
                    </Button>
                  </div>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <div className="bg-white rounded">
          <h4 className="text-dark p-3">
            <i className="fa fa-user" aria-hidden="true"></i> รายการผลการตรวจสอบ
          </h4>
          {rapids.isLoading ? (
            <Skelaton count={5} />
          ) : rapids.error ? (
            <Alert color="danger">
              {rapids.error.message} <p>{rapids.error.trace}</p>
            </Alert>
          ) : (
            <Table striped hover className="tableBodyScroll rounded">
              <thead>
                <tr>
                  <th>ชื่อ-สกุล</th>
                  <th>คิว</th>
                  <th>เวลา</th>
                  <th>ผล</th>
                </tr>
              </thead>
              <tbody>
                {rapids.data.length < 1 ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      = ไม่พบข้อมูล =
                    </td>
                  </tr>
                ) : (
                  rapids.data.map((rapid: CovidTest, index: number) => (
                    <tr key={index}>
                      <td>{rapid.fullname}</td>
                      <td>{rapid.queqe_id}</td>
                      <td>
                        {moment(rapid.rapidtest_datetime).format("lll")} น.
                      </td>
                      <td
                        className={
                          rapid.rapidtest_status === 1
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {rapid.rapidtest_status === 1
                          ? "ต้องตรวจ PCR TEST"
                          : "ผ่าน"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  error: state.app.error,
  loading: state.app.loading,
  queqes: state.covid.queqes,
  covid: state.covid.covid,
  covids: state.covid.covids,
  rapids: state.covid.rapids,
  pcrs: state.covid.pcrs,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchRapidTestList: () => dispatch(fetchRapidTestList()),
  fetchPCRTestList: () => dispatch(fetchPCRTestList()),
  submitTestResult: (
    type: "RAPID" | "PCR",
    citizen_id: string,
    status: CovidTestResult.PASS | CovidTestResult.FAIL
  ) => dispatch(submitTestResult(type, citizen_id, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen);
