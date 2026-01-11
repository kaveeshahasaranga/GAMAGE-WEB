import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../store/usersApiSlice';
import { logout } from '../store/authSlice';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <header className="bg-omega-dark text-white p-4 shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold tracking-tighter text-omega-red">
                        OMEGA
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link to="/cart" className="hover:text-omega-gold transition flex items-center gap-1">
                            <FaShoppingCart /> Cart
                        </Link>
                        {userInfo ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-300">Hello, {userInfo.name}</span>
                                {userInfo.isAdmin && (
                                    <Link to="/admin/productlist" className="text-omega-gold hover:text-white transition uppercase text-xs border border-omega-gold px-2 py-1 rounded">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={logoutHandler}
                                    className="hover:text-omega-red transition flex items-center gap-1"
                                >
                                    Logout <FaSignOutAlt />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login" className="hover:text-omega-gold transition gap-1 flex items-center"><FaUser /> Sign In</Link>
                                <Link to="/register" className="hover:text-omega-gold transition">Register</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
            <main className="py-8 min-h-[80vh]">
                <div className="container mx-auto px-4">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-omega-dark text-gray-500 text-center p-4">
                <p>&copy; {new Date().getFullYear()} OMEGA Replica. All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Header;
