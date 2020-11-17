import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Master from "./components/layouts/Master";
import "./App.css";
import BillboardScreen from "./components/screen/Billboard/BillboardScreen";
import RapidTestScreen from "./components/screen/RapidTest/RapidTestScreen";
import PCRTestScreen from "./components/screen/PCRTest/PCRTestScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/tv" component={BillboardScreen} />
          <Route path="/rapid" component={RapidTestScreen} />
          <Route path="/pcr" component={PCRTestScreen} />
          <Route path="/" render={(props) => <Master {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
