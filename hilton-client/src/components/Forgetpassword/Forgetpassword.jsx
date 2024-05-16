import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

export function ForgetPassword() {
  const [emailError, setEmailError] = useState(null);
  const navigate = useNavigate();

  const {register: login, handleSubmit} = useForm();

  const [verify, setVerify] = useState(false);

  const forgetPass = async (data) => {
    const url = "http://localhost:3000/api/v1/auth/password/forget";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(url, options);
    console.log(res);

    if (res.status === 200) setVerify(true);

    if (res.status === 500) {
      const errorsData = await res.json();
      if (errorsData.error === "User is not found")
        setEmailError(errorsData.error);
      else console.log(errorsData.error);
    } else {
      setEmailError(null);
      const user = await res.json();
      // navigate('/');
      console.log(user);
    }
  };

  const verifyCode = async (data) => {
    const url = "http://localhost:3000/api/v1/auth/code/verify"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(url, options);

    const user = await res.json();

    console.log(user)

    if (res.status === 200) navigate("/auth/resetpassword/", {state: {user}});
  };

  return !verify ? (
    <div className="wrapper">
      <div className="login">
        <div className="title">
          <h2>Forget Password</h2>
          <p>Please enter your email!</p>
        </div>

        <form className="login-form"
              onSubmit={handleSubmit(forgetPass)}>
          <div>
            <input
              type="text"
              placeholder="Email"
              id="email"
              required
              {...login("email")}
            />
            {emailError && <p>{emailError}</p>}
          </div>

          <div>
            <Link to="/auth/login"
                  className="link"
                  style={{color: "#aa8453"}}>
              Sign In
            </Link>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <div>
        <div className="login">
          <div className="title">
            <h2>Code Verification</h2>
            <p>Please enter the code you got!</p>
          </div>

          <form className="login-form"
                onSubmit={handleSubmit(verifyCode)}>
            <div>
              <input
                type="text"
                placeholder="Enter Your code"
                id="resetCode"
                required
                {...login("resetCode")}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
