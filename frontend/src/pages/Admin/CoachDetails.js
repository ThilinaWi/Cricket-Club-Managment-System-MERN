import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:9000/api/coach";
function CoachDetails() {
  const [coach, setCoash] = useState([]);

  useEffect(() => {
    fetchCoash();
  }, []);
  const fetchCoash = async () => {
    try {
      const response = await axios.get(URL);
      setCoash(response.data.coach);
    } catch (error) {
      console.error("Error fetching Coash:", error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedCoash = coach.filter((coach) => coach._id !== id);
        setCoash(updatedCoash);
        alert("coach deleted successfully!");
      } catch (error) {
        console.error("Error deleting coach:", error);
      }
    }
  };
   /*PDF  */
   const ComponentsRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => ComponentsRef.current,
     DocumentTitle: "Coach Details",
     onafterprint: () => alert("Coach Details Report Successfully Download !"),
   });
  /*Search */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const handleSearch = () => {
    const filtered = coach.filter((coach) =>
      Object.values(coach).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCoash(filtered);
    setNoResults(filtered.length === 0);
  };
  return (
    <div>
      <div className="con">
        <h1 className="topic_emp">
          Coach
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
        <table className="table_emp_details" ref={ComponentsRef}>
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
                No Message<span className="clo_us"> Found</span>{" "}
              </h1>
            </div>
          ) : (
            <tbody>
              {coach.map((coach) => (
                <tr key={coach._id}>
                  <td className="table_emp_data">{coach.name}</td>
                  <td className="table_emp_data">{coach.nic}</td>
                  <td className="table_emp_data">{coach.position}</td>
                  <td className="table_emp_data">{coach.bank}</td>
                  <td className="table_emp_data">{coach.account}</td>

                  <td className="table_emp_data">
                    {coach.salary ? (
                      <>{coach.salary}</>
                    ) : (
                      <p className="not_yet">not add yet</p>
                    )}
                  </td>
                  <td className="table_emp_data">
                    {coach.bonus ? (
                      <>{coach.bonus}</>
                    ) : (
                      <p className="not_yet">no bonus</p>
                    )}
                  </td>
                  <td className="table_emp_data">
                    {coach.total ? (
                      coach.total
                    ) : (
                      <p className="not_yet">
                        {coach.salary ? `${coach.salary}.00` : "not add yet"}
                      </p>
                    )}
                  </td>

                  <td className="table_emp_data">
                    <Link
                      className="update_emp"
                      to={`/addcoachsalary/${coach._id}`}
                    >
                      Add Salary
                    </Link>
                    <button
                      className="dltbtn_emp"
                      onClick={() => handleDelete(coach._id)}
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
    </div>
  );
}

export default CoachDetails;
