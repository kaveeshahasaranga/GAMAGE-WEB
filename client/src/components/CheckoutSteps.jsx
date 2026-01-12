import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex justify-center mb-8">
            <ul className="flex items-center gap-8 text-sm uppercase tracking-widest font-bold">
                <li>
                    {step1 ? (
                        <Link to="/login" className="text-omega-gold">Sign In</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Sign In</span>
                    )}
                </li>
                <li>
                    {step2 ? (
                        <Link to="/shipping" className="text-omega-gold">Shipping</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Shipping</span>
                    )}
                </li>
                <li>
                    {step3 ? (
                        <Link to="/payment" className="text-omega-gold">Payment</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Payment</span>
                    )}
                </li>
                <li>
                    {step4 ? (
                        <Link to="/placeorder" className="text-omega-gold">Place Order</Link>
                    ) : (
                        <span className="text-gray-400 cursor-not-allowed">Place Order</span>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default CheckoutSteps;
