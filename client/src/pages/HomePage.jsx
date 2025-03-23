import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          throw new Error("No products available");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="grid min-h-screen bg-[rgb(var(--background))] p-6 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight  text-[rgb(var(--copy-primary))]">Current Products 🚀</h1>

        {loading && <p className="mt-6 text-lg text-gray-500">Loading products...</p>}

        {error && <p className="mt-6 text-lg text-red-500">Error: {error}</p>}

        <div className="grid gap-6 mt-8 place-items-center md:grid-cols-2 lg:grid-cols-3">
          {products.length > 0
            ? products.map((product) => <ProductCard key={product._id} product={product} />)
            : !loading && (
                <div className="col-span-full text-2xl font-bold text-gray-500">
                  No products found 😢{" "}
                  <Link to="/create" className="text-blue-500 hover:underline">
                    Create a product
                  </Link>
                </div>
              )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
