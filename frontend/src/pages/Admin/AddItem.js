import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../Item.css";
function AddRate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    category: "", // Category as the first input
    name: "",
    quantity: 0,
    size: "",
    company: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'quantity') {
      if (isNaN(value) || parseInt(value) < 0) { // Check if value is not a number or less than 0
        alert('Please enter quantity as a non-negative number.');
        return;
      }
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.category || // Check if category is empty
      !inputs.name ||
      !inputs.quantity ||
      !inputs.size ||
      !inputs.company ||
      !inputs.imageUrl
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:9000/api/items", inputs);
      showAlert("Item added successfully!");
      navigate("/admin/itemdash");
    } catch (error) {
      console.error("Error adding item:", error);
      showAlert("Error adding item. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewItems = () => {
    navigate("/");
  };

  return (
    <div className="bg-white">
      <div className="rate-full-box ">
        <div>
          <h1 className="item-topic">
            Add <span className="item-us">Item</span>
          </h1>
          <form onSubmit={handleSubmit} className="item-full-box-form">
            <label className="item-full-box-label">Category</label>
            <br></br>
            <select
              name="category"
              value={inputs.category}
              onChange={handleChange}
              className="catinpt"
              required
            >
              <option value="">Select Category</option>
              <option value="ball">Ball</option>
              <option value="bat">Bat</option>
              <option value="gloves">Gloves</option>
              <option value="helmets">Helmets</option>
              <option value="pads">Pads</option>
              <option value="shoes">Shoes</option>
            </select>
            <br />
            <label className="item-full-box-label">Name</label>
            <br></br>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="item-full-box-input"
              required
            />
            <br />
            <label className="item-full-box-label">Quantity</label>
            <br></br>
            <input
              type="number"
              name="quantity"
              value={inputs.quantity}
              onChange={handleChange}
              className="item-full-box-input"
              required
            />
            <br />
            <label className="item-full-box-label">Size</label>
            <br></br>
            <input
              type="text"
              name="size"
              value={inputs.size}
              onChange={handleChange}
              className="item-full-box-input"
              required
            />
            <br />
            <label className="item-full-box-label">Company</label>
            <br></br>
            <input
              type="text"
              name="company"
              value={inputs.company}
              onChange={handleChange}
              className="item-full-box-input"
              required
            />
            <br />
            <label className="item-full-box-label">Image URL</label>
            <br></br>
            <input
              type="text"
              name="imageUrl"
              value={inputs.imageUrl}
              onChange={handleChange}
              className="item-full-box-input"
              required
            />
            <br />
            <button type="submit" className="item-add-btn">
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRate;
