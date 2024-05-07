import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes.js";
import Main from "./components/Main/Main"
import {DashBoardRoutes} from "./routes/DashBoard.js";
// import {NotFound} from "./components/NotFound/NotFound.jsx";
import {AdminRoutes} from "./routes/ProtectedRoutes.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard/*"
                 element={<DashBoardRoutes />} />
        </Route>
        <Route path="/auth/*"
               element={<AuthRoutes />} />
        <Route path="/*"
               element={<Main />} />
        {/*<Route path="*"*/}
        {/*       element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
}
