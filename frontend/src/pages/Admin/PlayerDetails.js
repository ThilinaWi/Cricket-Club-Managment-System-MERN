import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:9000/api/player";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(URL);
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedEmployees = employees.filter(
          (employee) => employee._id !== id
        );
        setEmployees(updatedEmployees);
        alert("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  /*PDF  */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Player Details",
    onafterprint: () => alert("Player Details Report Successfully Download !"),
  });
  /*Search */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    const filtered = employees.filter((employee) =>
      Object.values(employee).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setEmployees(filtered);
    setNoResults(filtered.length === 0);
  };

  return (
    <div className="con ">
      <h1 className="topic_emp">
        Player
        <span className="sub_topic_emp "> Details..!</span>
      </h1>
      <div>
        <div>
          <td className="">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              required
              className="emp_input_search"
              placeholder="Search Here..."
            ></input>
          </td>
          <td>
            <button onClick={handleSearch} className="emp_search">
              Search
            </button>
          </td>
        </div>
        <br></br>
        <button onClick={handlePrint} className="emp_pdf">
          Download Report
        </button>
      </div>
      <table className="table_emp_detils" ref={ComponentsRef}>
        <thead>
          <tr>
            <th className="table_emp_data">Name</th>
            <th className="table_emp_data">NIC</th>
            <th className="table_emp_data">Position</th>
            <th className="table_emp_data">Bank</th>
            <th className="table_emp_data">Account</th>
            <th className="table_emp_data">Salary (Rs)</th>
            <th className="table_emp_data">Bonus (Rs)</th>
            <th className="table_emp_data">Total (Rs)</th>
            <th className="table_emp_data">Actions</th>
          </tr>
        </thead>
        {noResults ? (
          <div>
            <br></br>
            <h1 className="con_topic">
              No<span className="clo_us"> Found</span>{" "}
            </h1>
          </div>
        ) : (
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="table_emp_data">{employee.name}</td>
                <td className="table_emp_data">{employee.nic}</td>
                <td className="table_emp_data">{employee.position}</td>
                <td className="table_emp_data">{employee.bank}</td>
                <td className="table_emp_data">{employee.account}</td>

                <td className="table_emp_data">
                  {employee.salary ? (
                    <>{employee.salary}</>
                  ) : (
                    <p className="not_yet">not add yet</p>
                  )}
                </td>
                <td className="table_emp_data">
                  {employee.bonus ? (
                    <>{employee.bonus}</>
                  ) : (
                    <p className="not_yet">no bonus</p>
                  )}
                </td>
                <td className="table_emp_data">
                  {employee.total ? (
                    employee.total
                  ) : (
                    <p className="not_yet">
                      {employee.salary
                        ? `${employee.salary}.00`
                        : "not add yet"}
                    </p>
                  )}
                </td>

                <td className="table_emp_data">
                  <Link
                    className="update_emp"
                    to={`/addsalary/${employee._id}`}
                  >
                    Add Salary
                  </Link>
                  <button
                    className="dltbtn_emp"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default EmployeeDetails;
