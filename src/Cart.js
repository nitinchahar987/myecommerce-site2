import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Cart = ({ cart, removeFromCart,increaseQuantity,decreaseQuantity }) => {
 
 
  const [titems,settitems]=useState(1)
 

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
  Brand: {item.brand}
</p>
<div className="flex items-center gap-2 mt-2">
  <button
    className="px-2 py-1 bg-gray-200 rounded text-xl font-bold"
    onClick={() => decreaseQuantity(item.id)}
  >
    -
  </button>
  <span className="font-bold text-xl">{item.quantity}</span>
  <button
    className="px-2 py-1 bg-gray-200 rounded text-xl font-bold"
    onClick={() => increaseQuantity(item.id)}
  >
    +
  </button>
</div>
                  <p className="text-red-600 font-bold mt-2">₹{item.price * 100*item.quantity}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="px-4 py-2 text-sm font-semibold text-white
                 bg-red-500 hover:bg-red-600 rounded"  onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;