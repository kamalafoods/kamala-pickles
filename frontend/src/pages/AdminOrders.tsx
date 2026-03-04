import { useEffect, useState } from "react";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  items: Item[];
  createdAt: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/all`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.log("Error fetching orders:", err));
  }, []);

       return (
        <div style={{ padding: 20, fontFamily: "Montserrat" }}>
          <h2>All Orders</h2>

          {orders.length === 0 && <p>No orders found.</p>}

          {Object.entries(
            orders.reduce((groups: any, order) => {
              const date = new Date(order.createdAt).toLocaleDateString();

              if (!groups[date]) {
                groups[date] = [];
              }

              groups[date].push(order);
              return groups;
            }, {})
          ).map(([date, dailyOrders]) => (
            <div key={date} style={{ marginBottom: 40, fontFamily: "Montserrat" }}>
              <h2 style={{ marginBottom: 10, fontSize: 24 }}>
                📅 {date} ({(dailyOrders as Order[]).length} Orders)
              </h2>

              {(dailyOrders as Order[]).map((order) => (
                <div
                  key={order._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 20,
                    marginBottom: 15,
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  <h3>Order ID: {order.orderId}</h3>

                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>

                  <p>
                    <strong>Total Products:</strong>{" "}
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </p>
                  <h4>Items: </h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ marginLeft: 20 }}>
                        <p><strong>{item.name}</strong> - {item.quantity} x ₹{item.price} = ₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                    </ul>
                  <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
);
};

export default AdminOrders;
