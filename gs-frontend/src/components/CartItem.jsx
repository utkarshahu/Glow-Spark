import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">

      {/* Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <Link
          to={`/product/${item.product}`}
          className="text-gray-800 font-medium hover:text-blue-600 transition"
        >
          {item.name}
        </Link>

        <p className="text-sm text-gray-500 mt-1">
          ${item.price}
        </p>
      </div>

      {/* Qty */}
      <div>
        <select
          value={item.qty}
          onChange={(e) =>
            qtyChangeHandler(item.product, e.target.value)
          }
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeHandler(item.product)}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
      >
        🗑
      </button>
    </div>
  );
};

export default CartItem;