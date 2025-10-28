import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cartSlice';

const products = [
  { id: 1, name: 'Laptop', price: 75000 },
  { id: 2, name: 'Headphones', price: 2000 },
  { id: 3, name: 'Keyboard', price: 1500 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 Product List</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: 10 }}>
          <strong>{product.name}</strong> — ₹{product.price}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => dispatch(addItem(product))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
