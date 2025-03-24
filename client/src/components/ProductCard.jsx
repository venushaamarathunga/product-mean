import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false); // Modal open state
  const [updatedProduct, setUpdatedProduct] = useState(product); // Store updated product details

  // Handle delete product
  const handleDeleteProduct = async (pid) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.delete(`http://localhost:5001/api/products/${pid}`);

      alert("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  // Handle update product
  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/products/${product._id}`, updatedProduct);

      alert("Product updated successfully!");
      setIsOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="mt-6 w-80 bg-[rgba(var(--card))] shadow-md border border-[rgba(var(--border))] rounded-lg overflow-hidden">
      {/* Product Image */}
      <div className="relative h-52">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h5 className="mb-1 text-3xl font-semibold text-[rgb(var(--copy-primary))]">{product.name}</h5>
        <p className="text-xl font-semibold text-[rgb(var(--copy-primary))]">${product.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-2 flex items-center justify-between">
        <button onClick={() => handleDeleteProduct(product._id)} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
          <MdDeleteOutline className="text-xl" />
        </button>
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          <FaEdit className="text-xl" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-[rgba(var(--background))] p-6 rounded-lg shadow-lg w-96 text-[rgb(var(--copy-primary))]">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>

            <input className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] bg-[rgba(var(--card))] border-[rgba(var(--border))] text-[rgb(var(--copy-primary))]" placeholder="Product Name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
            <input className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] bg-[rgba(var(--card))] border-[rgba(var(--border))] text-[rgb(var(--copy-primary))]" type="number" placeholder="Price" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
            <input className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]  bg-[rgba(var(--card))] border-[rgba(var(--border))] text-[rgb(var(--copy-primary))]" placeholder="Image URL" value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />

            <div className="flex justify-end gap-4">
              <button onClick={handleUpdateProduct} className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition text-[rgb(var(--cta-text))]">
                Update
              </button>
              <button onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition text-[rgb(var(--cta-text))]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
