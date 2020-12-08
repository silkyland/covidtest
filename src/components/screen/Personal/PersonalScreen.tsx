import Axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import config from "../../../config";
import {
  deletePersonal,
  fetchPersonals,
  addPersonal,
} from "../../../store/actions/personal";
import { Personal, StatusPersonal } from "../../../utils/interface";
const PersonalScreen = (props: any): JSX.Element => {
  const { personal, personals } = props.personal;

  const [input, setInput] = useState({
    personal_id: "",
    citizen_id: "",
    status_personal: 1,
    prefix: "",
    name: "",
    surname: "",
    institute: 1,
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
        institute: 1,
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
    props.fetchPersonals();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
    try {
      e.preventDefault();
      const personal = isEdit
        ? await Axios.put(`${config.api.server}/covid/updatePersonal`, input)
        : await Axios.post(`${config.api.server}/covid/createPersonal`, input);
      if (personal.status === 200) {
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          text: "ข้อมูลของคุณได้ถูกบันทึกลงฐานข้อมูลเรียบร้อยแล้ว",
          icon: "success",
          position: "top-right",
        });
        props.createPersonal({ ...input, personal_id: personal.data[0] });
        setInput({
          personal_id: "",
          citizen_id: "",
          status_personal: 1,
          prefix: "",
          name: "",
          surname: "",
          institute: 1,
        });
        setIsEdit(false);
        setIsOpen(false);
      }
    } catch (error) {
      Swal.fire({
        title: "ผิดพลาด",
        text: error?.response?.data?.message,
        icon: "error",
        position: "center",
      });
      console.log(error);
    }
  };

  const handleDeletePersonal = (personal_id: number) => {
    Swal.fire({
      title: "แน่ใจหรือกไม่ที่จะลบข้อมูลนี้ออก ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "แน่ใจ",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deletePersonal(personal_id);
      }
    });
  };

  return (
    <div className="m-3">
      <Button onClick={toggleForm} color="primary">
        <i className="fa fa-plus"></i> เพิ่มข้อมูลใหม่
      </Button>
      {isOpen ? (
        <div className="mt-3">
          <h2>เพิ่มข้อมูล</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label>รหัสบัตรประชาชน</Label>
                  <Input
                    name="citizen_id"
                    value={input.citizen_id}
                    onChange={handleChangeInput}
                    placeholder="กรอกรหัสบัตรประชาชน"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>มหาวิทยาลัย</Label>
                  <Input
                    required
                    type="select"
                    onChange={(e: any) =>
                      setInput({ ...input, institute: e.target.value })
                    }
                  >
                    <option value={1}>มหาวิทยาลัยราชภัฏเชียงใหม่</option>
                    <option value={2}>มหาวิทยาลัยราชภัฏเชียงราย</option>
                    <option value={3}>มหาวิทยาลัยราชภัฏลำปาง</option>
                    <option value={4}>มหาวิทยาลัยราชภัฏอุตรดิตถ์</option>
                    <option value={5}>มหาวิทยาลัยราชภัฏเพชรบูรณ์</option>
                    <option value={6}>มหาวิทยาลัยราชภัฏกำแพงเพชร</option>
                    <option value={7}>มหาวิทยาลัยราชภัฏพิบูลสงคราม</option>
                    <option value={8}>มหาวิทยาลัยราชภัฏนครสวรรค์</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>ประเภท</Label>
                  <Input
                    required
                    type="select"
                    onChange={(e: any) =>
                      setInput({ ...input, status_personal: e.target.value })
                    }
                  >
                    {statusPersonals.map((s: StatusPersonal) => (
                      <option key={s.status_id} value={s.status_id}>
                        {s.status_personal}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={2}>
                <FormGroup>
                  <Label>คำนำหน้า</Label>
                  <Input
                    type="text"
                    name="prefix"
                    value={input.prefix}
                    onChange={handleChangeInput}
                    placeholder="กรอกคำนำหน้า"
                    required
                  />
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

            <Button type="submit" color="primary">
              <i className="fa fa-save"></i> บันทึกข้อมูล
            </Button>
          </Form>
          <hr />
        </div>
      ) : (
        <DataTable
          title="รายชื่อผู้บันทึกข้อมูลใหม่"
          pagination
          columns={[
            {
              name: "รหัสบัตรประชาชน",
              selector: "citizen_id",
              // format: (row: any) => `${row.prefix}${row.name} ${row.surname}`,
            },
            {
              name: "ชื่อสกุล",
              selector: "name",
              format: (row: any) => `${row.prefix}${row.name} ${row.surname}`,
            },
            {
              name: "จัดการ",
              button: true,
              cell: (row: Personal) => (
                <Button
                  onClick={() => handleDeletePersonal(row.personal_id)}
                  color="outline-danger"
                  size="sm"
                >
                  ลบออก
                </Button>
              ),
            },
          ]}
          data={personals}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  personal: state.personal,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchPersonals: () => dispatch(fetchPersonals()),
  createPersonal: (input: Personal) => dispatch(addPersonal(input)),
  deletePersonal: (personal_id: number) =>
    dispatch(deletePersonal(personal_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalScreen);
