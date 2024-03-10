import {useNavigate, useLocation} from 'react-router-dom';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';

export function ResetPassword() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
	} = useForm();

	const location = useLocation();
	const password = useRef(null);
	password.current = watch('password', '');
	const confirmPassword = useRef(null);
	confirmPassword.current = watch('confirmPassword', '');

	const resetPass = async (data) => {
		const userId = location.state.user.user.id;
		console.log(location)
		console.log(data)
		const url = `http://localhost:3000/api/v1/auth/password/reset/${userId}`;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const res = await fetch(url, options);
		const user = await res.json();
		console.log(user);
		if (res.status === 200) navigate('/')
	};

	return (
		<div className="login">
			<div className="title">
				<h2>Reset!</h2>
				<p>please enter your new password</p>
			</div>

			<form className="login-form"
			      onSubmit={handleSubmit(resetPass)}>
				<div>
					<input type="password"
					       placeholder="Password"
					       id="password"
					       ref={password}
					       required
					       minLength={6} {...register('password')} />
				</div>
				<div>
					<input type="password"
					       placeholder="Confirm Password"
					       id="confirmPassword"
					       ref={confirmPassword}
					       required
					       minLength={6} {...register('confirmPassword')} />
					{password.current !== confirmPassword.current &&
						<p className="error">Passwords do not match.</p>}
				</div>

				<button type="submit">Reset</button>
			</form>
		</div>
	)
}
