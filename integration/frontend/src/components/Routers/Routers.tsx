import React from "react";
import {Route, BrowserRouter as Router, Routes, NavLink} from "react-router-dom";
import Login from "../Login/Login";
import Registr from "../Registration/Registr";
import ProtectedRouters from "./ProtectedRouters";
import Users from "../Users/Users";
import Orders_table from "../Orders_table/Orders_table";
import Orders from "../Orders_v2/Orders";
import Systems from "../Systems/Systems";
import Networks from "../Networks/Networks";
import Ips from "../Ips/Ips";
import Roles from "../Roles/Roles";
import Endpoints from "../Endpoints/Endpoints";
import Status from "../Status/Status";
import RequestRates from "../RequestRates/RequestRates";
import Authorizations from "../Authorizations/Authorizations";
import Contours from "../Contours/Contours";
import {roles} from "../../utills/roleUtills";

const Routers: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registr" element={<Registr />} />
        <Route element={<ProtectedRouters />}>
          {roles.client !== localStorage.getItem("role") && <Route path="/users" element={<Users />} />}
          {roles.client !== localStorage.getItem("role") && <Route path="/authorizations" element={<Authorizations />} />}
          {roles.client !== localStorage.getItem("role") && <Route path="/contours" element={<Contours />} />}
          {roles.client !== localStorage.getItem("role") && <Route path="/networks" element={<Networks />} />}
          {roles.client !== localStorage.getItem("role") && <Route path="/request_rates" element={<RequestRates />} />}
          {roles.client !== localStorage.getItem("role") && <Route path="/roles" element={<Roles />} />}
          {roles.client !== localStorage.getItem("role") && <Route path="/status" element={<Status />} />}
          {roles.client !== localStorage.getItem("role") && <Route path="/endpoints" element={<Endpoints />} />}
          <Route path="/orders" element={<Orders_table />} />
          <Route path="/order/:id" element={<Orders />} />
          <Route path="/systems" element={<Systems/>} />
          <Route path="/ips" element={<Ips/>} />
        </Route>
      </Routes>
    </Router>
  );
};
export default Routers;
