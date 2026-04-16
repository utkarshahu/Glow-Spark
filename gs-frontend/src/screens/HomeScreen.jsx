import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Product from "../components/Product";

// Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import { setUserDeatils } from "../redux/actions/userAction";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
    dispatch(setUserDeatils());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
        Latest Products
      </h2>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg animate-pulse">
            Loading products...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div
          className="
            grid 
            gap-10
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;