// import React, { useState, useEffect } from "react";
// import Header from "../navbar/header";
// import Footer from "../footer/Footer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import "./Cart.css";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedCart);
//   }, []);

//   const handleRemoveFromCart = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleIncrementQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity += 1;
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleDecrementQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     if (updatedCart[index].quantity > 1) {
//       updatedCart[index].quantity -= 1;
//       setCartItems(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems
//       .reduce((total, item) => total + item.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   return (
//     <div className="cart-container">
//       <Header />
//       <main>
//         <h1>Shopping Cart</h1>
//         <div className="cart-list">
//           {cartItems.length > 0 ? (
//             cartItems.map((item, index) => (
//               <div key={index} className="cart-item">
//                 <img src={/${item.image}} alt={item.productName} className="cart-item-image" />
//                 <div className="item-details">
//                 <div className="w-64">
//                   <h2 className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
//                   {item.productName}
//                   </h2>
//                 </div>
                 
//                   <p className="price-tag">Price: Rs.{item.price}</p>
//                   <p>Category: {item.category}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <div className="quantity-controls flex gap-5 mb-4">
//                     <button
//                       className="quantity-btn increment-btn"
//                       onClick={() => handleIncrementQuantity(index)}
//                     >
//                       +
//                     </button>
//                     <button
//                       className="quantity-btn decrement-btn"
//                       onClick={() => handleDecrementQuantity(index)}
//                     >
//                       -
//                     </button>
//                   </div>
//                   <button className="remove-btn" onClick={() => handleRemoveFromCart(index)}>
//                     <FontAwesomeIcon icon={faTrashAlt} className="remove-icon" />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>Your cart is empty</p>
//           )}
//         </div>

//         {cartItems.length > 0 && (
//           <div className="order-summary">
//             <h2>Order Summary</h2>
//             <p>
//               Total Items:{" "}
//               {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//             </p>
//             <p>Total Price: Rs.{calculateTotal()}</p>
//             <a href='/payment'>
//             <button className="checkout-button">Proceed to Checkout</button></a>
         
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import Header from "../navbar/header";
import Footer from "../footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <Header />
      <main>
        <h1>Shopping Cart</h1>
        <div className="cart-list">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={`/${item.image}`}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="item-details">
                  <div className="w-64">
                    <h2 className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.productName}
                    </h2>
                  </div>
                  <p className="price-tag">Price: Rs.{item.price}</p>
                  <p>Category: {item.category}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className="quantity-controls flex gap-5 mb-4">
                    <button
                      className="quantity-btn increment-btn"
                      onClick={() => handleIncrementQuantity(index)}
                    >
                      +
                    </button>
                    <button
                      className="quantity-btn decrement-btn"
                      onClick={() => handleDecrementQuantity(index)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="remove-icon" />
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="order-summary">
            <h2>Order Summary</h2>
            <p>
              Total Items:{" "}
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p>Total Price: Rs.{calculateTotal()}</p>
            <a href="/payment">
              <button className="checkout-button">Proceed to Checkout</button>
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
