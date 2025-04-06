import { useState, useEffect } from "react";
import { fetchProducts, createProduct, fetchProductDetails, deleteProduct, updateProduct, fetchProductsByCategory } from "../api/productApi";

//상품 목록 훅
const useProductData = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상품 목록 가져오기
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // 상품 추가하기
  const handleAddProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      console.error("상품 추가 중 오류:", err);
    }
  };

  // 상품 삭제하기
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("상품 삭제 중 오류:", err);
    }
  };

  // 상품 수정하기
  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const updatedProduct = await updateProduct(id, updatedData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product))
      );
    } catch (err) {
      console.error("상품 수정 중 오류:", err);
    }
  };

  // 상품 상세 정보 가져오기
  const handleFetchProductDetails = async (id) => {
    try {
      const productDetails = await fetchProductDetails(id);
      return productDetails;
    } catch (err) {
      console.error("상품 상세 정보 가져오기 중 오류:", err);
    }
  };

  // 카테고리별 상품 목록 가져오기
  const handleFetchProductsByCategory = async (categoryId) => {
    try {
      const data = await fetchProductsByCategory(categoryId);
      setProducts(data);
    } catch (err) {
      console.error("카테고리별 상품 목록 가져오기 중 오류:", err);
    }
  };
}

export default useProductData;

  