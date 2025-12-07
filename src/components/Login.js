import { useState } from "react"
import { FaLock } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

const Login = () => {
  const user_api = process.env.REACT_APP_USER
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${user_api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })
      const json = await response.json();
if (json.success) {
  localStorage.setItem('token', json.authtoken)
  navigate("/Main")
} else {
  alert("Invalid credentials");
}
     
      
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="background"></div>
      <div
        className="card mx-auto"
        style={{
          width: "420px",
          height: "450px",
          justifyContent: "center",
          display: "flex",
          background: "none",
        }}
      >
        <h1 className="text-center my-2" style={{ color: "white" }}>
          Login
        </h1>
        <div className="card-body">
          <div className="input-box my-4">
            <IoIosMail className="icon" />
            <input type="text" value={credentials.email} onChange={onChange} name="email" placeholder="Email"/>
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"  value={credentials.password}  onChange={onChange} name="password" placeholder="Password"/>
          </div>

          <div className="forgot my-3">
            <Link to="/" style={{textDecoration: "none", color: "white", display: "flex", justifyContent: "flex-end",}} onClick={()=>{alert("Sorry: unable to complete the request")}}>
              Forgot password?
            </Link>
          </div>

          <button onClick={handleClick} type="submit" className="btn btn-primary my-3" style={{ width: "100%", borderRadius: "15px" }}>
            Login
          </button>

          <div
            className="register-link"
            style={{ marginTop: "12px", textAlign: "center" }}
          >
            <p style={{ color: "white" }}>
              Don&apos;t have an account?
              <Link style={{textDecoration: "none", padding: "5px", color: "white",}} to="/Register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
