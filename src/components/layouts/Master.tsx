import React, { useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import CheckScreen from "../screen/Check/CheckScreen";
import CheckoutScreen from "../screen/Checkout/CheckoutScreen";
import ConfirmScreen from "../screen/Confirm/ConfirmScreen";
import HomeScreen from "../screen/Home/HomeScreen";
import ReprintScreen from "../screen/Print/ReprintScreen";
import "./master.css";

const Master = (props: any) => {
  const menuList = [
    { id: 1, to: "/", icon: "fa-id-card-o", name: "รับบัตรคิว" },
    { id: 2, to: "/rapid", icon: "fa-thermometer", name: "RAPIDTEST" },
    { id: 3, to: "/checkout", icon: "fa-check", name: "รับสติกเกอร์" },
    {
      id: 4,
      external: true,
      to: "/pcr",
      icon: "fa-shield",
      name: "PRCTEST",
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
            <div className="right-menus">V.0.0.1-beta1</div>
          </div>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <HomeScreen {...props} />}
              />

              <Route
                path="/result"
                render={(props) => <ConfirmScreen {...props} />}
              />
              <Route
                path="/check"
                render={(props) => <CheckScreen {...props} />}
              />
              <Route
                path="/reprint"
                render={(props) => <ReprintScreen {...props} />}
              />
              <Route
                path="/checkout"
                render={(props) => <CheckoutScreen {...props} />}
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
