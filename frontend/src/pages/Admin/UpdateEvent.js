import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
function UpdateItem() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/coor/${id}`
        );
        setInputs(response.data.coordi);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:9000/api/coor/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        phone: String(inputs.phone),
        provinces: String(inputs.provinces),
        city: String(inputs.city),
        date: String(inputs.date),
        time: String(inputs.time),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("Evet Details Update successfully!");
      history("/eventdash");
    });
  };
  return (
    <div>
      <div className="event_container">
        <div className="event_full_add">
          <h1 className="topic_event">
            Update Event <span className="sub_topic_event">Details</span>
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
            <br></br>
            <button className="event_form_button">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateItem;
