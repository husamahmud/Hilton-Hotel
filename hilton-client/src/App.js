import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes.js";
import Main from "./components/Main/Main"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/auth/*"
				       element={<AuthRoutes />} />
				<Route path="/*"
				       element={<Main />} />
			</Routes>
		</Router>
	);
}

export default App;
