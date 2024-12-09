import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaTags } from "react-icons/fa";

// ProductList Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
    image: null,  // To store the selected image
  });
  const [categories, setCategories] = useState([]); // Store available categories
  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts with all fetched products
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories from the API or use a static list
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories'); // Assuming an API for categories
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(["Electronics", "Clothing", "Accessories"]); // Example static categories
      }
    };

    fetchCategories();
  }, []);

  // Handle the visibility of the Add Product modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle the form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // Handle form submission for adding a new product
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('productName', newProduct.productName);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('description', newProduct.description);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type for file uploads
        },
      });

      console.log(response.data.message); // Product added successfully
      setProducts((prev) => [...prev, response.data]);
      setFilteredProducts((prev) => [...prev, response.data]);
      setShowModal(false); // Close modal after adding product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      console.log(response.data.message); // 'Product deleted successfully'
      
      setFilteredProducts(prev => prev.filter(product => product._id !== id));
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 w-full">
      <div className="flex justify-between items-center text-2xl italic mb-4">
        <h3>Product Listing</h3>
        <div className="flex items-center">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-md ml-8"
            onClick={toggleModal} // Show modal to add a new product
          >
            + Add New Product
          </button>
        </div>
      </div>

      {/* Product listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <h4 className="text-xl font-semibold">{product.productName}</h4>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="flex items-center text-sm text-gray-600">
                    <FaDollarSign className="mr-2" />
                    ${product.price}
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <FaTags className="mr-2" />
                    {product.category}
                  </p>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    className="bg-teal-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleViewDetails(product._id)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDeleteProduct(product._id)} // Handle delete
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Modal for Add New Product */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={newProduct.productName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm">Category</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded-md mr-4"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
