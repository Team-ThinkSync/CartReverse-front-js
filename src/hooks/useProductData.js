import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  createProduct,
  fetchProductDetails,
  deleteProduct,
  updateProduct,
  fetchProductsByCategory,
} from "../api/productApi";

// 상품 목록 훅
const useProductData = () => {
  const queryClient = useQueryClient();

  // 상품 목록 가져오기
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 상품 추가
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], (old = []) => [...old, newProduct]);
    },
    onError: (err) => {
      console.error("상품 추가 중 오류:", err);
    },
  });

  const handleAddProduct = (productData) => {
    addProductMutation.mutate(productData);
  };

  // 상품 삭제
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["products"], (old = []) =>
        old.filter((product) => product.id !== id)
      );
    },
    onError: (err) => {
      console.error("상품 삭제 중 오류:", err);
    },
  });

  const handleDeleteProduct = (id) => {
    deleteProductMutation.mutate(id);
  };

  // 상품 수정
  const updateProductMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateProduct(id, updatedData),
    onSuccess: (updatedProduct, { id }) => {
      queryClient.setQueryData(["products"], (old = []) =>
        old.map((product) =>
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

  // 상품 상세
  const handleFetchProductDetails = async (id) => {
    try {
      return await fetchProductDetails(id);
    } catch (err) {
      console.error("상품 상세 정보 가져오기 중 오류:", err);
    }
  };

  // 카테고리별 상품
  const handleFetchProductsByCategory = async (categoryId) => {
    try {
      const data = await fetchProductsByCategory(categoryId);
      queryClient.setQueryData(["products"], data);
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
