import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Emp.css";
function CoachValidates() {
  const [nic, setNic] = useState("");
  const [coach, setCoach] = useState([]);
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
        `http://localhost:9000/api/coach?nic=${nic}`
      );
      console.log("Response:", response.data);

      const relevantDetails = response.data.coach.filter(
        (coach) => coach.nic === nic
      );

      setCoach(relevantDetails);

      if (relevantDetails.length === 0) {
        alert("No NIC found. Please enter a valid NIC.");
      }
    } catch (error) {
      console.error("Error fetching NIC:", error);
      alert("An error occurred while fetching coach details.");
    }
  };
  const handleUpdate = (id) => {
    const selectedcoach = coach.find((coach) => coach.nic === nic);
    if (selectedcoach) {
      setUpdateData({
        id: selectedcoach._id,
        nic: selectedcoach.nic,
        name: selectedcoach.name,
        position: selectedcoach.position,
        bank: selectedcoach.bank,
        account: selectedcoach.account,
        salary: selectedcoach.salary,
      });
      setShowUpdateForm(true); // Show the update form when update button is clicked
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Check if the position is updated
      if (updateData.position !== coach.position) {
        // If position is updated, set salary to "pending"
        updateData.salary = "Pending";
        updateData.bonus = "Pending";
        updateData.total = "Pending";
      }
      await axios.put(
        `http://localhost:9000/api/coach${updateData.id}`,
        updateData
      );
      // Alert with success message
      alert("coach Details updated successfully.");
      // Navigate to another page
      navigate("/coachvalidates");
      window.location.reload();
    } catch (error) {
      console.error("Error updating coach:", error);
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
              {coach.length > 0 ? (
                coach.map((coach, index) => (
                  <div key={index}>
                    <h2 className="topic_detl">Your Financial Details</h2>
                    <p className="infro_detil">
                      <b>Name:</b> {coach.name}
                    </p>
                    <p className="infro_detil">
                      <b>NIC: </b>
                      {coach.nic}
                    </p>
                    <p className="infro_detil">
                      <b>Position: </b>
                      {coach.position}
                    </p>
                    <p className="infro_detil">
                      <b>Bank:</b> {coach.bank}
                    </p>
                    <p className="infro_detil">
                      <b>Account Number: </b>
                      {coach.account}
                    </p>
                    <p className="infro_detil">
                      <b>Bonus (Rs): </b>

                      {coach.bonus
                        ? `${coach.bonus}`
                        : "Salary details not yet available"}
                    </p>
                    <p className="infro_detil">
                      <b>Salary (Rs): </b>

                      {coach.total
                        ? `${coach.total}`
                        : "Salary details not yet available"}
                    </p>

                    <br></br>
                    <button
                      onClick={() => handleUpdate(coach.id)}
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
                    <option value="level1">Level 1</option>
                    <option value="level2">Level 2</option>
                    <option value="level3">Level 3</option>
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
}

export default CoachValidates;
