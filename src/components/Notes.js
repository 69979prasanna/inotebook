import React from 'react'
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from 'react-router-dom'
const Notes = () => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <FaNoteSticky size={40} className="mb-3 text-primary" />
        <h5 className="card-title">Notes / To-Do List</h5>
        <p className="card-text">
          Click the Add button to add Notes.
        </p>
        <Link to ="/AllNotes" className="btn btn-primary w-100 my-4">
          Add
        </Link>
      </div>
    </div>
  )
}

export default Notes

