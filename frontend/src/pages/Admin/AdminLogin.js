import React, { useState } from "react";
import "../Emp.css";
import logpng from "./img/logadmin.webp";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "123") {
      // Valid credentials, you can redirect or perform any other action here
      alert("Admin Login successful");
      window.location.href = "/adminDash";
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <div className="loginbox_main">
        <div className="loginbox">
          <div className="loginleft">
            <img src={logpng} alt="login_png" className="logleftpn" />
          </div>
          <div className="loginright">
            <form className="login-form" onSubmit={handleSubmit}>
              <h1 className="admin_topic">Admin Login</h1>
              <br></br>
              <label className="emp_lable_add">Username:</label>
              <br></br>
              <input
                type="text"
                value={username}
                className="emp_input"
                onChange={handleUsernameChange}
              />
              <br />
              <label className="emp_lable_add">Password:</label>
              <br></br>
              <input
                type="password"
                value={password}
                className="emp_input"
                onChange={handlePasswordChange}
              />
              <br />
              <br />
              <button className="emp_form_button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
