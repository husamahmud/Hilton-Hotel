import {useState} from 'react';
import {useForm} from 'react-hook-form';
import './Login.css';

export function Login() {
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const {
		register: login,
		handleSubmit,
	} = useForm()

	const signin = async (data) => {
		if (!data.email.includes('@')) {
			data.username = data.email;
			delete data.email;
		}
		const url = 'http://localhost:3000/api/v1/auth/login';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const res = await fetch(url, options);
		if (!res.ok) {
			const errorsData = await res.json();
			if (errorsData.error === 'User is not found') setEmailError(errorsData.error);
			else if (errorsData.error === 'Password is not correct') setPasswordError(errorsData.error);
			else console.log(errorsData.error);
		} else {
			setEmailError(null)
			setPasswordError(null)
			const user = await res.json();
			console.log(user);
		}
	}

	return (
		<>
			<h1>Login</h1>

			<form className="login-form"
			      onSubmit={handleSubmit(signin)}>
				<div>
					<label htmlFor="emailorusername">Email or Username</label>
					<input type="text"
					       id="emailorusername"
					       required
					       {...login('email' || 'username')} />
					{emailError && <p>{emailError}</p>}
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password"
					       id="password"
					       required
					       minLength={6} {...login('password')} />
					{passwordError && <p>{passwordError}</p>}
				</div>

				<button type="submit">Login</button>
			</form>
		</>
	)
}
