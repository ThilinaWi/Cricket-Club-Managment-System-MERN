import React from "react";
import "../Coordinator.css";
function Eventpages(props) {
  const { _id, name, gmail, phone, provinces, city, date, time } = props.coordi;

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
      </tr>
  
  );
}

export default Eventpages;
