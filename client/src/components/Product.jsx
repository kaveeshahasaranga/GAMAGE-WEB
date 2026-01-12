import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
            <Link to={`/product/${product._id}`}>
                <div className="relative overflow-hidden h-64 bg-gray-50 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </Link>

            <div className="p-5">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans tracking-tight hover:text-omega-gold transition-colors truncate">
                        {product.name}
                    </h3>
                </Link>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-3">{product.brand}</div>

                <Rating value={product.rating} text={`${product.numReviews} reviews`} />

                <div className="flex items-center justify-between mt-4">
                    <h3 className="text-xl font-bold text-gray-900">${product.price}</h3>
                    <Link to={`/product/${product._id}`} className="text-sm text-omega-gold font-bold uppercase tracking-wider hover:text-black transition-colors">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
