import OrderStatus from './components/OrderStatus';

function App() {
  const orderId = '12345';  // Example orderId

  return (
    <div className="App">
      <OrderStatus orderId={orderId} />  {/* Pass orderId as prop */}
    </div>
  );
}

export default App;
