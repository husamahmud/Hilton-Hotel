// export default function App() {
//   return (
//     <>
//       <div>
//         {
//         /* <Aside />
//         {children}
//         <Footer /> */
//         }
//       </div>
//     </>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.js";
import PublicRoutes from "./routes/PublicRoutes.js";
import LoginComponent from "./components/LoginComponent.jsx";
// import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/auth/" element={<PublicRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
