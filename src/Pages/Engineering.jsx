import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
// import Mainpage from '../Component/Mainpage/Mainpage'
import Detailcard from '../Component/Detailcard/Detailcard'
const Engineering = () => {
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={"engineering"}/>
    </div>
  )
}

export default Engineering
