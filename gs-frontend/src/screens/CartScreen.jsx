
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import useLogin from "../utils/hooks/useLogin";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { loginInfo } = useLogin();

  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart({ pId: item.product, _id: item._id }));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleProceedBtn = () => {
    alert("Functionality pending please stay tune, will be add soon.");
  };
if (loginInfo.loading) {
  return (
    <div className="flex justify-center items-center h-40">
      <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
    </div>
  );
}

if (!loginInfo.loading && loginInfo.isLogin)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Shopping Cart
      </h2>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT - CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">

          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <Link
                to="/"
                className="text-blue-600 font-medium hover:underline"
              >
                Go Back
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product}
                className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <CartItem
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={() => removeFromCartHandler(item)}
                />
              </div>
            ))
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">

          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Items ({getCartCount()})</span>
            <span>${getCartSubTotal()}</span>
          </div>

          <div className="w-full h-[1px] bg-gray-100 my-4"></div>

          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>${getCartSubTotal()}</span>
          </div>

          <button
            onClick={handleProceedBtn}
            disabled={cartItems.length === 0}
            className={`mt-6 w-full py-3 rounded-xl font-medium transition ${
              cartItems.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
