import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../store/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            }).unwrap();
            alert('Product Updated');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            alert(res.message);
            setImage(res.image);
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link to="/admin/productlist" className="text-gray-600 hover:text-black mb-4 inline-block">
                Go Back
            </Link>
            <div className="bg-white p-6 rounded shadow-md border-t-4 border-omega-gold">
                <h1 className="text-2xl font-bold mb-4 font-sans">Edit Product</h1>
                {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">{error.data?.message}</p> : (
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 leading-tight focus:outline-none focus:border-omega-gold" placeholder="Enter image url" />
                            <input type="file" onChange={uploadFileHandler} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-omega-gold file:text-white hover:file:bg-black" />
                            {loadingUpload && <p className="text-xs text-gray-500">Uploading...</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Count In Stock</label>
                            <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-omega-gold h-24"></textarea>
                        </div>
                        <button type="submit" disabled={loadingUpdate} className="bg-omega-dark hover:bg-black text-white font-bold py-2 px-4 rounded w-full transition">
                            {loadingUpdate ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProductEditScreen;
