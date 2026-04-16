import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// Actions
import {getProductDetails} from '../redux/actions/productActions'
import {addToCart} from '../redux/actions/cartActions'

const ProductScreen = ({match, history}) => {
  const [qty, setQty] = useState(1)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.getProductDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id))
    }
  }, [dispatch, match, product])

  const addToCartHandler = () => {
    if (user.userInfo.isLogin) {
      dispatch(addToCart(product._id, qty))
      history.push(`/cart`)
      return
    } else {
      alert('You need to first login.')
    }
  }

  return (
  <div className="max-w-6xl mx-auto px-4 py-8">
    {loading ? (
      <h2 className="text-center text-lg">Loading...</h2>
    ) : error ? (
      <h2 className="text-center text-red-500">{error}</h2>
    ) : (
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT - IMAGE */}
        <div className="bg-white rounded-3xl shadow-md p-6 flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-[400px] object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* RIGHT - INFO */}
        <div className="bg-white rounded-3xl shadow-md p-6 space-y-5">

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h1>

          {/* Price */}
          <div className="text-2xl font-bold text-blue-600">
            ${product.price}
          </div>

          {/* Status */}
          <div>
            <span className="text-gray-600">Status: </span>
            <span
              className={`font-medium ${
                product.countInStock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Qty */}
          {product.countInStock > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Qty:</span>
              <select
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option  key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Button */}
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              product.countInStock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            Add To Cart
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default ProductScreen
