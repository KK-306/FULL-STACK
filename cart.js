import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cartSlice';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧾 Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <strong>{item.name}</strong> — ₹{item.price} ×
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: Number(e.target.value),
                  })
                )
              }
              style={{ width: 50, margin: '0 10px' }}
            />
            <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
