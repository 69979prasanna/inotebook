import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <div>
        <Navbar/>
        <div className="background"></div>
      <div className="container my-6 " >
    <div className="accordion mx-2 " id="accordionExample">
      <h1 style={{color:'white'}}>About Us</h1>
      <p style={{color:'white'}}>iNotebook is a personal cloud-based digital workspace designed to keep your important information organized, accessible, and secure. With a clean and user-friendly interface, it allows you to store, manage, and access your content anytime, from any device.</p>
      <h2 style={{color:'white'}}>Key Features:</h2>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Store your documents
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body ">
     Upload and save your important PDFs, files, and study material securely in the cloud.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
       Store your images
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       Keep your screenshots, assignments, reference images, and personal media organized and available when needed. 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      store your notes
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       Write, edit, and manage notes in a structured format — perfect for studying, reminders, or daily planning.
    </div>
    </div>
    </div>

     <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
      Easy Organization
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       Categorize or label your files and notes to quickly find what you need without searching endlessly.
    </div>
    </div>
    </div>
      <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
    Fast and Accessible
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      Built with modern technology for smooth performance and fast loading — whether you're on desktop or mobile.
    </div>
    </div>
    </div>
    <h1 style={{color:'white'}} className='my-2'>What Makes iNotebook Different?</h1>
    <p style={{color:'white'}}>
        iNotebook isn’t just storage — it’s a personal productivity system designed for students, creators, and working individuals who want their important information in one clean, secured, digital space.
    </p>
    </div>
    </div>
    </div>
  )
}

export default About
