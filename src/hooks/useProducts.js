import { useState, useEffect } from 'react';

export const useProducts = (searchQuery = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        
        const filteredProducts = data.products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return { products, loading, error };
};
