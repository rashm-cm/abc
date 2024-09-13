import React from 'react';  // Add this import
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Logout from "./Authentication/Logout";
import AdminHome from "./Pages/AdminHome";
import Configure from "./Pages/Configure";
import Enroll from "./Pages/Enroll";
import Terminate from "./Pages/Terminate";
import ArchiveTable from "./Pages/ArchiveData";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/enroll-service" element={<Enroll />} />
      <Route path="/terminate-service" element={<Terminate />} />
      <Route path="/configure-service" element={<Configure />} />
      <Route path="/archive" element={<ArchiveTable />} />
    </Routes>
  );
};

export default App;
