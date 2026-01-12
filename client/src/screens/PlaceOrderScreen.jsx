import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../store/ordersApiSlice';
import { clearCartItems } from '../store/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();

            dispatch(clearCartItems());
            navigate(`/order/${res._id}`); // We will create this screen next
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Order Details */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white p-6 rounded shadow border-t border-gray-100 mb-6">
                        <h2 className="text-xl font-serif font-bold mb-4 uppercase text-gray-700">Shipping</h2>
                        <p className="mb-2">
                            <span className="font-bold">Address: </span>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow border-t border-gray-100 mb-6">
                        <h2 className="text-xl font-serif font-bold mb-4 uppercase text-gray-700">Payment Method</h2>
                        <p className="mb-2">
                            <span className="font-bold">Method: </span>
                            {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow border-t border-gray-100">
                        <h2 className="text-xl font-serif font-bold mb-4 uppercase text-gray-700">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 py-4">
                                        <div className="w-12 h-12 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <Link to={`/product/${item._id}`} className="hover:text-omega-gold font-medium">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-gray-500">
                                            {item.qty} x ${item.price} = <span className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-bold mb-6 font-serif uppercase tracking-widest text-center">Order Summary</h2>

                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>${cart.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>${cart.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>${cart.taxPrice}</span>
                        </div>
                        <div className="flex justify-between mb-6 pt-4 border-t border-gray-300">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg">${cart.totalPrice}</span>
                        </div>

                        {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error?.data?.message || error.error}</div>}

                        <button
                            type="button"
                            disabled={cart.cartItems.length === 0 || isLoading}
                            onClick={placeOrderHandler}
                            className="w-full bg-omega-dark text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-omega-gold transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
