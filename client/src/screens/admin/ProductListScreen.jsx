import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../store/productsApiSlice';

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                refetch();
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
                alert('Sample Product Created! Refresh/Edit to see changes.');
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-sans">Products</h1>
                <button
                    onClick={createProductHandler}
                    className="flex items-center gap-2 bg-omega-dark text-white px-4 py-2 rounded hover:bg-black transition"
                >
                    <FaPlus /> Create Product
                </button>
            </div>

            {loadingCreate && <p className="text-omega-gold">Creating...</p>}
            {loadingDelete && <p className="text-omega-red">Deleting...</p>}

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error?.data?.message || 'Error loading products'}</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-white uppercase bg-omega-dark">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">NAME</th>
                                <th className="px-6 py-3">PRICE</th>
                                <th className="px-6 py-3">CATEGORY</th>
                                <th className="px-6 py-3">BRAND</th>
                                <th className="px-6 py-3">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{product._id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4">${product.price}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">{product.brand}</td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:underline"><FaEdit /></Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ProductListScreen;
