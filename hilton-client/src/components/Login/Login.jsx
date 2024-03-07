import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import './Login.css';

export function Login() {
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const navigate = useNavigate();

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
			navigate('/');
			console.log(user);
		}
	}

	return (
		<div className="login">
			<div className='title'>
				<h2>Welcome!</h2>
				<p>We are delighted to have you back!</p>
			</div>

			<form className="login-form"
			      onSubmit={handleSubmit(signin)}>
				<div>
					<input type="text"
					       placeholder="Email or Username"
					       id="emailorusername"
					       required
					       {...login('email' || 'username')} />
					{emailError && <p>{emailError}</p>}
				</div>
				<div>
					<input type="password"
					       placeholder="Password"
					       id="password"
					       required
					       minLength={6} {...login('password')} />
					{passwordError && <p>{passwordError}</p>}
				</div>

				<div>
					<Link to="/auth/forgetpassword"
					      className="link">
						Forget Password?
					</Link>
					<Link to="/auth/register"
					      className="link"
					      style={{color: '#aa8453'}}>
						Sign up
					</Link>
				</div>

				<button type="submit">Login</button>
			</form>
		</div>
	)
}
