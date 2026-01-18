import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../store/usersApiSlice';
import { logout } from '../store/authSlice';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes, FaCaretDown } from 'react-icons/fa';
import SearchBox from './SearchBox';

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
            setIsMobileMenuOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <header className="bg-omega-dark text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
                        <span className="text-3xl font-extrabold tracking-tighter text-white group-hover:text-omega-red transition-colors duration-300">
                            OMEGA
                        </span>
                    </Link>

                    {/* Search */}
                    <div className="hidden md:block">
                        <SearchBox />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/cart" className="relative hover:text-omega-gold transition flex items-center gap-2 text-sm font-medium uppercase tracking-wide">
                            <FaShoppingCart size={18} /> Cart
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-3 bg-omega-red text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {userInfo ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center gap-2 hover:text-omega-gold transition text-sm font-medium uppercase tracking-wide focus:outline-none"
                                >
                                    {userInfo.name} <FaCaretDown />
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-xl py-2 z-50 border border-gray-100 animate-fade-in-down">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-xs text-gray-500">Signed in as</p>
                                            <p className="font-bold truncate">{userInfo.email}</p>
                                        </div>

                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-50 hover:text-omega-red transition flex items-center gap-2"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <FaUser className="text-gray-400" /> Profile
                                        </Link>

                                        {userInfo.isAdmin && (
                                            <>
                                                <Link
                                                    to='/admin/productlist'
                                                    className='block px-4 py-2 hover:bg-gray-50 hover:text-omega-red transition flex items-center gap-2'
                                                    onClick={() =>
                                                        setIsProfileDropdownOpen(false)
                                                    }
                                                >
                                                    <span className='w-4 h-4 rounded-full bg-omega-gold flex items-center justify-center text-[10px] text-white'>
                                                        P
                                                    </span>{' '}
                                                    Products
                                                </Link>
                                                <Link
                                                    to='/admin/userlist'
                                                    className='block px-4 py-2 hover:bg-gray-50 hover:text-omega-red transition flex items-center gap-2'
                                                    onClick={() =>
                                                        setIsProfileDropdownOpen(false)
                                                    }
                                                >
                                                    <span className='w-4 h-4 rounded-full bg-omega-gold flex items-center justify-center text-[10px] text-white'>
                                                        U
                                                    </span>{' '}
                                                    Users
                                                </Link>
                                                <Link
                                                    to='/admin/orderlist'
                                                    className='block px-4 py-2 hover:bg-gray-50 hover:text-omega-red transition flex items-center gap-2'
                                                    onClick={() =>
                                                        setIsProfileDropdownOpen(false)
                                                    }
                                                >
                                                    <span className='w-4 h-4 rounded-full bg-omega-gold flex items-center justify-center text-[10px] text-white'>
                                                        O
                                                    </span>{' '}
                                                    Orders
                                                </Link>
                                            </>
                                        )}

                                        <button
                                            onClick={logoutHandler}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-omega-red transition flex items-center gap-2 border-t border-gray-100 mt-1"
                                        >
                                            <FaSignOutAlt className="text-gray-400" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link to="/login" className="hover:text-omega-gold transition text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                                    <FaUser size={16} /> Sign In
                                </Link>
                                <Link to="/register" className="bg-omega-red hover:bg-red-700 text-white px-5 py-2 rounded-full transition text-sm font-bold uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-omega-dark border-t border-gray-800 animate-slide-in-down">
                        <div className="flex flex-col p-4 gap-4">
                            <Link to="/cart" className="flex justify-between items-center text-white hover:text-omega-gold py-2 border-b border-gray-800" onClick={closeMobileMenu}>
                                <span className="flex items-center gap-2"><FaShoppingCart /> Cart</span>
                                {cartItems.length > 0 && (
                                    <span className="bg-omega-red text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </span>
                                )}
                            </Link>

                            {userInfo ? (
                                <>
                                    <div className="py-2 text-gray-400 text-xs uppercase font-bold tracking-wider">Account</div>
                                    <Link to="/profile" className="pl-4 text-white hover:text-omega-gold py-1" onClick={closeMobileMenu}>Profile</Link>
                                    {userInfo.isAdmin && (
                                        <>
                                            <Link
                                                to='/admin/productlist'
                                                className='pl-4 text-omega-gold hover:text-white py-1'
                                                onClick={closeMobileMenu}
                                            >
                                                Products
                                            </Link>
                                            <Link
                                                to='/admin/userlist'
                                                className='pl-4 text-omega-gold hover:text-white py-1'
                                                onClick={closeMobileMenu}
                                            >
                                                Users
                                            </Link>
                                            <Link
                                                to='/admin/orderlist'
                                                className='pl-4 text-omega-gold hover:text-white py-1'
                                                onClick={closeMobileMenu}
                                            >
                                                Orders
                                            </Link>
                                        </>
                                    )}
                                    <button onClick={logoutHandler} className="text-left pl-4 text-white hover:text-omega-red py-1 flex items-center gap-2">
                                        Logout <FaSignOutAlt />
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 mt-2">
                                    <Link to="/login" className="text-center text-white border border-gray-600 py-2 rounded hover:bg-gray-800 transition" onClick={closeMobileMenu}>Sign In</Link>
                                    <Link to="/register" className="text-center bg-omega-red text-white py-2 rounded hover:bg-red-700 transition" onClick={closeMobileMenu}>Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className="py-8 min-h-[85vh] bg-gray-50">
                <div className="container mx-auto px-4">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-omega-dark text-gray-400 text-center py-6 border-t border-gray-800">
                <div className="container mx-auto">
                    <p className="text-sm font-medium">&copy; {new Date().getFullYear()} OMEGA Replica. <span className="text-omega-gold">Premium Watches</span>.</p>
                </div>
            </footer>
        </>
    );
};

export default Header;
