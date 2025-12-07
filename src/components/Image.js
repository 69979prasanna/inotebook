import React from 'react'
import { PiImageSquare } from "react-icons/pi"
import { Link } from 'react-router-dom'
const Notes = () => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <PiImageSquare size={40} className="mb-3 text-primary" />
        <h5 className="card-title">Images</h5>
        <p className="card-text">
          Click the Add button to add Images.
        </p>
        <Link to ="/Allimg" className="btn btn-primary w-100 my-4">
          Add
        </Link>
      </div>
    </div>
  )
}

export default Notes


