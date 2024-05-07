import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import "./SignUp.css";

export function SignUp() {
  const navigate = useNavigate();
  const {register, handleSubmit, watch} = useForm();

  const password = useRef(null);
  password.current = watch("password", "");
  const confirmPassword = useRef(null);
  confirmPassword.current = watch("confirmPassword", "");

  const [usernameErr, setUsernameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [nationalIdErr, setNationalIdErr] = useState(false);
  const [birthDateErr, setBirthDateErr] = useState(false);

  const signup = async (data) => {
    const url = "http://localhost:3000/api/v1/auth/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(url, options);
    const user = await res.json();
    if (res.status === 200) navigate("/");
    console.log(user);

    if (res.status === 500) {
      if (user.error.includes("Username")) {
        setUsernameErr(true);
        setEmailErr(false);
        setNationalIdErr(false);
        setBirthDateErr(false);
      } else if (user.error.includes("Email")) {
        setEmailErr(true);
        setUsernameErr(false);
        setNationalIdErr(false);
        setBirthDateErr(false);
      } else if (user.error.includes("National ID")) {
        setNationalIdErr(true);
        setEmailErr(false);
        setUsernameErr(false);
        setBirthDateErr(false);
      } else if (user.error.includes("You must be")) {
        setBirthDateErr(true);
        setNationalIdErr(false);
        setEmailErr(false);
        setUsernameErr(false);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="signup">
        <div className="title">
          <h2>Sign Up</h2>
          <p>We're lucky having you in our extended family!</p>
        </div>

        <form className="signup-form"
              onSubmit={handleSubmit(signup)}>
          <div className="flex flex-row">
            <div>
              <input
                type="text"
                id="fName"
                placeholder="First Name"
                required
                minLength={3}
                {...register("fName")}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                id="lName"
                required
                minLength={3}
                {...register("lName")}
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="username"
              id="username"
              required
              minLength={6}
              {...register("username")}
            />
            <p
              style={{
                display: usernameErr ? "block" : "none",
              }}
              className="error"
            >
              username is not available
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              required
              {...register("birthDate")}
            />
          </div>
          <p
            style={{
              display: birthDateErr ? "block" : "none",
            }}
            className="error"
          >
            You must be at least 18 years old
          </p>
          <div>
            <input
              type="text"
              placeholder="Country"
              id="country"
              required
              minLength={4}
              {...register("country")}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="National ID"
              id="nationalID"
              required
              minLength={9}
              {...register("nationalID")}
            />
            <p
              style={{
                display: nationalIdErr ? "block" : "none",
              }}
              className="error"
            >
              National ID is already in use by another account
            </p>
          </div>
          <div>
            {" "}
            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              {...register("email")}
            />
            <p
              style={{
                display: emailErr ? "block" : "none",
              }}
              className="error"
            >
              Email is already in use, please{" "}
              <Link
                to="/auth/login"
                className="link"
                style={{color: "#aa8453"}}
              >
                Login
              </Link>
            </p>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              ref={password}
              required
              minLength={6}
              {...register("password")}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              ref={confirmPassword}
              required
              minLength={6}
              {...register("confirmPassword")}
            />
            <p
              style={{
                display:
                  password.current !== confirmPassword.current ? "block" : "none",
              }}
              className="error"
            >
              Passwords do not match.
            </p>
          </div>

          <button type="submit">Sign Up</button>

          <div className="login-btn">
            <p>Already have an account?</p>
            <Link to="/auth/login"
                  className="link"
                  style={{color: "#aa8453"}}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
