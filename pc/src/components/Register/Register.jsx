import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import logo from "../../images/logo.png";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fname) {
      errors.fname = "First Name is required";
    }
    if (!values.lname) {
      errors.lname = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Confirm password and password should be same";
    }

    return errors;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:8000/signup", user)
        .then((res) => {
          alert(res.data.message); // Display a success message
          navigate("/verify-email", { state: { email: user.email } }); // Redirect to email verification page
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
    }
  }, [formErrors, isSubmit, user]);

  return (
    <div className={registerstyle.register}>
      <img src={logo} alt="Logo" className={registerstyle.logo} />
      <form>
        <h1>Create your account</h1>
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="First Name"
          onChange={changeHandler}
          value={user.fname}
        />
        <p className={basestyle.error}>{formErrors.fname}</p>
        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Last Name"
          onChange={changeHandler}
          value={user.lname}
        />
        <p className={basestyle.error}>{formErrors.lname}</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="Confirm Password"
          onChange={changeHandler}
          value={user.cpassword}
        />
        <p className={basestyle.error}>{formErrors.cpassword}</p>
        <button className={basestyle.button_common} onClick={signupHandler}>
          Register
        </button>
      </form>
      <NavLink to="/">Already registered? Login</NavLink>
    </div>
  );
};

export default Register;
