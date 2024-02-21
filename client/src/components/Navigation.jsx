import "../App.css";
import {NavLink} from 'react-router-dom';
import Logo from '../logo.png';
import { useState } from "react";

const Navigation = () => {

  const [open, setOpen] = useState(null);
   
const openMenu = () => {
   setOpen("0%");

}

const closeMenu = () => {
  setOpen("-70%");

}

const listHandler = () => {
  setOpen("-70%");
 
}

  return (

    <div className="nav-bar">
     
     <div className="logo">
        <img src={Logo} alt="" />
     </div>
     <i className="ri-menu-line" onClick={openMenu}></i> 
     <div className="list" style={{right: `${open}`}}>
      <div className="closeTag">
      <i className="ri-close-line" onClick={closeMenu}></i>
      </div>
        <NavLink onClick={listHandler} to="/"><li>Youtube</li></NavLink>
        <NavLink onClick={listHandler} to="/instagram"><li>Instagram</li></NavLink>
        <NavLink onClick={listHandler} to="https://www.youtube.com" target="blank">Subscribe</NavLink>
        <NavLink onClick={listHandler} to="/about"><li>About</li></NavLink>
     </div>
    </div>
  )
}

export default Navigation