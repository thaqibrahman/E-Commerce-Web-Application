import React from 'react';
import BidForm from './BidForm';

function ItemCard({ item, currentUser, refreshItems }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '250px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
      <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px' }}>{item.description}</p>
      <p style={{ margin: '5px 0' }}><strong>Starting Price:</strong> ${item.startingPrice}</p>
      <p style={{ margin: '5px 0' }}><strong>Current Bid:</strong> ${item.currentBid}</p>
      <p style={{ margin: '5px 0 15px 0' }}><strong>Highest Bidder:</strong> {item.highestBidder || 'None'}</p>
      
      {currentUser ? (
        <BidForm 
          itemId={item._id} 
          currentBid={item.currentBid} 
          currentUser={currentUser} 
          refreshItems={refreshItems} 
        />
      ) : (
        <p style={{ color: '#d9534f', fontSize: '14px', margin: '0' }}>Log in to place a bid.</p>
      )}
    </div>
  );
}

export default ItemCard;
