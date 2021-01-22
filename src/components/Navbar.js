import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';



function Navbar() {
    return ( 
        <>
     <nav className = "navbar" >
     <div className = "navbar-container" >
      <Link to = '/'className = 'navbar-logo'>
       Posture
      <span className = "tt">  
       ML  </span>
       </Link>
      <Link to = './' className = 'navbar-info'>
         Home
      </Link>
      <Link to = 'app' className = 'navbar-begin'>
         Application
      </Link>
      <div />
      <Link to = 'graph' className = 'navbar-graph'>
         Graph
      </Link>
      </div>
      </nav>
        </>
   )
}
 export default Navbar
