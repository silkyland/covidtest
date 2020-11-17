import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Col, Container, Row, Table } from "reactstrap";
import faker from "faker";
import _ from "lodash";

import "./tv.css";
import { AnyAction } from "redux";

const BillboardScreen = (props: any): JSX.Element => {
  const renderFakeAPI = () => {
    let data: any = [];
    let i = 1;
    _.times(48, () => {
      data.push({ queqe: i, name: faker.name.findName() });
      i++;
    });

    return data
      .sort((a: any, b: any) => b.queqe - a.queqe)
      .map((d: any) => (
        <p className="text-bigger">
          <strong>คิว {d.queqe}</strong> {d.name}{" "}
          <span className="text-success text-italic-25">ผลออกแล้ว</span>
        </p>
      ));
  };
  return (
    <div>
      <Container fluid>
        <h1 className="mt-2" style={{ fontSize: 30, fontWeight: "bolder" }}>
          รายชื่อผลการตรวจ RAPID TEST <small>* โปรดตรวจสอบผลที่ช่องทางออก</small>
        </h1>
        <div className="bg-white rounded p-3 mt-1">
          <article>{renderFakeAPI()}</article>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BillboardScreen);
