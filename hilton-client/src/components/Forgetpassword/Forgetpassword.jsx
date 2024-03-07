import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

export function ForgetPassword() {
	const [emailError, setEmailError] = useState(null);
	// const navigate = useNavigate();

	const {
		register: login,
		handleSubmit,
	} = useForm()

	const signin = async (data) => {
		const url = 'http://localhost:3000/api/v1/auth/password/forget';
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
			else console.log(errorsData.error);
		} else {
			setEmailError(null)
			const user = await res.json();
			// navigate('/');
			console.log(user);
		}
	}

	return (
		<div className="login">
			<div className="title">
				<h2>Forget Password</h2>
				<p>Please enter your email!</p>
			</div>

			<form className="login-form"
			      onSubmit={handleSubmit(signin)}>
				<div>
					<input type="text"
					       placeholder="Email"
					       id="email"
					       required
					       {...login('email')} />
					{emailError && <p>{emailError}</p>}
				</div>

				<div>
					<Link to="/auth/login"
					      className="link"
					      style={{color: '#aa8453'}}>
						Sign In
					</Link>
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	)
}
