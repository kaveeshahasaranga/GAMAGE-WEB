import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../store/productsApiSlice';
import Product from '../components/Product';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({
        keyword,
        pageNumber,
    });

    return (
        <div className="bg-white">
            {/* HERO SECTION - Video Background */}
            <div className="relative h-screen w-full overflow-hidden mb-12">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop"
                >
                    {/* Placeholder Video - Replace with local file or preferred URL */}
                    <source src="https://videos.pexels.com/video-files/2773444/2773444-hd_1920_1080_30fps.mp4" type="video/mp4" />
                    <source src="https://cdn.pixabay.com/video/2021/04/12/70857-536224320_large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
                    <h2 className="text-sm md:text-lg font-bold tracking-[0.2em] mb-2 uppercase text-omega-gold">The Perfection of Time</h2>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-none">
                        MILANO<br />CORTINA 2026
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl font-light text-gray-200 mb-8">
                        Official Timekeeper. Precision and excellence in every moment.
                    </p>
                    <a href="#collection" className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-none uppercase tracking-widest text-xs font-bold transition duration-300">
                        Discover the Collection
                    </a>
                </div>
            </div>

            {/* FEATURE SECTION - Split Layout (Aqua Terra Style) */}
            <div className="container mx-auto px-4 mb-20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif text-gray-900 uppercase tracking-widest">Aqua Terra in Black</h2>
                    <p className="text-gray-500 mt-2 font-light">Presented in three sizes, the collection features a glossy black dial finishing via slight lacquered finish.</p>
                    <button className="mt-4 border-b border-gray-900 text-xs font-bold uppercase tracking-widest hover:border-omega-gold hover:text-omega-gold transition">Discover the Collection</button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Left: Lifestyle Image/Video */}
                    <div className="w-full md:w-1/2 relative h-[500px] bg-gray-100 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1374&auto=format&fit=crop"
                            alt="Lifestyle Watch"
                            className="w-full h-full object-cover hover:scale-105 transition duration-700"
                        />
                        {/* Option: Use Video here too */}
                    </div>

                    {/* Right: Product Highlight */}
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-8 bg-gray-50 h-[500px]">
                        <img
                            src="https://pngimg.com/d/watches_PNG9866.png"
                            alt="Featured Watch"
                            className="w-64 h-auto drop-shadow-2xl mb-8 hover:-translate-y-2 transition duration-500"
                        />
                        <h3 className="text-xl font-serif mb-2">SEAMASTER AQUA TERRA</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">150M CO-AXIAL MASTER CHRONOMETER</p>
                        <span className="text-lg font-bold mb-6">$6,300.00</span>
                        <Link to="/register" className="bg-omega-dark text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-omega-gold transition">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* VIDEO BREAK SECTION */}
            <div className="relative h-[60vh] w-full overflow-hidden mb-20 bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder for second video */}
                    <video
                        className="w-full h-full object-cover opacity-60"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="https://cdn.pixabay.com/video/2020/05/25/39567-424076332_large.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
                    <p className="text-xs font-bold tracking-[0.2em] mb-4 text-omega-gold uppercase">Master Chronometer</p>
                    <h2 className="text-4xl md:text-6xl font-serif mb-6">MADE BY HAND FOR<br />EVERY KIND OF WRIST</h2>
                    <button className="border border-white hover:bg-white hover:text-black text-white px-8 py-3 uppercase text-xs font-bold tracking-widest transition">
                        Watch The Story
                    </button>
                </div>
            </div>

            {/* PRODUCT GRID SECTION */}
            <div className="container mx-auto px-4 mb-20" id="collection">
                <h1 className="text-3xl font-serif font-bold mb-10 text-center text-gray-900 uppercase tracking-widest">
                    <span className="border-b-2 border-omega-gold pb-2">Latest Collection</span>
                </h1>

                {isLoading ? (
                    <div className="text-center py-20 text-xl text-gray-500">Loading fine timepieces...</div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 font-bold bg-red-50 p-4 rounded">{error?.data?.message || error.error}</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {data.products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                        <Paginate
                            pages={data.pages}
                            page={data.page}
                            keyword={keyword ? keyword : ''}
                        />
                        {data.products.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 text-lg mb-4">No products found for this search.</p>
                                <p className="text-gray-400">Try a different keyword or browse our full collection.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* FOOTER (Simple visual) */}
            <div className="bg-omega-dark text-white py-12 text-center">
                <h2 className="text-2xl font-serif mb-4">OMEGA</h2>
                <p className="text-gray-400 text-sm">© 2026 OMEGA SA. All rights reserved.</p>
            </div>
        </div>
    );
};

export default HomeScreen;
