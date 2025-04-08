import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProducts, createProduct, fetchProductDetails, deleteProduct, updateProduct, fetchProductsByCategory } from "../api/productApi";

// 상품 목록 훅
const useProductData = () => {
  const queryClient = useQueryClient();

  // 상품 목록 가져오기
  const { data: products, isLoading, error } = useQuery("products", fetchProducts);

  // 상품 추가하기
  const addProductMutation = useMutation(createProduct, {
    onSuccess: (newProduct) => {
      queryClient.setQueryData("products", (oldProducts) => [...oldProducts, newProduct]);
    },
    onError: (err) => {
      console.error("상품 추가 중 오류:", err);
    },
  });

  const handleAddProduct = (productData) => {
    addProductMutation.mutate(productData);
  };

  // 상품 삭제하기
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: (_, id) => {
      queryClient.setQueryData("products", (oldProducts) =>
        oldProducts.filter((product) => product.id !== id)
      );
    },
    onError: (err) => {
      console.error("상품 삭제 중 오류:", err);
    },
  });

  const handleDeleteProduct = (id) => {
    deleteProductMutation.mutate(id);
  };

  // 상품 수정하기
  const updateProductMutation = useMutation(({ id, updatedData }) => updateProduct(id, updatedData), {
    onSuccess: (updatedProduct, { id }) => {
      queryClient.setQueryData("products", (oldProducts) =>
        oldProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    },
    onError: (err) => {
      console.error("상품 수정 중 오류:", err);
    },
  });

  const handleUpdateProduct = (id, updatedData) => {
    updateProductMutation.mutate({ id, updatedData });
  };

  // 상품 상세 정보 가져오기
  const handleFetchProductDetails = async (id) => {
    try {
      return await fetchProductDetails(id);
    } catch (err) {
      console.error("상품 상세 정보 가져오기 중 오류:", err);
    }
  };

  // 카테고리별 상품 목록 가져오기
  const handleFetchProductsByCategory = async (categoryId) => {
    try {
      const data = await fetchProductsByCategory(categoryId);
      queryClient.setQueryData("products", data);
    } catch (err) {
      console.error("카테고리별 상품 목록 가져오기 중 오류:", err);
    }
  };

  return {
    products,
    isLoading,
    error,
    handleAddProduct,
    handleDeleteProduct,
    handleUpdateProduct,
    handleFetchProductDetails,
    handleFetchProductsByCategory,
  };
};

export default useProductData;