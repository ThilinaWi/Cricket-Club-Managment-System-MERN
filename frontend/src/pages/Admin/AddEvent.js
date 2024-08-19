import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../Coordinator.css";

function AddItem() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    phone: "",
    provinces: "",
    city: "",
    date: "",
    time: "",
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
    window.alert("Register successfully!");
    navigate("/eventdash");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:9000/api/coor", {
      name: inputs.name,
      gmail: inputs.gmail,
      phone: inputs.phone,
      provinces: inputs.provinces,
      city: inputs.city,
      date: inputs.date,
      time: inputs.time,
    });
  };
  return (
    <div>
      <div className="event_container">
        <div className="event_full_add">
          <h1 className="topic_event">
            Register New <span className="sub_topic_event">Event</span>
          </h1>
          <form className="event_form" onSubmit={handleSubmit}>
            <label className="event_label">Team Name</label>
            <br></br>
            <input
              className="event_input"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
              type="text"
            />
            <br></br>
            <label className="event_label">Gmail</label>
            <br></br>
            <input
              className="event_input"
              type="email"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
              required
            />
            <br></br>
            <label className="event_label">Phone</label>
            <br></br>
            <input
              className="event_input"
              name="phone"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              value={inputs.phone}
              onChange={handleChange}
              required
              type="text"
            />
            <br></br>
            <label className="event_label">Provicess</label>
            <br></br>
            <input
              className="event_input"
              name="provinces"
              value={inputs.provinces}
              onChange={handleChange}
              required
              type="text"
            />
            <br></br>
            <label className="event_label">City</label>
            <br></br>
            <input
              className="event_input"
              name="city"
              value={inputs.city}
              onChange={handleChange}
              required
              type="text"
            />
            <br></br>
            <label className="event_label">Date</label>
            <br></br>
            <input
              className="event_input"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              required
              type="date"
            />
            <br></br>
            <label className="event_label">Time</label>
            <br></br>
            <input
              className="event_input"
              name="time"
              value={inputs.time}
              onChange={handleChange}
              required
              type="time"
            />
            <button className="event_form_button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
