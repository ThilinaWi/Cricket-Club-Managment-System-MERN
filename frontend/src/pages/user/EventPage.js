import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Items from "./Eventpages";
import "../Coordinator.css";
const URL = "http://localhost:9000/api/coor";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function ItemPage() {
  const [coordi, setCoordi] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setCoordi(data.coordi));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredEvent = data.coordi.filter((coordi) =>
        Object.values(coordi).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setCoordi(filteredEvent);
      setNoResults(filteredEvent.length === 0);
    });
  };
  return (
    <div>
      <div className="full_event">
        <div>
          <div>
          <h1 className="topic_event">
           Registerd Event <span className="sub_topic_event">Details</span>
          </h1>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Event Details"
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="seachbtn_evebt">
                Search
              </button>
            </td>
          </div>
        </div>
        <div className="report_clz">
      
          <br></br>
          <table className="table_event">
            <thead>
              <tr className="table_event_tr">
                <th className="table_event_th">Team Name</th>
                <th className="table_event_th">Gmail</th>
                <th className="table_event_th">Phone</th>
                <th className="table_event_th">Provinces</th>
                <th className="table_event_th">City</th>
                <th className="table_event_th">Date</th>
                <th className="table_event_th">Time</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br></br>
                <h1 className="con_topic">
                  No Event<span className="clo_us"> Found</span>{" "}
                </h1>
              </div>
            ) : (
              <tbody>
                {coordi &&
                  coordi.map((coordi, i) => <Items key={i} coordi={coordi} />)}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
