import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { fetchBillboards } from "../../../store/actions/covid";
import { CovidTest } from "../../../utils/interface";
import "./tv.css";


const BillboardScreen = (props: any): JSX.Element => {
  useEffect(() => {
    props.fetchBillboards();
  }, []);
  const { billboards } = props;
  return (
    <div>
      <Container fluid>
        <h1 className="mt-2" style={{ fontSize: 30, fontWeight: "bolder" }}>
          รายชื่อผลการตรวจ RAPID TEST{" "}
          <small>* โปรดตรวจสอบผลที่ช่องทางออก</small>
        </h1>
        <div className="bg-white rounded p-3 mt-1">
          <article>
            {billboards.data.map((bb: CovidTest) => (
              <p className="text-bigger" key={bb.citizen_id}>
                <strong>คิว {bb.queqe_id}</strong> {bb.fullname}{" "}
                <span className="text-success text-italic-25">ผลออกแล้ว</span>
              </p>
            ))}
          </article>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  billboards: state.covid.billboards,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchBillboards: () => dispatch(fetchBillboards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillboardScreen);
