import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div className="w-96 bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 p-5">

      {/* Badge */}
      <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        Featured
      </span>

      {/* Image */}
      <div className="flex justify-center items-center h-96 mt-4">
        <img
          src={imageUrl}
          alt={name}
          className="h-full object-contain hover:scale-105 transition duration-300"
        />
      </div>

      {/* Header */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 leading-tight">
          {name}
        </h2>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-100 my-4"></div>

      {/* Features (static or dynamic bana sakta hai later) */}
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <span className="text-green-500">✓</span> Premium Quality
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-500">✓</span> Fast Delivery
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-500">✓</span> Secure Payment
        </li>
      </ul>

      {/* Price + Button */}
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-gray-900">${price}</p>
        </div>

        <Link
          to={`/product/${productId}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition"
        >
          <ShoppingCart size={16} />
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;