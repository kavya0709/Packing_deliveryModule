import React, { useState } from 'react';
import axios from 'axios';

const UpdateStatus = ({ orderId }) => {
  const [stage, setStage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/status', {
        orderId,
        status: { stage, description, timestamp: new Date() }
      });
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={stage} 
        onChange={(e) => setStage(e.target.value)} 
        placeholder="Stage (e.g., Shipped)"
        required 
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description"
        required 
      />
      <button type="submit">Update Status</button>
    </form>
  );
};

export default UpdateStatus;
