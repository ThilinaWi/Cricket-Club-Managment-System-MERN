import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const AddSalary = () => {
  const [inputs, setInputs] = useState({
    name: "",
    nic: "",
    position: "",
    bank: "",
    account: "",
    salary: "",
    bonus: "",
    total: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/player/${id}`
        );
        const { data } = response;
        setInputs(data.employee); // Assuming the response contains an 'employee' object
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the changed input is salary or bonus, calculate the total
    if (name === "salary" || name === "bonus") {
      const salary = name === "salary" ? parseFloat(value) : parseFloat(inputs.salary);
      const bonus = name === "bonus" ? parseFloat(value) : parseFloat(inputs.bonus);
      const total = salary + bonus;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
        total: total.toFixed(2),
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/player/${id}`, inputs);
      window.alert("Salary added successfully!");
      history("/employeedetails");
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  return (
    <div className="emp_container">
      <div>
        <h1 className="topic_emp">
          Add
          <span className="sub_topic_emp "> Salary</span>
        </h1>
        <br></br>
        <form onSubmit={handleSubmit} className="emp_form">
          <label className="emp_lable_add" htmlFor="name">
            Name:
          </label>
          <br></br>
          <input
            className="emp_input"
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            readOnly
          />
          <br></br>
          <label className="emp_lable_add" htmlFor="nic">
            NIC:
          </label>
          <br></br>
          <input
            className="emp_input"
            type="number"
            id="nic"
            name="nic"
            value={inputs.nic}
            onChange={handleChange}
            readOnly
          />
         
          <br></br>
          <label className="emp_lable_add" htmlFor="bank">
            Bank:
          </label>
          <br></br>
          <input
            className="emp_input"
            type="text"
            id="bank"
            name="bank"
            value={inputs.bank}
            onChange={handleChange}
            readOnly
          />
          <br></br>
          <label className="emp_lable_add" htmlFor="account">
            Account:
          </label>
          <br></br>
          <input
            className="emp_input"
            type="number"
            id="account"
            name="account" 
            value={inputs.account}
            onChange={handleChange}
            readOnly
          />
          <br></br>
          <label className="emp_lable_add" htmlFor="salary">
            Salary:
          </label>
          <br></br>
          <input
            className="emp_input"
            type="number"
            id="salary"
            name="salary"
            value={inputs.salary}
            onChange={handleChange}
            required
          />
               <br></br>
          <label className="emp_lable_add" htmlFor="salary">
            Bonus:
          </label>
          <br></br>
          <input
            className="emp_input"
            type="number"
            id="bonus"
            name="bonus"
            value={inputs.bonus}
            onChange={handleChange}
            required
          />
               <br></br>
          <label className="emp_lable_add" htmlFor="salary">
            Total:
          </label>
          <br></br>
          <input
            className="emp_input"
            type="number"
            id="total"
            name="total"
            value={inputs.total}
            readOnly
          />
          <br></br> <br></br>
          <button type="submit" className="emp_form_button">
            Add Salary
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
