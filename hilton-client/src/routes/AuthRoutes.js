import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "../components/SignUp/SignUp";
import { Login } from "../components/Login/Login";
import { ForgetPassword } from "../components/Forgetpassword/Forgetpassword";
import { ResetPassword } from "../components/Resetpassword/ResetPassword";
import { AdminSignUp } from "../components/AdminSignUp/AdminSignUp";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="register" element={<SignUp />} />

      <Route path="adminregister" element={<AdminSignUp />} />

      <Route path="login" element={<Login />} />

      <Route path="forgetpassword" element={<ForgetPassword />} />

      <Route path="resetpassword" element={<ResetPassword />} />
    </Routes>
  );
}

export default AuthRoutes;
