import axios from "axios";
import { BASE_URL } from "./BaseApi";

// 장바구니 데이터 가져오기
export const getCartItems = async () => {
  const response = await axios.get(`${BASE_URL}/carts`);
  return response.data;
};

// 장바구니 수량 변경 백엔드 앤드포인트 조금 이상한듯...id는 앤드포인트에 들어가야하는거 아님..?
export const updateCartItemQuantity = async (id, quantity) => {
  const response = await axios.put(`${BASE_URL}/carts`, { id, quantity });
  return response.data;
};

// 장바구니 상품 삭제
export const deleteCartItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/carts/${id}`);
  return response.data;
};
