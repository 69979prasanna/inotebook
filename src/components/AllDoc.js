import React, { useState, useEffect} from 'react';
import './Login.css';
import { IoDocumentOutline } from "react-icons/io5";
import Navbar from './Navbar';

const AllDoc = () => {

  const file_api= process.env.REACT_APP_FILE
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    const fetchFiles = async()=>{
      const token = localStorage.getItem("token")
      const res = await fetch(`${file_api}/list`, {
        headers: {"auth-token": token}
      })
      const data = await res.json()
      if (res.ok ){
        setFiles(data.files)
      }
   
    }
    fetchFiles()
  }, [])
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [previewFile, setPreviewFile] = useState(null)
     const documentFiles = files.filter(f => 
  !f.fileType?.startsWith("image/") && !f.type?.startsWith("image/")
)
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  };

  const handleAdd = async () => {
    const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/xml"
]
    if (file) {
      if (!allowedTypes.includes(file.type)) {
  alert("Only PDF, DOC, DOCX, PPT, PPTX, or XML files are allowed!")
  setFile(null)
        document.querySelector('input[type="file"]').value = ''
    return;
      }
      const formData = new FormData()
      formData.append("file", file)
      try {
        const token = localStorage.getItem("token")

      const response =  await fetch(`${file_api}/upload`, {
      method: "POST",
      headers: {
      "auth-token": token
      },
      body: formData,
    })
    const data = await response.json()
    if(response.ok){
      alert("File uploaded successfully!")
           setFiles([...files, data.file])
    }
    else{
      alert(`Upload failed: ${data.message}`)
    }
    console.log(files[0].fileUrl)
      } catch (error) {
        console.log(error)
            alert("Error uploading file");

      }
 
      setFile(null)
      document.querySelector('input[type="file"]').value = ''
    } else {
      alert('Please select a file first!');
    }
  }

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(` ${file_api}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": token
      }
    });

    const data = await response.json();

    if (response.ok) {
      alert("File deleted successfully!");
      setFiles(prev => prev.filter(file => file._id !== id)); 
    } else {
      alert(`Delete failed: ${data.message}`);
    }
  } catch (error) {
    console.log(error);
    alert("Error deleting file");
  }
}

 const renderPreview = (file) => {
  if (!file) return null;

const fileURL = file.fileUrl ?? URL.createObjectURL(file)
console.log(fileURL)
  if (file.fileType?.includes("pdf") || file.type?.includes("pdf")) {
    return <iframe src={fileURL} width="100%" height="500px" title="PDF Preview"></iframe>
  }
  else if(file.fileType?.includes("msword") ||  file.fileType?.includes("officedocument.wordprocessingml.document")) {
     return <iframe src={fileURL} width="100%" height="500px" title="PDF Preview"></iframe>
  }
  else if(file.fileType?.includes("ms-powerpoint") || file.fileType?.includes("officedocument.presentationml.presentation")){
   return <iframe src={fileURL} width="100%" height="500px" title="PDF Preview"></iframe>  
  }
  else if (file.fileType?.includes("text") || file.type?.includes("text")) {
    return <iframe src={fileURL} width="100%" height="500px" title="Text Preview"></iframe>
  } else {
    return <p style={{ color: 'black' }}>Preview not available for this file type</p>
  }
}

  return (
    <>
     <Navbar/>
      <div className="background"></div>
      <div className="all-doc-wrapper">
        <div className="upload-card card shadow-sm mx-auto">
          <div className="card-body text-center">
            <h5 className="card-title">Documents</h5>
            <input className="my-3" type="file" onChange={handleFileChange} />
            <button onClick={handleAdd} className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </div>
        <div className="files-container-horizontal mt-3">
          {documentFiles.map((f, index) => (
            <div key={index} className="file-card shadow-sm d-flex align-items-center mx-auto">
              <IoDocumentOutline style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => setPreviewFile(f)}/>
              <span style={{ flex: 1 }}>{f.filename || f.name}</span>
              <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(f._id)} type="button">
                Delete
              </button>
            </div>
          ))}
        </div>
        {previewFile && (
          <div className="preview-modal">
            <div className="preview-content card shadow-lg p-3">
              <h5>{previewFile.filename || previewFile.name}</h5>
              {renderPreview(previewFile)}
              <button className="btn btn-secondary mt-3" onClick={() => setPreviewFile(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AllDoc
