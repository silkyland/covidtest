import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Master from "./components/layouts/Master";
import "./App.css";
import BillboardScreen from "./components/screen/Billboard/BillboardScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/tv" component={BillboardScreen} />
        <Route path="/covid" render={(props) => <Master {...props} />} />
      </Router>
    </div>
  );
}

export default App;
