import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetOrderDetailsQuery, usePayOrderMutation } from '../store/ordersApiSlice';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    // Mock Pay (Replace with PayPal Button later)
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    // Mock Payment Handler
    const handleMockPayment = async () => {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
    };

    return isLoading ? (
        <div className="text-center py-20">Loading Order...</div>
    ) : error ? (
        <div className="text-center py-20 text-red-500">{error?.data?.message || error.error}</div>
    ) : (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold mb-6 text-gray-900 uppercase tracking-widest">Order {order._id}</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Details Column */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white p-6 rounded shadow border-t border-gray-100 mb-6">
                        <h2 className="text-xl font-bold mb-4 font-serif uppercase tracking-widest text-gray-700">Shipping</h2>
                        <p className="mb-2"><span className="font-bold">Name: </span> {order.user.name}</p>
                        <p className="mb-2"><span className="font-bold">Email: </span> <a href={`mailto:${order.user.email}`} className="text-omega-gold underline">{order.user.email}</a></p>
                        <p className="mb-4">
                            <span className="font-bold">Address: </span>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <div className="bg-green-100 text-green-800 p-3 rounded flex items-center gap-2"><FaCheckCircle /> Delivered on {order.deliveredAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-800 p-3 rounded flex items-center gap-2"><FaTimesCircle /> Not Delivered</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded shadow border-t border-gray-100 mb-6">
                        <h2 className="text-xl font-bold mb-4 font-serif uppercase tracking-widest text-gray-700">Payment</h2>
                        <p className="mb-4"><span className="font-bold">Method: </span> {order.paymentMethod}</p>
                        {order.isPaid ? (
                            <div className="bg-green-100 text-green-800 p-3 rounded flex items-center gap-2"><FaCheckCircle /> Paid on {order.paidAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-800 p-3 rounded flex items-center gap-2"><FaTimesCircle /> Not Paid</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded shadow border-t border-gray-100">
                        <h2 className="text-xl font-bold mb-4 font-serif uppercase tracking-widest text-gray-700">Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <p>Order is empty</p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 py-4">
                                        <div className="w-12 h-12 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <Link to={`/product/${item.product}`} className="hover:text-omega-gold font-medium">
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

                {/* Summary Column */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-bold mb-6 font-serif uppercase tracking-widest text-center">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>${order.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>${order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>${order.taxPrice}</span>
                        </div>
                        <div className="flex justify-between mb-6 pt-4 border-t border-gray-300">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg">${order.totalPrice}</span>
                        </div>

                        {/* Mock Payment Button (Only if not paid) */}
                        {!order.isPaid && (
                            <button
                                onClick={handleMockPayment}
                                disabled={loadingPay}
                                className="w-full bg-omega-dark text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-omega-gold transition duration-300 mb-2"
                            >
                                {loadingPay ? 'Processing...' : 'Mark As Paid (Demo)'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
