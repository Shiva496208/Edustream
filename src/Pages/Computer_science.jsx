import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
// import Mainpage from '../Component/Mainpage/Mainpage'
import Detailcard from '../Component/Detailcard/Detailcard'
const Computer_science = () => {
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={"computerscience"}/>
    </div>
  )
}

export default Computer_science
