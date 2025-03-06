import "./styles.css";
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const progress = (totalCost / THRESHOLD) * 100;
  const eligibleForGift = totalCost >= THRESHOLD;

  return (
    <div className="shopping-cart-container">
      <h1 className="shop-title">Shop</h1>
      <div className="product-list">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-item">
            <span>
              {product.name} - ₹{product.price}
            </span>
            <button onClick={() => addToCart(product)} className="add-button">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-list">
        {cart.length === 0 ? (
          <p className="empty-cart">Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>
                {item.name} - ₹{item.price} x
              </span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="quantity-input"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <h3>Total:{totalCost}</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="gift-info">
        {eligibleForGift
          ? ` 🎁You earned a free gift: ${FREE_GIFT.name}!`
          : `Spend ₹${THRESHOLD - totalCost} more for a free gift.`}
      </p>
      {eligibleForGift && (
        <div className="gift-message">
          <p> 🎉Congratulations! You've unlocked a free {FREE_GIFT.name}!</p>
        </div>
      )}
    </div>
  );
}
