import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import NearbySupplies from "./NearbySupplies";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/add-data">
            <div>Add info </div>
          </Route>
          <Route path="/nearby-places">
            <NearbySupplies />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
