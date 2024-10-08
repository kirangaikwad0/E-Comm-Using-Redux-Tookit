import React, { useEffect, useState } from "react";
import styles from "../styles/DisplayProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  showProduct,
  updateProduct,
} from "../features/ProductDetailSlice";
import { addToCart } from "../features/CartSlice";
import toast from "react-hot-toast";

const DisplayProduct = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.app);
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
  const [editData, setEditData] = useState({}); // Store the product data being edited

  useEffect(() => {
    dispatch(showProduct());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Handle change in input fields for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Handle rating specifically to convert it to a number
    if (name === "rating") {
      setEditData({ ...editData, [name]: Number(value) });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  // Save updated product
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProduct(editData)); // Dispatch update action
    toast.success("Product updated successfully");
    setEditingProductId(null); // Close the edit form
  };

  // Handle edit button click
  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditData(product); // Set the product to be edited
  };

  // Add to cart
  const sendToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  };

  return (
    <>
      {products &&
        products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            {editingProductId === product.id ? (
              // Edit Form
              <form onSubmit={handleSave} className={styles.editForm}>
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={editData.image}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Rating:</label>
                  <input
                    type="number"
                    name="rating"
                    value={editData.rating || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingProductId(null)} // Close form
                >
                  Cancel
                </button>
              </form>
            ) : (
              // Product Display
              <>
                <div className={styles.left}>
                  <img
                    alt={product.title}
                    src={product.image || "default-image-url.jpg"}
                  />
                </div>
                <div className={styles.right}>
                  <div className={styles.title}>{product.title}</div>
                  <div className={styles.price}>Rs.{product.price}</div>
                  <div className={styles.rating}>
                    <span>{product.rating}</span>{" "}
                    {/* Directly display the rating */}
                    <img
                      className={styles.stars}
                      alt="stars"
                      src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    />
                  </div>
                </div>

                <div className={styles.details}>
                  <p>{product.description}</p>

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png"
                    alt="edit"
                    onClick={() => handleEditClick(product)} // Edit button
                  />

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png"
                    alt="delete"
                    onClick={() => {
                      dispatch(deleteProduct(product.id));
                      toast.success("Item deleted");
                    }}
                  />

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9376/9376776.png"
                    alt="add to cart"
                    className={styles.actionIcon}
                    onClick={() => sendToCart(product)} // Add to cart
                  />
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
};

export default DisplayProduct;
