import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext.js";
import AuthRoutes from "./routes/AuthRoutes.js";
// import PrivateRoutes from './routes/PrivateRoutes';

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
