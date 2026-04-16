import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/localstorage";
import logo from "../assets/logo.jpeg";
const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const _handleLogout = () => {
    dispatch(setInitialState());
    logout();
    history.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
  <img
    src={logo}
    alt="Glow Spark"
    className="h-10 w-10 object-contain rounded-full shadow-sm"
  />
  <span className="text-lg font-semibold text-gray-800 tracking-tight">
    Glow<span className="text-blue-600">Spark</span>
  </span>
</Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">

          <Link to="/" className="hover:text-blue-600 transition">
            Shop
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1 hover:text-blue-600 transition"
          >
            🛒 Cart

            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Auth */}
          {!user?.userInfo?.isLogin ? (
            <Link
              to="/signin"
              className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={_handleLogout}
              className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={click}
        >
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;