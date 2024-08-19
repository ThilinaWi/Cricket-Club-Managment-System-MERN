import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Item.css";
const URL = "http://localhost:9000/api/items";

const DashBoard = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    quantity: 0,
    size: "",
    company: "",
  });
  const [increaseQuantityBy, setIncreaseQuantityBy] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      const ballItems = response.data.items.filter(
        (item) => item.category === "gloves"
      );
      setItems(ballItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setItems(filteredItems);
    setNoResults(filteredItems.length === 0);
  };

  const handleUpdate = async (id) => {
    const selectedItem = items.find((item) => item._id === id);
    if (selectedItem) {
      setUpdateData({
        id: selectedItem._id,
        name: selectedItem.name,
        quantity: selectedItem.quantity,
        size: selectedItem.size,
        company: selectedItem.company,
      });
    }
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleQuantityIncrease = () => {
    if (increaseQuantityBy !== 0 && increaseQuantityBy <= updateData.quantity) {
      setUpdateData((prevData) => ({
        ...prevData,
        quantity: prevData.quantity - increaseQuantityBy,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchItems();
      setUpdateData({
        id: "",
        name: "",
        quantity: 0,
        size: "",
        company: "",
      });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="itmdetails bg-white">
      <div className="itm_nav_bar_full">
        <div className="itm_nav_bar">
        <button
            className="itm_nav_bar_btn_admin"
            onClick={() => (window.location.href = "/admin/itemdash")}
          >
            Admin
          </button>
          <button
            className="itm_nav_bar_btn"
            onClick={() => (window.location.href = "/balldetails")}
          >
            Ball
          </button>
          <button
            className="itm_nav_bar_btn"
            onClick={() => (window.location.href = "/batdetails")}
          >
            Bat
          </button>
          <button
            className="itm_nav_bar_btn"
            onClick={() => (window.location.href = "/glovesdetails")}
          >
            Gloves
          </button>
          <button
            className="itm_nav_bar_btn"
            onClick={() => (window.location.href = "/helmetdetails")}
          >
            Helmets
          </button>
          <button
            className="itm_nav_bar_btn"
            onClick={() => (window.location.href = "/padsdetails")}
          >
            Pads
          </button>
          <button
            className="itm_nav_bar_btn"
            onClick={() => (window.location.href = "/shooesdetails")}
          >
            Shoes
          </button>
        </div>
      </div>
      <div className="item_details_body">
        <div className="search_box">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="serch_ipt"
            placeholder="Search Items"
          />
          <button onClick={handleSearch} className="serchbtn">
            Search
          </button>
        </div>
        <div>
          <br></br>
          <div className="card_set_item">
            {noResults ? (
              <h1 className="item-topic">
                No results <span className="item-us">found</span>
              </h1>
            ) : (
              items.map((item) => (
                <div>
                  <div className="">
                    <div key={item._id} className="card_item ">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt="Item_Image"
                          className="itm_img"
                        />
                      )}
                      <p className="itmname">{item.name}</p>
                      <div className="details_card_itm">
                        <p className="card_details">
                          <b>Quantity:</b> {item.quantity}
                        </p>
                        <p className="card_details">
                          <b>Size:</b> {item.size}
                        </p>
                        <p className="card_details">
                          <b>Company:</b> {item.company}
                        </p>
                      </div>

                      <div className="btn_box">
                        <button
                          className="update_btn"
                          onClick={() => handleUpdate(item._id)}
                        >
                          Get Item
                        </button>
                      </div>
                      {updateData.id === item._id && (
                        <form className="update_form" onSubmit={handleSubmit}>
                          <hr></hr>
                          <br></br>
                          <br></br>
                          <label className="item-full-box-label">
                            Available Quantity
                          </label>
                          <br></br>
                          <input
                            className="item-full-box-input_update"
                            type="number"
                            name="quantity"
                            value={updateData.quantity}
                            onChange={(e) =>
                              handleChange(e.target.value, "quantity")
                            }
                            readOnly
                          />
                          <br></br>

                          <div>
                            <label className="item-full-box-label">
                              How Much You Want ?
                            </label>
                            <input
                              className="item-full-box-input_update"
                              type="number"
                              value={increaseQuantityBy}
                              onChange={(e) => {
                                const newValue = Math.min(
                                  Number(e.target.value),
                                  updateData.quantity
                                );
                                setIncreaseQuantityBy(newValue);
                              }}
                            />
                            <br></br>
                            <button
                              className="serchbtn"
                              onClick={handleQuantityIncrease}
                            >
                              Add
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Additional input for increasing quantity */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
