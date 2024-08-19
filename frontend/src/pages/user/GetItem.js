import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function GetItem() {
  const location = useLocation();
  const itemId = new URLSearchParams(location.search).get("id");
  const [item, setItem] = useState(null);
  const [quantityNeeded, setQuantityNeeded] = useState(0);

  const fetchItem = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/items/${id}`);
      setItem(response.data.item);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId);
    }
  }, [itemId]);

  const handleQuantityChange = (e) => {
    const newQuantityNeeded = parseInt(e.target.value);
    setQuantityNeeded(newQuantityNeeded);

    if (item && newQuantityNeeded >= 0) {
      const updatedQuantity = Math.max(item.quantity - newQuantityNeeded, 0);
      setItem({ ...item, quantity: updatedQuantity });
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="rate-full-box">
        <div>
          <h1 className="item-topic">
            Get <span className="item-us">Item</span>
          </h1>
          {/* Display item details using 'item' state */}
          <form className="item-full-box-form">
            <div>
              <label className="item-full-box-label">Item Name</label>
              <br />
              <input
                type="text"
                name="itemname"
                readOnly
                className="item-full-box-input"
                value={item.name} // Assuming 'name' is the property for item name
              />
            </div>
            <div>
              <label className="item-full-box-label">Quantity</label>
              <br />
              <input
                type="text"
                name="quantity"
                readOnly
                className="item-full-box-input"
                value={item.quantity} // Assuming 'quantity' is the property for quantity
              />
            </div>
            {/* Add more input fields or elements for other details */}
          </form>
        </div>
      </div>
      {/* Input for "How much you want" */}
      <div>
        <label className="item-full-box-label">How much you want</label>
        <br />
        <input
          type="number"
          name="quantityNeeded"
          className="item-full-box-input"
          value={quantityNeeded}
          onChange={handleQuantityChange}
        />
      </div>
    </div>
  );
}

export default GetItem;
