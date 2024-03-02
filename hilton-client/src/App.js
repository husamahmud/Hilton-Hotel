import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes.js";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
      </Router>
  );
}

export default App;
