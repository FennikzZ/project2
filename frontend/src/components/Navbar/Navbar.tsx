import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">
          <img
            src="logo2.jpeg"
            alt="Cabana Logo"
            className="logo-image"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              padding: "5px",
              marginLeft: "10px",
            }}
          />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/RideHistory">RIDES</Link></li>
        <li><Link to="/Promotion/view">PROMOTION</Link></li>
        <li><Link to="/BookingHistory">MY PRE BOOKING</Link></li>
        <li><Link to="/DatePreBooking">PREBOOKING</Link></li>
        
        <li
  className="profile-container"
  onMouseEnter={() => setShowDropdown(true)}
  onMouseLeave={() => setShowDropdown(false)}
>
  {/* ลิงก์ไปหน้าโปรไฟล์ */}
  <Link to="/PassengerProfile">
    <div className="profile-icon-wrapper">
      <UserOutlined style={{ fontSize: "20px", color: "#fff" }} />
    </div>
  </Link>

  {/* dropdown สำหรับ Logout */}
  {showDropdown && (
    <div className="dropdown-menu">
      <Link to="/">Logout</Link>
    </div>
  )}
</li>
      </ul>
    </nav>
  );
};

export default Navbar;
