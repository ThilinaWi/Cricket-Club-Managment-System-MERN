import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Coordinator.css";

function Items(props) {
  const { _id, name, gmail, phone, provinces, city ,date,time} = props.coordi;

  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Event Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/coor/${_id}`);
        window.alert("Event details deleted successfully!");
        history("/eventdash");
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Event details:", error);
      }
    }
  };

  return (
    <tr className="table_event_tr">
      <td className="table_event_th">
        <p className="sub_par_dis">{name}</p>
      </td>
      <td className="table_event_th">
        <p className="sub_par_dis">{gmail}</p>
      </td>
      <td className="table_event_th">
        <p className="sub_par_dis">{phone}</p>
      </td>
      <td className="table_event_th">
        <p className="sub_par_dis">{provinces}</p>
      </td>
      <td className="table_event_th">
        <p className="sub_par_dis">{city}</p>
      </td>
      <td className="table_event_th">
        <p className="sub_par_dis">{date}</p>
      </td>
      <td className="table_event_th">
        <p className="sub_par_dis">{time}</p>
      </td>
      <td className="table_event_th">
        <Link to={`/updateevent/${_id}`} className="updtbtn_evetn">
          Update
        </Link>
        <button className="dlt_evetn" onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Items;
