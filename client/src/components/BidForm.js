import React, { useState } from 'react';

function BidForm({ itemId, currentBid, currentUser, refreshItems }) {
  const [bidAmount, setBidAmount] = useState('');

  const submitBid = async (e) => {
    e.preventDefault();
    const amount = Number(bidAmount);
    
    if (amount <= currentBid) {
      alert('Bid must be higher than the current bid ($' + currentBid + ')');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/items/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, bidAmount: amount, username: currentUser })
      });
      
      const data = await res.json();
      if (res.ok) {
        setBidAmount('');
        refreshItems();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <form onSubmit={submitBid} style={{ marginTop: '10px' }}>
      <input 
        type="number" 
        placeholder={`Min $${currentBid + 1}`} 
        value={bidAmount} 
        onChange={(e) => setBidAmount(e.target.value)} 
        required
        style={{ width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }}
      />
      <button 
        type="submit" 
        style={{ width: '100%', padding: '8px', backgroundColor: '#0275d8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Place Bid
      </button>
    </form>
  );
}

export default BidForm;
