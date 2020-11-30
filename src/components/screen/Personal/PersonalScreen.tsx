import React, {
  Dispatch,
  FormEvent,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { create } from "lodash";
import Axios from "axios";
import config from "../../../config";
import { Personal, StatusPersonal } from "../../../utils/interface";
import Swal from "sweetalert2";
const PersonalScreen = (props: any): JSX.Element => {
  const [input, setInput] = useState({
    personal_id: "",
    citizen_id: "",
    status_personal: 1,
    prefix: "",
    name: "",
    surname: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [statusPersonals, setStatusPersonals] = useState([]);

  const handleChangeInput = (e: any) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
    if (!isEdit) {
      setInput({
        personal_id: "",
        citizen_id: "",
        status_personal: 1,
        prefix: "",
        name: "",
        surname: "",
      });
    }
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleEditButtonClick = (data: any) => {
    setInput(data);
  };

  const fetchStatusPersonal = async (): Promise<void> => {
    const response = await Axios.get(
      `${config.api.server}/covid/statusPersonal`
    );
    setStatusPersonals(response.data);
  };

  useEffect(() => {
    fetchStatusPersonal();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
    try {
      e.preventDefault();
      const personal = isEdit
        ? await Axios.put(`${config.api}/covid/updatePersonal`, input)
        : await Axios.post(`${config.api}/covid/createPersonal`, input);
      if (personal.status === 200) {
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          text: "ข้อมูลของคุณได้ถูกบันทึกลงฐานข้อมูลเรียบร้อยแล้ว",
          icon: "success",
          position: "top-right",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "ผิดพลาด",
        text: "เกิดข้อผิดพลาดขณะบันทึกข้อมูลดังนี้",
        icon: "error",
        position: "center",
      });
      console.log(error);
    }
  };

  return (
    <div className="m-3">
      <h1>เพิ่มข้อมูล</h1>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={2}>
            <FormGroup>
              <Label>คำนำหน้า</Label>
              <Input type="text" placeholder="กรอกคำนำหน้า" required />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label>ชื่อ</Label>
              <Input
                name="name"
                placeholder="กรอกชื่อ"
                value={input.name}
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label>สกุล</Label>
              <Input
                name="surname"
                value={input.surname}
                onChange={handleChangeInput}
                placeholder="กรอกนามสกุล"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input
            type="select"
            onChange={(e: any) =>
              setInput({ ...input, status_personal: e.target.value })
            }
          >
            <option>โปรดเลือก</option>
            {statusPersonals.map((s: StatusPersonal) => (
              <option key={s.status_id} value={s.status_id}>
                {s.status_personal}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Button type="submit" color="primary">
          <i className="fa fa-save"></i> บันทึกข้อมูล
        </Button>
      </Form>
    </div>
  );
};

export default PersonalScreen;
