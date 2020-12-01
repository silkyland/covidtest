import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import {
  fetchBillboards,
  fetchBillboardsNoLoadingTime,
} from "../../../store/actions/covid";
import { CovidTest } from "../../../utils/interface";
import "./tv.css";
import _ from "lodash";
import faker from "faker";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const BillboardScreen = (props: any): JSX.Element => {
  useEffect(() => {
    props.fetchBillboards();
    // startTimer();
  }, []);

  const startTimer = (): void => {
    setInterval(() => {
      props.fetchBillboardsNoLoadingTime();
    }, 5000);
  };

  const fakerB = (): any => {
    let data: any = [];
    let i = 1;
    _.times(187, () => {
      data.push({
        queqe_id: i,
        fullname: faker.name.findName(),
        citizen_id: faker.phone.phoneNumber(),
      });
      i++;
    });
    return data;
  };

  //const billboards: any = { isLoading: false, data: fakerB() };

  const { billboards } = props;

  let sliders: any[] = [];

  if (!billboards.isLoading) {
    sliders = _.chunk(billboards.data, 20);
  }

  const renderBackground = (
    row: number
  ): "background-odd" | "background-event" => {
    return row % 2 === 0 ? "background-odd" : "background-event";
  };

  return (
    <div>
      <Container fluid>
        <h1 className="mt-2" style={{ fontSize: 30, fontWeight: "bolder" }}>
          รายชื่อผลการตรวจ RAPID TEST{" "}
          <small>* โปรดตรวจสอบผลที่ช่องทางออก</small>{" "}
          <div className="float-right">จำนวนที่ผลออกแล้ว {billboards.data.length} ราย</div>
        </h1>

        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={10000}
          bullets={false}
          animation="cubeAnimation"
          organicArrows={false}
        >
          {sliders.map((sliderList, index) => {
            const arr: any = _.chunk(sliderList, 10);
            return (
              <div key={`_index_${index}`}>
                <Row>
                  <Col md={6}>
                    {arr[0]?.map((bb: CovidTest, index: number) => (
                      <p
                        className={`text-bigger ${renderBackground(index)} p-2`}
                        key={bb.citizen_id}
                      >
                        <strong>คิว {bb.queqe_id}</strong> {bb.fullname}{" "}
                        <span className="text-success text-italic-25">
                          ผลออกแล้ว
                        </span>
                      </p>
                    ))}
                  </Col>
                  <Col md={6} className="border-separator">
                    {arr[1]?.map((bb: CovidTest, index: number) => (
                      <p
                        className={`text-bigger ${renderBackground(index)} p-2`}
                        key={bb.citizen_id}
                      >
                        <strong>คิว {bb.queqe_id}</strong> {bb.fullname}{" "}
                        <span className="text-success text-italic-25">
                          ผลออกแล้ว
                        </span>
                      </p>
                    ))}
                  </Col>
                  {/* <Col md={4}>
                    {arr[2]?.map((bb: CovidTest) => (
                      <p className="text-bigger" key={bb.citizen_id}>
                        <strong>คิว {bb.queqe_id}</strong> {bb.fullname}{" "}
                        <span className="text-success text-italic-25">
                          ผลออกแล้ว
                        </span>
                      </p>
                    ))}
                  </Col> */}
                </Row>
              </div>
            );
          })}
        </AutoplaySlider>
        {/* <div className="bg-white rounded p-3 mt-1 tv-height">
          <Row>
            <Col>
              {arr[0]?.map((bb: CovidTest) => (
                <p className="text-bigger" key={bb.queqe_id + bb.citizen_id}>
                  <strong>คิว {bb.queqe_id}</strong> {bb.fullname}{" "}
                  <span className="text-success text-italic-25">ผลออกแล้ว</span>
                </p>
              ))}
            </Col>
            <Col>
              {arr[1]?.map((bb: CovidTest) => (
                <p className="text-bigger" key={bb.queqe_id + bb.citizen_id}>
                  <strong>คิว {bb.queqe_id}</strong> {bb.fullname}{" "}
                  <span className="text-success text-italic-25">ผลออกแล้ว</span>
                </p>
              ))}
            </Col>
            <Col>
              {arr[2]?.map((bb: CovidTest) => (
                <p className="text-bigger" key={bb.queqe_id + bb.citizen_id}>
                  <strong>คิว {bb.queqe_id}</strong> {bb.fullname}{" "}
                  <span className="text-success text-italic-25">ผลออกแล้ว</span>
                </p>
              ))}
            </Col>
          </Row>
        </div> */}
      </Container>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  billboards: state.covid.billboards,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchBillboards: () => dispatch(fetchBillboards()),
  fetchBillboardsNoLoadingTime: () => dispatch(fetchBillboardsNoLoadingTime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillboardScreen);
