import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import Navbar from "./Navbar";

export default function Notes() {
  const { notes, getNotes, addNote, deleteNote } = useContext(NoteContext)
  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      console.log("Token found, fetching notes...")
      getNotes()
    } else {
      console.warn("No token found. Please log in again.")
      alert("Please log in first before accessing notes!")
    }
  }, [])

  const handleAdd = (e) => {
    e.preventDefault();
    if (!note.title || !note.description) {
      alert("Please fill both title and description!")
      return;
    }
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  };

  return (
    <div>
      <Navbar/>
      <div className="background"></div>
      <div className="all-doc-wrapper">
      <div className="card p-3 mx-auto my-3" style={{ width: "20rem" }}>
        <h2>Add a Note</h2>
        <form>
          <input type="text" name="title" value={note.title} onChange={onChange} placeholder="Title" className="form-control my-2"/>

          <textarea name="description" value={note.description} onChange={onChange} placeholder="Description" className="form-control my-2"/>

          <input type="text" name="tag" value={note.tag} onChange={onChange} placeholder="Tag" className="form-control my-2"/>
          <button className="btn btn-primary w-100" onClick={handleAdd}>
            Add Note
          </button>
        </form>
      </div>

      <h2 style={{ color: "white" }}>Your Notes</h2>
      <div className="row">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="card my-2 mx-2" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5>{note.title}</h5>
                <p>{note.description}</p>
                <small>{note.tag}</small>
                <div className="mt-2">
                  <button  className="btn btn-danger btn-sm" onClick={() => deleteNote(note.id || note._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No notes available yet.</p>
        )}
      </div>
    </div>
      </div>
  );
}
