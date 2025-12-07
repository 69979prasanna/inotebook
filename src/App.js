import './App.css'
import AllDoc from './components/AllDoc';
import Allimg from './components/Allimg';
import AllNotes from './components/AllNotes';
import Login from './components/Login';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Register from './components/Register';
import{HashRouter,Routes,Route }from "react-router-dom"  
import NoteState from './context/notes/NoteState';
import About from './components/About';
function App() {
  return (
<>
<NoteState>

<HashRouter>
 
  <Routes>

    <Route exact path="/" element={<Login/>} ></Route>
    <Route exact path="/Register" element={<Register/>} ></Route>
    <Route exact path="/Main" element={<Main/>} ></Route>
    <Route exact path="/Navbar" element={ <Navbar/>} ></Route>
    <Route exact path="/AllDoc" element={<AllDoc/>} ></Route>
    <Route exact path="/Allimg" element={<Allimg/>} ></Route>
    <Route exact path="/AllNotes" element={<AllNotes/>} ></Route>
    <Route exact path="/About" element={<About/>} ></Route>
  </Routes>

</HashRouter>

</NoteState>
  </>
  )
}

export default App;
