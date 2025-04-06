import axios from "axios";
import { BASE_URL } from "./BaseApi";

// 상품 목록 가져오기
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};


// 상품 상세 정보 입력
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData);
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};


// 제품 상세 정보 조회
export const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    throw error;
  }
};

// 제품 상세 정보 삭제 
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${productId}`);
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};

// 제품 상세 정보 수정
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${productId}`, productData);
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

//카테고리 별로 조회 해야함
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}/products`);
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    throw error;
  }
};
