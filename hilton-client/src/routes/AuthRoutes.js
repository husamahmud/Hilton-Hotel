import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {SignUp} from '../components/SignUp/SignUp';
import {Login} from '../components/Login/Login';

function AuthRoutes() {
	return (
		<Routes>
			<Route path="register"
			       element={<SignUp />} />

			<Route path="login"
			       element={<Login />} />

			{/*<Route path="forgot-password" element={<ForgotPasswordComponent />} />
      <Route path="reset-password" element={<ResetPasswordComponent />} />*/}
		</Routes>
	);
}

export default AuthRoutes;
