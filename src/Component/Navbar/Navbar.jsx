import React, { useEffect, useState } from "react";
import "./Navbar.css";
import project_logo from "../../assets/project_logo.png";
import user_profile from "../../assets/user_profile.jpg";
import searchIcon from "../../assets/search.png";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = ({ showbottom }) => {
  const [searched, setsearched] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:8008/profile", {
          method: "GET",
          credentials: "include"
        });

        const data = await res.json();

        if (data.success) setIsLoggedIn(true);
        else {setIsLoggedIn(false); navigate("/signup")};
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8008/logout", {
        method: "POST",
        credentials: "include"
      });

      setIsLoggedIn(false);
      navigate("/signup");
    } catch (err) {
      console.log("Logout error");
    }
  };

  const handleLogin = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <img src={project_logo} alt="StudyTube Logo" className="logo" />
        </div>

        <div className="navbar-middle">
          <input
            type="text"
            placeholder="Search educational videos"
            value={searched}
            onChange={(e) => setsearched(e.target.value)}
          />

          {searched.trim() ? (
            <Link to="/searchpage" state={{ searched }}>
              <button className="search-btn">
                <img src={searchIcon} alt="Search" className="search-icon" />
              </button>
            </Link>
          ) : (
            <div>
              <button className="search-btn">
                <img src={searchIcon} alt="Search" className="search-icon" />
              </button>
            </div>
          )}
        </div>

        <div className="navbar-right">
          <div className="profile-wrapper">
            <img src={user_profile} alt="Account" className="account-img" />

            <div className="profile-dropdown">
              {isLoggedIn ? (
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button className="logout-btn" onClick={handleLogin}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-bottom">
        {showbottom ? (
          <div className="navbar-bottom">
            <NavLink to="/">Home</NavLink>
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
