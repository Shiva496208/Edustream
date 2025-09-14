import React, { useState } from "react";
import "./Navbar.css";
// import logo from "../../assets/logo.png";
import project_logo from "../../assets/project_logo.png"
import user_profile from "../../assets/user_profile.jpg";
import searchIcon from "../../assets/search.png"; // your search icon
import { NavLink ,Link} from "react-router-dom";

const Navbar = ({showbottom}) => {
  const [searched,setsearched]=useState("");
  return (
    <div className="navbar">
      {/* Top Section */}
      <div className="navbar-top">
        {/* Left Section: Logo */}
        <div className="navbar-left">
          <img src={project_logo} alt="StudyTube Logo" className="logo" />
        </div>

        {/* Middle Section: Search */}
        <div className="navbar-middle">
          <input type="text" placeholder="Search educational videos" value={searched} onChange={(e)=>{
            setsearched(e.target.value);
          }}/>
          {searched.trim()?<Link to='/searchpage' state={{searched}}><button className="search-btn">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
          </Link>:
          <div><button className="search-btn">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
          </div>}

        </div>

        {/* Right Section: Account */}
        <div className="navbar-right">
          <img src={user_profile} alt="Account" className="account-img" />
        </div>
      </div>

      {/* Bottom Section: Categories */}
       <div className="navbar-bottom">
     {(showbottom)?<div className="navbar-bottom">
  <NavLink to="/" >Home</NavLink>
  <NavLink to="/mathematics">Mathematics</NavLink>
  <NavLink to="/science">Science</NavLink>
  <NavLink to="/engineering">Engineering</NavLink>
  <NavLink to="/computer-science">Computer Science</NavLink>
  <NavLink to="/dsa">Dsa</NavLink>
  <NavLink to="/business">Business</NavLink>
  <NavLink to="/economics">Economics</NavLink>
  <NavLink to="/accounting">Accounting</NavLink>
  <NavLink to="/finance">Finance</NavLink>
  <NavLink to="/exam-prep">Exam Prep</NavLink>
  <NavLink to="/courses">Courses</NavLink>
  <NavLink to="/recommended">Recommended</NavLink>
</div> :<></>}

</div>

    </div>
  );
};

export default Navbar;
