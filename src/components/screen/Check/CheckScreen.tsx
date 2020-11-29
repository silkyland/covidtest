import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input } from "reactstrap";
import Swal from "sweetalert2";
import config from "../../../config";
import "../Home/home.css";

moment.locale("th");

const CheckScreen = (props: any) => {
  const _handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${config.api.server}/covid/check`, {
        citizen_id: citizenId,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
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
    setCitizenId("");
  };

  const _handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCitizenId(e.target.value);
  };

  const [citizenId, setCitizenId] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container>
        <div className="bg-gradient body-container border-radius-10 shadow-sm p-3 bg-white">
          <div className="head-menu">
            <div className="logo text-cmru-yellow text-center">
              CMRU <br />
              <span style={{ fontSize: 12 }}>COVID TEST</span>
            </div>
            <div className="right-menus">V.1.0.0-beta1</div>
          </div>
          <div className="p-5">
            <div className="main-content">
              <h1>ตรวจสอบผล</h1>
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
                        <Button color="primary" className="mt-2">
                          <i className="fa fa-check" aria-hidden="true"></i>{" "}
                          ตรวจสอบผล
                        </Button>
                      </div>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckScreen;
