import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "../../Item.css";
const URL = "http://localhost:9000/api/items";

const ItemDetails = () => {
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

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      setItems(response.data.items);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchItems(); // Refresh items after update
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedItems = items.filter((item) => item._id !== id);
        setItems(updatedItems); // Update items after delete
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  /*PDF---------- */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Payment Document",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled")
  });
  
  return (
    <div className="itmdetails bg-white">
      <div className="admin_topic_item">
        Admin<span className="admin_sub_topic_item"> Dash Board</span>
      </div>
      <div className="item_details_body">
        <div className="btn_con_item">
          <button
            type="submit"
            className="item-add-btn-admin"
            onClick={() => (window.location.href = "/admin/additem")}
          >
            Add Item
          </button>
          <button
            type="submit"
            className="item-add-btn-admin"
            onClick={handlePrint}
          >
            Generate Report
          </button>
        </div>
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
        <div ref={summaryRef}>
          <div className="admin_topic_item">
            Product<span className="admin_sub_topic_item"> Details</span>
          </div>
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
                          Update
                        </button>
                        <button
                          className="dlt_btn"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                      {updateData.id === item._id && (
                        <form className="update_form" onSubmit={handleSubmit}>
                          <hr></hr>
                          <br></br>
                          <label className="item-full-box-label">Name</label>
                          <br></br>
                          <input
                            className="item-full-box-input_update"
                            type="text"
                            name="name"
                            value={updateData.name}
                            onChange={(e) =>
                              handleChange(e.target.value, "name")
                            }
                            required
                          />
                          <br></br>
                          <label className="item-full-box-label">
                            Quantity
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
                            required
                          />
                          <br></br>
                          <label className="item-full-box-label">Size</label>
                          <br></br>
                          <input
                            className="item-full-box-input_update"
                            type="text"
                            name="size"
                            value={updateData.size}
                            onChange={(e) =>
                              handleChange(e.target.value, "size")
                            }
                            required
                          />
                          <br></br>
                          <label className="item-full-box-label">Company</label>
                          <br></br>
                          <input
                            className="item-full-box-input_update"
                            type="text"
                            name="company"
                            value={updateData.company}
                            onChange={(e) =>
                              handleChange(e.target.value, "company")
                            }
                            required
                          />
                          <br></br>
                          <button type="submit" className="item-add-btn">
                            Save
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
