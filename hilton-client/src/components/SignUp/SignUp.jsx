import { useForm } from 'react-hook-form';

export function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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
    // http://localhost:3000/api/v1/auth/register
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="fName">First Name</label>
        <input type="text" {...register('fName')} />
      </div>
      <div>
        <label htmlFor="lName">Last Name</label>
        <input type="text" {...register('lName')} />
      </div>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" {...register('username')} />
      </div>
      <div>
        <label htmlFor="birthDate">Birth Date</label>
        <input type="date" {...register('birthDate')} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input type="text" {...register('country')} />
      </div>
      <div>
        <label htmlFor="nationalID">National ID</label>
        <input type="text" {...register('nationalID')} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" {...register('email')} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" {...register('confirmPassword')} />
      </div>

      <button type="submit">
        Sign Up
      </button>
    </form>

    // <form>
    //   <h1>Sign Up</h1>
    //   <div>
    //     <label htmlFor="fName">First Name</label>
    //     <input type="text"
    //            id="fName" />
    //   </div>
    //   <div>
    //     <label htmlFor="lName">Last Name</label>
    //     <input type="text"
    //            id="lName" />
    //   </div>
    //
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input type="email"
    //            id="email" />
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input type="password"
    //            id="password" />
    //   </div>
    //   <div>
    //     <label htmlFor="confirm-password">Password</label>
    //     <input type="password"
    //            id="confirmPassword" />
    //   </div>
    //   <button type="submit">Sign Up</button>
    // </form>
  );
}
