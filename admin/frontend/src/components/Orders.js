import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packingMaterials, setPackingMaterials] = useState([]); // State for packing materials
  const [selectedPackingMaterial, setSelectedPackingMaterial] = useState(''); // State for selected packing material

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchPackingMaterials = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/materials');
        const data = await response.json();
        setPackingMaterials(data); // Store fetched materials in state
      } catch (error) {
        console.error('Error fetching packing materials:', error);
      }
    };

    fetchOrders();
    fetchPackingMaterials();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order); // Set the selected order
    setSelectedPackingMaterial(''); // Reset packing material selection
  };

  // Filter packing materials based on the selected order's product type and matching material from the materialsDummy collection
  const filteredPackingMaterials = packingMaterials.filter(material => 
    material.Material === selectedOrder?.productType // Match product type with Material in materialsDummy
  );

  return (
    <div>
      <h2>Available Order IDs</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} onClick={() => handleOrderClick(order)} style={{ cursor: 'pointer' }}>
            <h3>Order ID: {order.orderId}</h3>
          </div>
        ))
      ) : (
        <p>No orders available</p>
      )}

      {selectedOrder && (
        <div>
          <h2>Selected Order Details</h2>
          <img src={selectedOrder.productImage} alt={selectedOrder.productName} width="200" />
          <h3>Product Name: {selectedOrder.productName}</h3>
          <p>Product Description: {selectedOrder.productDescription}</p>
          
          <h4>Select Packing Material:</h4>
          {filteredPackingMaterials.length > 0 ? (
            <select 
              value={selectedPackingMaterial} 
              onChange={(e) => setSelectedPackingMaterial(e.target.value)}
            >
              <option value="">--Select Packing Material--</option>
              {filteredPackingMaterials.map((material) => (
                <>
                  <option key={material._id} value={material.PackingMaterial1}>
                    {material.PackingMaterial1}
                  </option>
                  <option key={material._id + '2'} value={material.PackingMaterial2}>
                    {material.PackingMaterial2}
                  </option>
                  <option key={material._id + '3'} value={material.PackingMaterial3}>
                    {material.PackingMaterial3}
                  </option>
                  <option key={material._id + '4'} value={material.PackingMaterial4}>
                    {material.PackingMaterial4}
                  </option>
                </>
              ))}
            </select>
          ) : (
            <p>No packing materials available for this product type.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
