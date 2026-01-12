import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="max-w-md mx-auto py-8 container">
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-3xl font-serif font-bold mb-6 text-center">Payment Method</h1>

            <form onSubmit={submitHandler} className="bg-white p-6 rounded shadow-lg border-t-4 border-omega-gold">
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-bold mb-4">Select Method</label>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked={paymentMethod === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-omega-gold border-gray-300 focus:ring-omega-gold"
                        />
                        <label htmlFor="PayPal" className="ml-2 text-sm font-medium text-gray-900">PayPal or Credit Card</label>
                    </div>
                </div>

                <button type="submit" className="bg-omega-dark text-white font-bold py-2 px-4 rounded w-full hover:bg-black transition">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default PaymentScreen;
