import {Link, useNavigate} from 'react-router-dom';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import './SignUp.css';

export function SignUp() {
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

	const signup = async (data) => {
		const url = 'http://localhost:3000/api/v1/auth/register';
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
		<div className="signup">
			<div className="title">
				<h2>Sign Up</h2>
				<p>We're lucky having you in our extended family!</p>
			</div>

			<form className="signup-form"
			      onSubmit={handleSubmit(signup)}>
				<div className="name">
					<div>
						<input type="text"
						       id="fName"
						       placeholder="First Name"
						       required
						       minLength={3} {...register('fName')} />
					</div>
					<div>
						<input type="text"
						       placeholder="Last Name"
						       id="lName"
						       required
						       minLength={3} {...register('lName')} />

					</div>
				</div>
				<div> {/* TODO: validate the username is not used */}
					<input type="text"
					       placeholder="username"
					       id="username"
					       required
					       minLength={6} {...register('username')} />
				</div>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<label htmlFor="birthDate">Birth Date</label>
					<input type="date"
					       id="birthDate"
					       required {...register('birthDate')} />
				</div>
				<div>
					<input type="text"
					       placeholder="Country"
					       id="country"
					       required
					       minLength={4} {...register('country')} />
				</div>
				<div>
					<input type="text"
					       placeholder="National ID"
					       id="nationalID"
					       required
					       minLength={9} {...register('nationalID')} />
				</div>
				<div> {/* TODO: validate the email is not used */}
					<input type="email"
					       placeholder="Email"
					       id="email"
					       required {...register('email')} />
				</div>
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

				<button type="submit">
					Sign Up
				</button>

				<div className="login-btn">
					<p>
						Already have an account?
					</p>
					<Link to="/auth/login"
					      className="link"
					      style={{color: '#aa8453'}}>
						Login
					</Link>
				</div>
			</form>
		</div>
	);
}
