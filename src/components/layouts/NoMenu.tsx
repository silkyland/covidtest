import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import CheckoutScreen from "../screen/Checkout/CheckoutScreen";
import HomeScreen from "../screen/Home/HomeScreen";
import ReprintScreen from "../screen/Print/ReprintScreen";
import "./master.css";

const NoMenu = (props: any) => {
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
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <HomeScreen {...props} />}
              />
              <Route
                path="/checkout"
                render={(props) => <CheckoutScreen {...props} />}
              />
              <Route
                path="/reprint"
                render={(props) => <ReprintScreen {...props} />}
              />
              {/* <Route
                path="/covid/result"
                render={(props) => <ConfirmScreen {...props} />}
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
              /> */}
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

export default NoMenu;
