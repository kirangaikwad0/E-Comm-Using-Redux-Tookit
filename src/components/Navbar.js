import React from "react";
import styles from "../styles/Navbar.module.css";

import { FaPlus, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { carts } = useSelector((state) => state.allCart);
  console.log(carts);

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <div className={styles.heading}>
          <Link to="/" className={styles.heading}>
            eCommerce
          </Link>
        </div>
        <div>
          <Link to="/" className={styles.link}>
            Products
          </Link>
        </div>
        <div className={styles.add}>
          <Link to="/create" className={styles.link}>
            Add a product <FaPlus />
          </Link>
        </div>
      </div>
      <div className={styles.username}>
        <span className="p1 fa-stack fa-2x has-badge" data-count={carts.length}>
          <Link to="/cart">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9376/9376776.png"
              alt="add to cart"
              data-count={carts.length}
            />
          </Link>
        </span>
        <h2>
          Kiran Gaikwad <FaUserCircle />
        </h2>
      </div>
    </div>
  );
};

export default Navbar;
