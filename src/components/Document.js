import React from 'react'
import { IoDocumentSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'

const Document = () => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <IoDocumentSharp size={40} className="mb-3 text-primary" />
        <h5 className="card-title">Documents</h5>
        <p className="card-text">
          Click the Add button to add Documents.
        </p>
        <Link to ="/AllDoc"className="btn btn-primary w-100">
          Add
        </Link>
      </div>
    </div>
  )
}

export default Document

