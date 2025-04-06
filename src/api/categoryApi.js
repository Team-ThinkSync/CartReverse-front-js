import axios from "axios";
import { BASE_URL } from "./BaseApi";

// 카테고리 가져오기
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("카테고리 가져오기 오류:", error);
    throw error;
  }
};

// 카테고리 추가
export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error("카테고리 추가 오류:", error);
    throw error;
  }
};

// 카테고리 삭제 
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("카테고리 삭제 오류:", error);
    throw error;
  }
};

// 카테고리 수정
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error("카테고리 수정 오류:", error);
    throw error;
  }
};