import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Drawer, Button, message } from "antd"; // ใช้ Drawer แทน Modal
import { fetchUserData } from "../../services/https/Passenger/passenger";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // ใช้ state สำหรับการเปิด/ปิด Drawer
  const [passengerData, setPassengerData] = useState<any>(null); // เก็บข้อมูลโปรไฟล์

  const showDrawer = () => {
    const userId = localStorage.getItem("id");
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!userId || !userRole || !token) {
      message.error("Unauthorized access.");
      return;
    }

    if (userRole.toLowerCase() !== "passenger") {
      message.error("Access restricted to passengers only.");
      return;
    }

    // ดึงข้อมูลผู้โดยสารจาก API
    fetchUserData(userId, userRole, setPassengerData).catch((err) => {
      console.error("Error fetching user data:", err);
      message.error("Failed to load profile. Please try again.");
    });

    setIsDrawerVisible(true); // เปิด Drawer
  };

  const handleClose = () => {
    setIsDrawerVisible(false); // ปิด Drawer
  };

  return (
    <nav className="navbaropern">
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
        <li>
          <Link to="/home">HOME</Link>
        </li>
        <li>
          <Link to="/RideHistory">RIDES</Link>
        </li>
        <li>
          <Link to="/Promotion/view">PROMOTION</Link>
        </li>
        <li>
          <Link to="/BookingHistory">MY PRE BOOKING</Link>
        </li>
        <li>
          <Link to="/DatePreBooking">PREBOOKING</Link>
        </li>
        <li>
          <div
            className="profile-icon-wrapper"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#464468",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={showDrawer} // คลิกเปิด Drawer
          >
            <UserOutlined
              style={{
                fontSize: "20px",
                color: "#fff",
              }}
            />
          </div>
        </li>
      </ul>

      {/* แสดง Drawer เมื่อ isDrawerVisible เป็น true */}
      <Drawer
        title={<span style={{ color: 'rgb(86, 15, 104)', fontSize: '28px', fontWeight: 'bold' }}>{passengerData?.username}</span>} // แสดง username
        placement="right"
        width={400}  // ขยายขนาด Drawer
        visible={isDrawerVisible}
        onClose={handleClose}
        closable={true}
        bodyStyle={{
          backgroundColor: '#DAD6EF',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // เพิ่มเงาให้ Drawer
        }}
      >
        {passengerData ? (
          <div className="profile-container" style={{ color: '#47456C' }}>
            <h3 style={{ color: 'rgb(141, 60, 151)', fontSize: '28px', fontWeight: 'bold' }}>
              {passengerData.first_name} {passengerData.last_name} {/* แสดง username */}
            </h3>
            <p style={{ fontSize: '16px', marginBottom: '15px' }}>Email: {passengerData.email || "Not available"}</p>
            <p style={{ fontSize: '16px', marginBottom: '15px' }}>Phone: {passengerData.phone || "Not available"}</p>

            <div style={{ marginTop: '20px' }}>
            <Button
  type="default"
  style={{
    backgroundColor: '#47456C',
    borderColor: '#47456C',
    color: '#fff', // ตัวหนังสือเป็นสีขาว
    padding: '15px 30px', // เพิ่ม padding เพื่อให้ปุ่มใหญ่ขึ้น
    fontSize: '20px', // ขนาดตัวหนังสือใหญ่ขึ้น
    fontWeight: 'bold',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // เพิ่มเงาให้ปุ่ม
    transition: 'all 0.3s ease', // เพิ่มการเปลี่ยนแปลงเมื่อ hover
  }}
  onClick={() => {
    window.location.href = "/";
    handleClose(); // เมื่อกด "Log out" ให้ย่อ Drawer
  }}
  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
    (e.target as HTMLButtonElement).style.backgroundColor = '#7F6BCC' // ระบุสีเมื่อ hover
  }
  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
    (e.target as HTMLButtonElement).style.backgroundColor = '#47456C' // ระบุสีเมื่อออกจาก hover
  }
>
  Log out
</Button>

            </div>
          </div>
        ) : (
          <p style={{ color: '#575A83', fontSize: '18px', fontStyle: 'italic' }}>Loading profile...</p>
        )}
      </Drawer>
    </nav>
  );
};

export default Navbar;