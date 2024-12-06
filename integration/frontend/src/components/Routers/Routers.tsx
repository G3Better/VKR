import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Registr from "../Registration/Registr";
import ProtectedRouters from "./ProtectedRouters";
import Users from "../Users/Users";
import Orders from "../Orders/Orders";
import Systems from "../Systems/Systems";
import Networks from "../Networks/Networks";
import Ips from "../Ips/Ips";
import Authorizations from "../Authorizations/Authorizations";
import Contours from "../Contours/Contours";
import {roles} from "../../utills/roleUtills";
import {getAuthorizations} from "../../controllers/AuthorizationsController";

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
          <Route path="/orders" element={<Orders />} />
          <Route path="/systems" element={<Systems/>} />
          <Route path="/ips" element={<Ips/>} />
        </Route>
      </Routes>
    </Router>
  );
};
export default Routers;
