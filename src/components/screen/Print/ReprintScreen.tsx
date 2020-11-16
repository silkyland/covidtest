import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input } from "reactstrap";
import Swal from "sweetalert2";
import config from "../../../config/index";
import "../Home/home.css";

moment.locale("th");

const ReprintScreen = (props: any) => {
  const _handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const respose = await axios.post(`${config.api.server}/covid/reprint`, {
        citizen_id: citizenId,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "ข้อมูลได้ถูกส่งไปยังเครื่งพิมพ์เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      setCitizenId("");
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
    setCitizenId(e.target.value);
  };

  const [citizenId, setCitizenId] = useState("");

  return (
    <div>
      <div className="p-5">
        <div className="main-content">
          <h1>พิมพ์คิวใหม่</h1>
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
                    <Button color="outline-warning" className="mt-2">
                      <i className="fa fa-print" aria-hidden="true"></i>{" "}
                      พิมพ์คิวใหม่
                    </Button>
                  </div>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReprintScreen;
