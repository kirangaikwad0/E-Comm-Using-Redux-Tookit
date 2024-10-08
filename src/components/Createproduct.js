import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/ProductDetailSlice";
import { useNavigate } from "react-router-dom";

const Createproduct = () => {
  const [products, setProducts] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductData = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      setProducts((prevState) => ({
        ...prevState,
        rating: Number(value), // Ensure rating is a number
      }));
    } else {
      setProducts({ ...products, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting product:", products); // Debugging output

    try {
      const result = await dispatch(createProduct(products)).unwrap(); // Unwrap the result
      console.log("Product created successfully:", result); // Debugging output
      navigate("/"); // Navigate only after successful creation
    } catch (error) {
      console.error("Failed to create product:", error); // Handle error
    }
  };

  return (
    <div>
      <h2 className="text-center mt-1">Add Product</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={products.title}
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={products.price}
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            name="description"
            value={products.description}
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            className="form-control"
            name="category"
            value={products.category}
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            name="image"
            value={products.image}
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            className="form-control"
            name="rating"
            value={products.rating || ""}
            onChange={getProductData}
            min="0"
            max="5"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Createproduct;
