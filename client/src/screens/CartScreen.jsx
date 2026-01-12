import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../store/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold mb-8 text-gray-900 uppercase tracking-widest">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg mb-4">Your cart is currently empty.</p>
                    <Link to="/" className="text-omega-gold underline hover:text-black">Return to Collection</Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="w-full lg:w-2/3">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-100 py-6 last:border-0">
                                <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded p-2 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                </div>

                                <div className="flex-grow text-center sm:text-left">
                                    <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 hover:text-omega-gold transition">
                                        {item.name}
                                    </Link>
                                    <div className="text-sm text-gray-500">{item.brand}</div>
                                    <div className="font-bold mt-1">${item.price}</div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <select
                                        className="border rounded p-2 focus:outline-none focus:border-omega-gold"
                                        value={item.qty}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => removeFromCartHandler(item._id)}
                                        className="text-gray-400 hover:text-red-500 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <Link className="inline-flex items-center gap-2 text-gray-500 hover:text-black mt-8 transition text-sm" to="/">
                            <FaArrowLeft /> Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 font-serif">Order Summary</h2>

                            <div className="flex justify-between mb-2">
                                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                <span className="font-bold">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-6 text-sm text-gray-500">
                                <span>Shipping & Taxes calculated at checkout</span>
                            </div>

                            <button
                                type="button"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                className="w-full bg-omega-dark text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-omega-gold transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
