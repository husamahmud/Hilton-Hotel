import {Link, useNavigate} from 'react-router-dom';
import {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

export function ResetPassword() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
	} = useForm();

	const password = useRef(null);
	password.current = watch('password', '');
	const confirmPassword = useRef(null);
	confirmPassword.current = watch('confirmPassword', '');

	const signin = async (data) => {
		const url = 'http://localhost:3000/api/v1/auth/password/reset';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const res = await fetch(url, options);
		const user = await res.json();
		if (res.status === 200) navigate('/')
		console.log(user);
	};

	return (
		<div className="login">
			<div className="title">
				<h2>Reset!</h2>
				<p>We are delighted to have you back!</p>
			</div>

			<form className="login-form"
			      onSubmit={handleSubmit(signin)}>
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
