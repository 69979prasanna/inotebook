import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_NOTES
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {
    const response = await fetch(`${host}/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), 
      },
    })
    const json = await response.json()
    setNotes(json);
  }

 const addNote = async (title, description, tag) => {
  const response = await fetch(`${host}/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ title, description, tag: tag || "general" }),
  });

  const note = await response.json()
  setNotes(prev => [...prev, note])
}

  const deleteNote = async (id) => {
    await fetch(`${host}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
   setNotes(prev => prev.filter(n => (n.id ?? n._id) !== id))
  }

  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    })
    getNotes()
  }

  return (
    <NoteContext.Provider
    value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
