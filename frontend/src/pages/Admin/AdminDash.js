import React from "react";
import Coachimg from "./img/silhouette-sports-coach-stands-with-his-back-in-a-t-shirt-and-baseball-cap-background-for-sports-or-coaching-theme-on-a-white-background-illustration-vector.jpg";
import PlayerImg from "./img/fullbody-male-1_600x600_acf_cropped.png";
import "../Emp.css";
function AdminDash() {
  return (
    <div>
      <div className="emp_container">
        <div
          className="select_box"
          onClick={() => (window.location.href = "/coachdetails")}
        >
          <img src={Coachimg} alt="CoachImage" className="imgicon2" />
          <h1>Coach</h1>
        </div>
        <div
          className="select_box"
          onClick={() => (window.location.href = "/employeedetails")}
        >
          <img src={PlayerImg} alt="playerImage" className="imgicon1" />
          <h1>Player</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
