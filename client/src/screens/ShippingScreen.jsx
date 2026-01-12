import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="max-w-md mx-auto py-8 container">
            <CheckoutSteps step1 step2 />
            <h1 className="text-3xl font-serif font-bold mb-6 text-center">Shipping</h1>

            <form onSubmit={submitHandler} className="bg-white p-6 rounded shadow-lg border-t-4 border-omega-gold">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <input type="text" value={address} required onChange={(e) => setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                    <input type="text" value={city} required onChange={(e) => setCity(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                    <input type="text" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                    <input type="text" value={country} required onChange={(e) => setCountry(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                </div>

                <button type="submit" className="bg-omega-dark text-white font-bold py-2 px-4 rounded w-full hover:bg-black transition">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default ShippingScreen;
