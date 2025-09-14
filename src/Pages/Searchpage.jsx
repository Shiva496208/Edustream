import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Detailcard from '../Component/Detailcard/Detailcard'
import { useLocation } from 'react-router-dom'
const Searchpage = () => {
    const location=useLocation();
    const{searched}=location.state||{};
    console.log(searched);
  return (
    <div>
      <Navbar showbottom={true}/>
      <Detailcard category={searched}/>
    </div>
  )
}

export default Searchpage
