import React from "react";
import axios from "axios";
import Card from "../components/Card";

function Orders() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://635291eca9f3f34c3741e133.mockapi.io/orders"
        );
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false)
      } catch (error) {
        window.alert("Что-то пошло не по плану...")
        console.log(error)
      }   
    }
    fetchData();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
        <div className="search-Block d-flex"></div>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? Array(8).fill(<Card loading={isLoading}/>) : orders).map((item, index) => (
          <Card id={item.id}
          key={index}
          title={item.title}
          price={item.price}
          imageURL={item.imageURL}
          loading={isLoading}/>
        ))}
      </div>
    </div>
  );
}

export default Orders;
