import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Emp.css'
const Validate = () => {
  const [nic, setNic] = useState("");
  const [employees, setEmployees] = useState([]);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    position: "",
    bank: "",
    account: "",
    nic: "",
    bonus: "",
    total: "",
    salary: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control visibility of update form
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/player?nic=${nic}`
      );
      console.log("Response:", response.data);

      const relevantDetails = response.data.employees.filter(
        (employee) => employee.nic === nic
      );

      setEmployees(relevantDetails);

      if (relevantDetails.length === 0) {
        alert("No NIC found. Please enter a valid NIC.");
      }
    } catch (error) {
      console.error("Error fetching NIC:", error);
      alert("An error occurred while fetching employee details.");
    }
  };

  const handleUpdate = (id) => {
    const selectedEmployee = employees.find((employee) => employee.nic === nic);
    if (selectedEmployee) {
      setUpdateData({
        id: selectedEmployee._id,
        nic: selectedEmployee.nic,
        name: selectedEmployee.name,
        position: selectedEmployee.position,
        bank: selectedEmployee.bank,
        account: selectedEmployee.account,
        salary: selectedEmployee.salary,
      });
      setShowUpdateForm(true); // Show the update form when update button is clicked
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Check if the position is updated
      if (updateData.position !== employees.position) {
        // If position is updated, set salary to "pending"
        updateData.salary = "Pending";
        updateData.bonus = "Pending";
        updateData.total = "Pending";
      }
      await axios.put(
        `http://localhost:9000/api/player/${updateData.id}`,
        updateData
      );
      // Alert with success message
      alert("Employee Details updated successfully.");
      // Navigate to another page
      navigate("/employeevalidates");
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <div className="txt_font">
        <h1 className="topic_emp">
          Plase Enter Your NIC
          <span className="sub_topic_emp "> Number</span>
        </h1>
        <p className="sub_para_emp">
          we take the security and privacy of your data seriously. Rest assured,
          your information is encrypted and safeguarded. NIC validation ensures
          that the information provided is accurate and matches our records,
          helping us maintain the integrity of our services and protect your
          identity. Your trust is paramount to us, and we appreciate your
          cooperation in this validation process.
        </p>
        <div className="emp_container_find">
          <div>
            <form onSubmit={handleSubmit} className="find_form_emp">
              <label htmlFor="nic" className="emp_lable_add">
                Enter Your NIC:
              </label>
              <br />
              <input
                className="emp_input"
                type="text"
                id="nic"
                name="nic"
                value={nic}
                onChange={handleChange}
                required
              />
              <br />
              <button type="submit" className="emp_form_button">
                Check
              </button>
            </form>
            <div className="fin_box_details">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <div key={index}>
                    <h2 className="topic_detl">Your Financial Details</h2>
                    <p className="infro_detil">
                      <b>Name:</b> {employee.name}
                    </p>
                    <p className="infro_detil">
                      <b>NIC: </b>
                      {employee.nic}
                    </p>
                    <p className="infro_detil">
                      <b>Position: </b>
                      {employee.position}
                    </p>
                    <p className="infro_detil">
                      <b>Bank:</b> {employee.bank}
                    </p>
                    <p className="infro_detil">
                      <b>Account Number: </b>
                      {employee.account}
                    </p>
                    <p className="infro_detil">
                      <b>Bonus (Rs): </b>

                      {employee.bonus
                        ? `${employee.bonus}`
                        : "Salary details not yet available"}
                    </p>
                    <p className="infro_detil">
                      <b>Salary (Rs): </b>
                  
                      {employee.total
                        ? `${employee.total}`
                        : "Salary details not yet available"}
                    
                    </p>

                    <br></br>
                    <button
                      onClick={() => handleUpdate(employee.id)}
                      className="emp_form_button"
                    >
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p></p>
              )}

              {showUpdateForm && (
                <form onSubmit={handleSave}>
                  <br></br>
                  <hr></hr>
                  <br></br>
                  <h2 className="topic_detl">Update Your Financial Details</h2>
                  <label className="emp_lable_add">NIC</label>
                  <br></br>
                  <input
                    className="emp_input"
                    readOnly
                    type="text"
                    name="nic"
                    value={updateData.nic}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, nic: e.target.value })
                    }
                    required
                  />
                  <br></br>
                  <label className="emp_lable_add">Name</label>
                  <br></br>
                  <input
                    className="emp_input"
                    type="text"
                    name="name"
                    value={updateData.name}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, name: e.target.value })
                    }
                    required
                  />
                  <br></br>
                  <label className="emp_lable_add">Position</label>
                  <br />
                  <select
                    className="emp_input"
                    type="text"
                    name="position"
                    value={updateData.position}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, position: e.target.value })
                    }
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
                  <br></br>
                  <label className="emp_lable_add">Bank Name</label>
                  <br />
                  <input
                    className="emp_input"
                    type="text"
                    name="bank"
                    value={updateData.bank}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, bank: e.target.value })
                    }
                    required
                  />
                  <br></br>
                  <label className="emp_lable_add">Account Number</label>
                  <br />
                  <input
                    className="emp_input"
                    type="text"
                    name="account"
                    value={updateData.account}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, account: e.target.value })
                    }
                    required
                  />
                  <br></br>
                  <button type="submit" className="emp_form_button">
                    Update
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validate;
