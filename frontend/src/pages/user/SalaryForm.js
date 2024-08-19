import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../Emp.css";
function AddEmployee() {
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
      const response = await axios.post("http://localhost:9000/api/player", {
        name: inputs.name,
        position: inputs.position,
        bank: inputs.bank,
        account: inputs.account,
        nic: inputs.nic,
        gmail: inputs.gmail,
      });
      if (response.status === 201) {
        window.alert("Register successful!");
        navigate("/employeevalidates");
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
    navigate("/employeevalidates");
  };

  return (
    <div className="emp_container">
      <div>
        <h1 className="topic_emp">
          Create Your Financial
          <span className="sub_topic_emp "> Account</span>
        </h1>
        <p className="sub_topic_emp cen_sub">
            <b>Player</b> Financial Account Create Section
          </p>
        <br></br>
        <form onSubmit={handleSubmit} className="emp_form">
          <label className="emp_lable_add">Account Name</label>
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
            <option value="Batsmen">Batsmen</option>
            <option value="Bowlers">Bowlers</option>
            <option value="Wicketkeeper">Wicketkeeper</option>
            <option value="Captain">Captain</option>
            <option value="Fielders">Fielders</option>
            <option value="Substitutes">Substitutes</option>
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
            If Do You Have Already Account{" "}
            <span onClick={handleViewEmployees} className="go_acc_sub">
              Click Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
