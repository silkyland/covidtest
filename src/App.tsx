import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Master from "./components/layouts/Master";
import NoMenu from "./components/layouts/NoMenu";
import BillboardScreen from "./components/screen/Billboard/BillboardScreen";
import CheckScreen from "./components/screen/Check/CheckScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/tv" component={BillboardScreen} />
          <Route path="/check" component={CheckScreen} />
          <Route
            path="/covid"
            render={(props) => <Master {...props} />}
          />
          <Route path="/" render={(props) => <NoMenu {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
