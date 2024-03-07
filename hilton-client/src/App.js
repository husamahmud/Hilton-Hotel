import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes.js';
import {Home} from './components/Home/Home';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/auth/*"
				       element={<AuthRoutes />} />
				<Route path="/"
				       element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
