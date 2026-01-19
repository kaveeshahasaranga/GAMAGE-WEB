import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../store/productsApiSlice';
import { addToCart } from '../store/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review Submitted');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition" to="/">
                <FaArrowLeft /> Back to Collection
            </Link>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <Meta title={product.name} />
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Product Image */}
                        <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-xl flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="w-full md:w-1/2">
                            <div className="mb-2 text-sm text-gray-500 uppercase tracking-widest">{product.brand}</div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-gray-900">{product.name}</h1>

                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />

                            <div className="text-2xl font-bold text-gray-900 mt-4 mb-6">${product.price}</div>

                            <p className="text-gray-600 leading-relaxed mb-8 border-t border-b border-gray-100 py-6">
                                {product.description}
                            </p>

                            {/* Stock & Add to Cart */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold text-gray-700">Status:</span>
                                    <span className={product.countInStock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {product.countInStock > 0 && (
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-semibold text-gray-700">Quantity:</span>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                            className="border rounded p-2 focus:outline-none focus:border-omega-gold"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className={`w-full flex items-center justify-center gap-2 py-3 uppercase tracking-widest text-xs font-bold transition duration-300 ${product.countInStock === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-omega-dark text-white hover:bg-omega-gold'
                                        }`}
                                >
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                            <div className="mt-6 text-xs text-gray-500 text-center">
                                Free Shipping & Returns | 5-Year Warranty
                            </div>
                        </div>
                    </div>
                    <div className="mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-serif font-bold mb-6">Reviews</h2>
                            {product?.reviews.length === 0 && <Message>No Reviews</Message>}
                            <div className="space-y-8">
                                {product?.reviews.map((review) => (
                                    <div key={review._id} className="bg-white p-6 rounded shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <strong className="font-bold">{review.name}</strong>
                                            <span className="text-sm text-gray-500">{review.createdAt.substring(0, 10)}</span>
                                        </div>
                                        <Rating value={review.rating} />
                                        <p className="mt-4 text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                                <div className="mt-10 bg-gray-50 p-8 rounded-xl">
                                    <h2 className="text-xl font-bold mb-4">Write a Customer Review</h2>
                                    {loadingProductReview && <Loader />}
                                    {userInfo ? (
                                        <form onSubmit={submitHandler}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">Rating</label>
                                                <select
                                                    className="w-full p-2 border rounded focus:outline-none focus:border-omega-gold"
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">Comment</label>
                                                <textarea
                                                    className="w-full p-2 border rounded h-32 focus:outline-none focus:border-omega-gold"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loadingProductReview}
                                                className="bg-omega-dark text-white px-6 py-2 rounded hover:bg-black transition"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    ) : (
                                        <Message>
                                            Please <Link to="/login" className="font-bold underline">sign in</Link> to write a review
                                        </Message>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductScreen;
