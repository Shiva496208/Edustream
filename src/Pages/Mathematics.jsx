import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Detailcard from '../Component/Detailcard/Detailcard'
const Mathematics = () => {
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={"math"}/>
    </div>
  )
}

export default Mathematics
