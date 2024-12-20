import React, { useState } from "react";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 499, quantity: 1 },
    { id: 2, name: "Product 2", price: 899, quantity: 2 },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = () => {
    alert("Proceeding to payment...");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Paytm Checkout</h1>
      </header>

      <main>
        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-lg mt-4">
            <p>Total</p>
            <p>₹{calculateTotal()}</p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="credit-card" className="text-teal-500" />
              <span className="text-lg">Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="upi" className="text-teal-500" />
              <span className="text-lg">UPI</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="wallet" className="text-teal-500" />
              <span className="text-lg">Paytm Wallet</span>
            </label>
          </div>
          <button
            className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-200"
            onClick={handlePayment}
          >
            Pay ₹{calculateTotal()}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-8 text-sm text-gray-500">
        <p>© 2024 Paytm Payments</p>
      </footer>
    </div>
  );
};

export default CheckoutPage;
