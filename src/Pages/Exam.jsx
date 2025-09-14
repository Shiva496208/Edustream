import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Detailcard from '../Component/Detailcard/Detailcard'
const Exam = () => {
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={"exam"}/>
    </div>
  )
}

export default Exam
