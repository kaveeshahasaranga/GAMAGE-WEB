import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-6xl font-serif text-omega-dark mb-4 tracking-widest">
                CONSTELLATION
            </h1>
            <p className="text-xl text-gray-500 mb-8 uppercase tracking-wide">
                Master Chronometer
            </p>
            <div className="flex justify-center gap-4">
                <Link to="/register" className="border-b-2 border-omega-red text-omega-dark pb-1 hover:text-omega-red transition">
                    DISCOVER THE COLLECTION
                </Link>
            </div>
        </div>
    );
};

export default HomeScreen;
