import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
  const user_api = process.env.REACT_APP_USER
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = credentials;

    try {
      const response = await fetch(`${user_api}/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        alert("Registration successful!");
        navigate("/Main");
      } else {
        alert("Registration failed: " || (json.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="background"></div>
      <div className="card mx-auto" style={{  width: "420px",  height: "450px",  justifyContent: "center",  display: "flex",  background: "none",}}>
        <h1 className="text-center my-2" style={{ color: "white" }}>
          Register
        </h1>
        <div className="card-body">
          <div className="input-box my-4">
            <FaUser className="icon" />
            <input type="text" name="username" value={credentials.username} onChange={onChange} placeholder="username"/>
          </div>
          <div className="input-box my-4">
            <IoIosMail className="icon" />
            <input  type="text"  name="email"  value={credentials.email} onChange={onChange}  placeholder="email"/>
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input type="password" name="password" value={credentials.password} onChange={onChange} placeholder="password" />
          </div>

          <button onClick={handleSubmit} type="submit" className="btn btn-primary my-3" style={{ width: "100%", borderRadius: "15px" }}>
            Register
          </button>

          <div
            className="register-link"
            style={{ marginTop: "12px", textAlign: "center" }}
          >
            <p style={{ color: "white" }}>
              Already have an account?
              <Link style={{textDecoration: "none", padding: "5px", color: "white",}} to="/">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
