import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/css/adminlte.css";
import "./assets/css/adminlte.min.css";
import { UserSidebar } from "./components/layouts/UserSidebar";
import { UserNavbar } from "./components/layouts/UserNavbar";
import { Route, Routes } from "react-router-dom";
import { UserDashboard } from "./components/user/UserDashboard";
import { UserProfile } from "./components/user/UserProfile";
import { AddProduct } from "./components/vendor/AddProduct";
import { VenderSidebar } from "./components/vendor/VendorSidebar";
import { Signup } from "./components/common/Signup";
import axios from "axios";
import { Login } from "./components/common/Login";

function App() {

  axios.defaults.baseURL = "http://localhost:8000";


  return (
    <body className="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
      <div className="app-wrapper">
        <Routes>
          <Route path="/signup" element = {<Signup/>}></Route>
          <Route path="/login" element = {<Login/>}></Route>
          
          <Route path="/user" element={<UserSidebar />}>
            <Route path="dashboard" element={<UserDashboard />}></Route>
            <Route path="profile" element={<UserProfile />}></Route>
          </Route>

          <Route path="/vendor" element={<VenderSidebar />}>
            <Route path="addproduct" element={<AddProduct />}></Route>
          </Route>
        </Routes>
      </div>
    </body>
  );
}

export default App;
