//@ts-ignore
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { PATHS } from "../../constants/paths";
import orderApi from "../../services/api/orderApi";
import OrderModel from "../../types/models/OrderModel";
import User from "../../types/models/UserModel";

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderModel>([]);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const getOrderList = () => {
    orderApi
      .getAllOrder(user.id)
      .then((response) => {
        console.log(response.data);

        setOrders([...response.data]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    if (user !== undefined) {
      getOrderList();
    }
  }, [orders.count]);

  const orderListUI = orders.map((order: OrderModel) => {
    return (
      <tr className="py-4">
        <td className="text-left text-blue-400 pl-3 py-4">
          <a href={PATHS.ORDER + "/" + order.id}>{order.id}</a>
        </td>
        <td className="text-left">{order.createdAt}</td>
        <td className="text-left">
          <NumberFormat
            value={order.totalPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" đ"}
          ></NumberFormat>
        </td>
        <td className="text-left">Shipping</td>
      </tr>
    );
  });

  return (
    <div className="w-full h-full bg-white mt-8">
      <p className="text-xl font-bold py-6">Orders</p>
      <table className="w-full pl-5 border bg-white">
        <thead className="px-3 border border-l-0 border-r-0 border-t-0 pb-5">
          <tr>
            <th className="text-gray-500 font-medium text-left pl-3 pb-4">
              Order ID
            </th>
            <th className="text-gray-500 font-medium text-left">Created At</th>
            <th className="text-gray-500 font-medium text-left">Total Price</th>
            <th className="text-gray-500 font-medium text-left">Status</th>
          </tr>
        </thead>
        <tbody>{orderListUI}</tbody>
      </table>
    </div>
  );
};

export default OrderPage;
