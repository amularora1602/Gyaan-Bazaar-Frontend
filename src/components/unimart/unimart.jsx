import React, { useState, useEffect } from "react";
import Header from "../navbar/header";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Unimart.css"; // Import CSS file

const Unimart = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', e.target.productName.value);
    formData.append('price', e.target.price.value);
    formData.append('category', e.target.category.value);
    formData.append('description', e.target.description.value);
    formData.append('image', productImage);

    try {
      await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product uploaded successfully!');
      setShowUploadModal(false);
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Failed to upload product:', error);
      alert('Failed to upload product.');
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="unimart-container">
      <Header />
      <main>
        <div className="unimart-header">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <button className="cart-btn" onClick={handleCartClick}>Go to Cart</button>
        </div>

        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card border rounded-lg shadow-md p-4 flex flex-col items-center text-center bg-white"
              >
                <img
                  src={`/${product.image}`}
                  alt={product.productName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="w-64">
                  <h2 className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.productName}
                  </h2>
                </div>

                <p className="text-sm text-gray-500 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  Price: Rs.{product.price}
                </p>
                <p className="text-sm text-gray-500 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  Category: {product.category}
                </p>
                <div className="w-52">

                <p
                  className="text-sm text-gray-600 mb-4 overflow-hidden text-ellipsis break-words"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    maxHeight: '3em',
                  }}
                >
                  {product.description}
                </p>
              </div>
                <button
                  className="add-to-cart-btn bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>


            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found</p>
          )}
        </div>


        {showUploadModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Upload Product</h2>
              <form onSubmit={handleUploadSubmit}>
                <div className="form-group">
                  <label>Product Name:</label>
                  <input type="text" name="productName" required />
                </div>
                <div className="form-group">
                  <label>Quantity:</label>
                  <input type="number" name="quantity" min="0" required />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input type="number" name="price" required />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select name="category" required>
                    <option value="stationary">Stationary</option>
                    <option value="food">Food and Beverages</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image:</label>
                  <input type="file" name="image" onChange={handleImageChange} required />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea name="description" />
                </div>
                <button className="submit-btn" type="submit">Upload</button>
                <button className="cancel-btn" type="button" onClick={handleCloseUploadModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Unimart;


