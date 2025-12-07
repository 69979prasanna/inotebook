import React from 'react'
import './Login.css'
import Document from './Document'
import Image from './Image'
import Notes from './Notes'
import Navbar from './Navbar'

const Main = () => {
 
  return (
    <>
    <Navbar/>
    <div className="background "></div>
    <div className="container container-expand-lg">
     <div className="container-fluid  my-5">

      </div> 
<div className="container mt-5">
      <div className="row ">
        <div className="col-md-4 col-sm-6 mb-4">
          <Document />
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <Image />
        </div>
        <div className="col-md-4 col-sm-12 mb-4">
          <Notes />
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Main
