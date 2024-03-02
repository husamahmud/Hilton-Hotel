import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export function SignUp() {

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');
  const confirmPassword = useRef({});
  confirmPassword.current = watch('confirmPassword', '');

  const signup = async (data) => {
    console.log(data);
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
    <form onSubmit={handleSubmit(signup)}>
      <div>
        <label htmlFor="fName">First Name</label>
        <input type="text" required minLength={3} {...register('fName')} />
      </div>
      <div>
        <label htmlFor="lName">Last Name</label>
        <input type="text" required minLength={3} {...register('lName')} />
      </div>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" required minLength={6} {...register('username')} />
      </div>
      <div>
        <label htmlFor="birthDate">Birth Date</label>
        <input type="date" required {...register('birthDate')} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input type="text" required minLength={4} {...register('country')} />
      </div>
      <div>
        <label htmlFor="nationalID">National ID</label>
        <input type="text" required minLength={9} {...register('nationalID')} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" required {...register('email')} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" ref={password} required minLength={6} {...register('password')} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" ref={confirmPassword} required minLength={6} {...register('confirmPassword')} />
        {password.current !== confirmPassword.current && <p>Passwords do not match.</p>}
      </div>

      <button type="submit">
        Sign Up
      </button>
    </form>

  );
}
