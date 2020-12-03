import React, { useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import CheckScreen from "../screen/Check/CheckScreen";
import CheckoutScreen from "../screen/Checkout/CheckoutScreen";
import ConfirmScreen from "../screen/Confirm/ConfirmScreen";
import HomeScreen from "../screen/Home/HomeScreen";
import PCRTestScreen from "../screen/PCRTest/PCRTestScreen";
import PersonalScreen from "../screen/Personal/PersonalScreen";
import ReprintScreen from "../screen/Print/ReprintScreen";
import RapidTestScreen from "../screen/RapidTest/RapidTestScreen";
import ReportScreen from "../screen/Report/ReportScreen";
import "./master.css";

const Master = (props: any) => {
  const menuList = [
    {
      id: 1,
      to: "/covid",
      icon: "fa-id-card-o",
      name: "รับบัตรคิว",
    },
    {
      id: 2,
      to: "/covid/rapid",
      icon: "fa-thermometer",
      name: "RAPIDTEST",
    },
    {
      id: 3,
      to: "/covid/checkout",
      icon: "fa-check",
      name: "รับสติกเกอร์",
    },
    {
      id: 4,
      external: true,
      to: "/covid/pcr",
      icon: "fa-shield",
      name: "PCRTEST",
    },
    {
      id: 5,
      external: true,
      to: "/covid/report",
      icon: "fa-dashboard",
      name: "รายงาน",
    },
  ];
  const menuIndex: Number = menuList.findIndex(
    (v) => v.to === props.history.location.pathname
  );

  const [active, setActive] = useState(menuIndex);

  const handleSetActiveMenu = (index: Number) => {
    setActive(index);
  };

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
            <nav>
              <ul className="menu-list">
                {menuList.map((item, index) => (
                  <li
                    key={index}
                    className={`rounded ${index === active ? "active" : ""}`}
                  >
                    <Link
                      onClick={() => handleSetActiveMenu(index)}
                      to={item.to}
                      className="menu-item "
                    >
                      <i
                        className={`fa ${item.icon} fa-2x text-light`}
                        aria-hidden="true"
                      ></i>
                      <span className="text-light">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="right-menus">V.1.0.0-beta1</div>
          </div>
          <div>
            <Switch>
              <Route
                exact
                path="/covid"
                render={(props) => <HomeScreen {...props} />}
              />

              <Route
                path="/covid/result"
                render={(props) => <ConfirmScreen {...props} />}
              />
              <Route
                path="/covid/confirm"
                render={(props) => <ConfirmScreen {...props} />}
              />
              <Route
                path="/covid/reprint"
                render={(props) => <ReprintScreen {...props} />}
              />
              <Route
                path="/covid/checkout"
                render={(props) => <CheckoutScreen {...props} />}
              />
              <Route
                path="/covid/report"
                render={(props) => <ReportScreen {...props} />}
              />
              <Route
                exact
                path="/covid/rapid"
                render={(props) => <RapidTestScreen {...props} />}
              />
              <Route
                path="/covid/pcr"
                render={(props) => <PCRTestScreen {...props} />}
              />
              <Route
                path="/covid/personal"
                render={(props) => <PersonalScreen {...props} />}
              />

              <Redirect path="*" to="404" />
            </Switch>
          </div>
        </div>
        <small className="text-muted">
          &copy; 2020 Chiang Mai Rajabhat University
        </small>
      </Container>
    </div>
  );
};

export default Master;
