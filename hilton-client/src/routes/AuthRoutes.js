// PublicRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "../components/LoginCompenent/LoginComponent";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginComponent />} />
      {/* <Route path="register" element={<SignUpComponent />} />
      <Route path="forgot-password" element={<ForgotPasswordComponent />} />
      <Route path="reset-password" element={<ResetPasswordComponent />} />
       */}
    </Routes>
  );
}

export default AuthRoutes;
