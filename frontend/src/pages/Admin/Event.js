import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Coordinator.css";
import Items from "./Events";
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:9000/api/coor";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Item() {
  const [coordi, setCoordi] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setCoordi(data.coordi));
  }, []);
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Event Details Report",
    onafterprint: () => alert("Event Details Report Successfully Download !"),
  });
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
        <div className="top_btn_evet_box">
          <button
            className="top_btn_evet"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Add New Event
          </button>
          <button className="top_btn_evet" onClick={handlePrint}>
            Generate Report
          </button>
        </div>
        <div>
          <div>
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
        <div ref={ComponentsRef} className="report_clz">
          <h1 className="topic_event">
            Event <span className="sub_topic_event">Details</span>
          </h1>
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
                <th className="table_event_th">Action</th>
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

export default Item;
