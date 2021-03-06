import React from "react";
import NumberFormat from "react-number-format";
import { PATHS } from "../../../../../constants/paths";
import CartItemViewModel from "../../../../../types/models/CartItemViewModel";

const OrderItem = ({ item }: { item: CartItemViewModel }) => {
  return (
    <div>
      <div className="item w-full h-auto flex bg-white p-3 ">
        <img
          className="w-1/5 h-1/5"
          src={item.book?.thumbnailUrl}
          alt="bookThumnail"
        />
        <div className="info buttons flex-grow items-start text-left mt-4 pl-4">
          <a
            href={PATHS.BOOK + "/" + item.book.id}
            className="font-md text-lg hover:underline"
          >
            {item.book.title}
          </a>
          {/* <div className="buttons mt-3">
            <button className="focus:outline-none hover:bg-red-500 bg-red-400 rounded-md px-3 py-2">
              Xóa
            </button>
          </div> */}
        </div>
        <div className="flex flex-col gap-x-2 mt-4">
          <p className="font-md text-lg">
            <NumberFormat
              value={item.book?.price * item.quantity}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
            ></NumberFormat>
          </p>
          <div className="quantity h-auto border flex">
            <button className="focus:outline-none px-3" disabled={true}>
              -
            </button>
            <p className="p-2 border-l border-r text-center">{item.quantity}</p>
            <button className="focus:outline-none px-3" disabled={true}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
