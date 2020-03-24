import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Contributors from "./Contributors";
import Homepage from "./Homepage";
import NearbySupplies from "./NearbySupplies";
import AddInfo from "./AddInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/add-data">
            <AddInfo />
          </Route> 
          <Route path="/contributors">
            <Contributors />
          </Route>
          <Route path="/nearby-places">
            <NearbySupplies />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
