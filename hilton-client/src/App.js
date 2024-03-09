import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes.js';
import {Home} from './components/Home/Home';
import {DashBoardRoutes} from './routes/DashBoard.js';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/auth/*"
				       element={<AuthRoutes />} />
				<Route path="/"
				       element={<Home />} />
				<Route path="/dashboard/*"
						element={< DashBoardRoutes/>} />
			</Routes>
		</Router>
	);
}

export default App;
