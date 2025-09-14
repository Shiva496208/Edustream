import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Detailcard from '../Component/Detailcard/Detailcard'
const Recommended = () => {
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={"recommended"}/>
    </div>
  )
}

export default Recommended
