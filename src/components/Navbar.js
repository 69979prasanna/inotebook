import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg"
const Navbar = () => {
  const user_api = process.env.REACT_APP_USER
  const [username, setUsername] = useState('')
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${user_api}/getuser`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
        });

        const data = await res.json()
        setUsername(data.username)
      } catch (err) {
        console.log("Error fetching username:", err)
      }
    }

    fetchUsername();
  }, [])
  const navigate = useNavigate()
  const handleclick = () => {
    navigate("/")
  }
  return (
    <>

      <nav className="navbar navbar-expand-lg  fixed-top  " style={{ border: '8px   lightgray ', backgroundColor: 'black', height: '70px' }}>
        <div className="container-fluid " style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link className="navbar-brand display-1" to="/Main" style={{ color: 'white', }}>iNotebook</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: '13px', }}>
              <li className="nav-item">
                <Link className="nav-link active display-1" aria-current="page" to="/About" style={{ color: 'white', fontSize: '20px', fontWeight: 'lighter', }}>About</Link>
              </li>
            </ul>
            <div style={{ color: 'white', marginRight: '100px', border: '1px  wheat', fontSize: '20px', fontWeight: 'lighter', }}><CgProfile size={'30px'} style={{ marginRight: '10px', marginBottom: '5px' }} />
              Hello, {username}</div>
            <div className="button">
              <button onClick={handleclick} className="btn btn-primary"> Log Out</button>
            </div>
          </div>
        </div>
      </nav>
    </>

  )
}

export default Navbar
