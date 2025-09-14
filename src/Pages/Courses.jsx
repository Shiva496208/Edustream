import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Detailcard from '../Component/Detailcard/Detailcard'
const Courses = () => {
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={"c"}/>
    </div>
  )
}

export default Courses
