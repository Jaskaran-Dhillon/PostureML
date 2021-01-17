import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';



function Navbar() {
    return ( 
        <>
     <nav className = "navbar" >
  
       <div className = "navbar-container" >

      
       <Link to = '/'className = 'navbar-logo'>
       PostureML 
       </Link>
        <Link to = './' className = 'navbar-info'>
         Home
      </Link>
      <Link to = 'app' className = 'navbar-begin'>
         Application
      </Link>
        
      

       </div>
       </nav>
       

       </>
     

    )


 }
 export default Navbar