import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Master from "./components/layouts/Master";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" render={(props) => <Master {...props} />} />
      </Router>
    </div>
  );
}

export default App;
