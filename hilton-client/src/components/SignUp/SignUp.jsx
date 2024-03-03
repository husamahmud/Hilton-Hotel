import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import './SignUp.css';

export function SignUp() {
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
		console.log(user);
	};

	return (
		<>
			<h1>Signup</h1>

			<form className="signup-form"
			      onSubmit={handleSubmit(signup)}>
				<div className="name">
					<div>
						<label htmlFor="fName">First Name</label>
						<input type="text"
						       id="fName"
						       required
						       minLength={3} {...register('fName')} />
					</div>
					<div>
						<label htmlFor="lName">Last Name</label>
						<input type="text"
						       id="lName"
						       required
						       minLength={3} {...register('lName')} />

					</div>
				</div>
				<div> {/* TODO: validate the username is not used */}
					<label htmlFor="username">username</label>
					<input type="text"
					       id="username"
					       required
					       minLength={6} {...register('username')} />
				</div>
				<div>
					<label htmlFor="birthDate">Birth Date</label>
					<input type="date"
					       id="birthDate"
					       required {...register('birthDate')} />
				</div>
				<div>
					<label htmlFor="country">Country</label>
					<input type="text"
					       id="country"
					       required
					       minLength={4} {...register('country')} />
				</div>
				<div>
					<label htmlFor="nationalID">National ID</label>
					<input type="text"
					       id="nationalID"
					       required
					       minLength={9} {...register('nationalID')} />
				</div>
				<div> {/* TODO: validate the email is not used */}
					<label htmlFor="email">Email</label>
					<input type="email"
					       id="email"
					       required {...register('email')} />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password"
					       id="password"
					       ref={password}
					       required
					       minLength={6} {...register('password')} />
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input type="password"
					       id="confirmPassword"
					       ref={confirmPassword}
					       required
					       minLength={6} {...register('confirmPassword')} />
					{password.current !== confirmPassword.current &&
						<p>Passwords do not match.</p>}
				</div>

				<button type="submit">
					Sign Up
				</button>
			</form>
		</>
	);
}
