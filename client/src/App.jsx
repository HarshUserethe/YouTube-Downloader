
import "./App.css"
import Navigation from "./components/Navigation";
import Note from "./components/Note";
import Download from "./components/Download";
import Instagram from "./components/Instagram";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
const App = () => {

  return (
    <div>

      <BrowserRouter>
      <Navigation />
      <Note />
      <Routes>
        
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Download />} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App