import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../Emp.css";
function CoachSalaryForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    position: "",
    bank: "",
    account: "",
    nic: "",
    gmail: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
  };
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/coach", {
        name: inputs.name,
        position: inputs.position,
        bank: inputs.bank,
        account: inputs.account,
        nic: inputs.nic,
        gmail: inputs.gmail,
      });
      if (response.status === 201) {
        window.alert("Register successful!");
        navigate("/coachvalidates");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("NIC already registered");
      } else {
        console.error("Error:", error);
      }
    }
  };
  const handleViewEmployees = () => {
    navigate("/coachvalidates");
  };
  return (
    <div>
      <div className="emp_container">
        <div>
          <h1 className="topic_emp">
            Create Your Financial
            <span className="sub_topic_emp "> Account</span>
          </h1>
          <p className="sub_topic_emp cen_sub">
            <b>Coach</b> Financial Account Create Section
          </p>
          <br></br>
          <form onSubmit={handleSubmit} className="emp_form">
            <label className="emp_lable_add">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="emp_input"
              required
            />
            <br />
            <label className="emp_lable_add">Gmail</label>
            <br />
            <input
              type="email"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
              className="emp_input"
              required
            />
            <br />
            <label className="emp_lable_add">NIC</label>
            <br />
            <input
              type="number"
              name="nic"
              value={inputs.nic}
              onChange={handleChange}
              className="emp_input"
              required
            />
            <br />
            <label className="emp_lable_add">Position</label>
            <br />
            <select
              name="position"
              value={inputs.position}
              onChange={handleChange}
              className="emp_input"
              required
            >
              <option value="">Select Position</option>
              <option value="level1">Level 1</option>
              <option value="level2">Level 2</option>
              <option value="level3">Level 3</option>
            </select>

            <br />
            <label className="emp_lable_add">Bank Name</label>
            <br />
            <input
              type="text"
              name="bank"
              value={inputs.bank}
              onChange={handleChange}
              className="emp_input"
              required
            />
            <br />
            <label className="emp_lable_add">Account Number</label>
            <br />
            <input
              type="number"
              name="account"
              value={inputs.account}
              onChange={handleChange}
              className="emp_input"
              required
            />
            <br />

            <br />
            <button type="submit" className="emp_form_button">
              Create Account
            </button>
            <p className="go_acc">
              If Do You Have Already Account
              <span onClick={handleViewEmployees} className="go_acc_sub">
                Click Here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CoachSalaryForm;
