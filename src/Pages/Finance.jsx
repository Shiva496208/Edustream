import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
// import Mainpage from '../Component/Mainpage/Mainpage'
import Detailcard from '../Component/Detailcard/Detailcard'
const Finance = () => {
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={"finance"}/>
    </div>
  )
}

export default Finance
