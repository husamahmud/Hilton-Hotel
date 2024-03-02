// PublicRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
// import LoginComponent from "../components/LoginComponent";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<h1>hey</h1>} />
      <Route path="/signin" element={<h1>hello</h1>} />
    </Routes>
  );
}

export default PublicRoutes;
