import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

function ItemList({ currentUser }) {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/items');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {items.length === 0 ? (
        <p>No items available for auction.</p>
      ) : (
        items.map(item => (
          <ItemCard 
            key={item._id} 
            item={item} 
            currentUser={currentUser} 
            refreshItems={fetchItems} 
          />
        ))
      )}
    </div>
  );
}

export default ItemList;
