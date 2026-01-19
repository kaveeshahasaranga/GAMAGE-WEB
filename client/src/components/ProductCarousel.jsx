import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../store/productsApiSlice';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading ? (
        null
    ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-omega-dark mb-4'>
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <div className="flex flex-col md:flex-row items-center justify-center p-8 gap-8">
                            <Image src={product.image} alt={product.name} fluid className="max-h-[300px] object-contain" />
                            <div className="text-white text-center md:text-left">
                                <h2 className="text-2xl font-serif font-bold mb-2">{product.name}</h2>
                                <h3 className="text-xl text-omega-gold mb-4">${product.price}</h3>
                                <p className="text-gray-300 max-w-md hidden md:block">{product.description.substring(0, 100)}...</p>
                            </div>
                        </div>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
