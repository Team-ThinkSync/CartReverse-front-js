import axios from "axios";
import { BASE_URL } from "./BaseApi";

// 좋아요 추가
export const addLike = async (productId) => {
  try {
    const response = await axios.post(`${BASE_URL}/likes`, productId);
    return response.data;
  } catch (error) {
    console.error("좋아요 추가 오류:", error);
    throw error;
  }
};

