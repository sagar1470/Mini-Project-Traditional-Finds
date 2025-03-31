import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Introduction = () => {
    const navigate = useNavigate()
  return (
    <div>Introduction
     <nav>
        <Link to={"/"}>second</Link>
     </nav>
     </div>
  )
}

export default Introduction