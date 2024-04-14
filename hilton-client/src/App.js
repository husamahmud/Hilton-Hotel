import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes.js";
import Main from "./components/Main/Main"
import { DashBoardRoutes } from "./routes/DashBoard.js";
import { NotFound } from "./components/NotFound/NotFound.jsx";
import { AdminRoutes } from "./routes/ProtectedRoutes.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard/*" element={<DashBoardRoutes />} />
        </Route>

        <Route path="/error/notfound" element={<NotFound />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </Router>
  );

export default App;