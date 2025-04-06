import axios from "axios";

import { BASE_URL } from "./BaseApi";

// 문의 목록 답변
export const ResInquiries = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/asks/${id}/response`);
    return response.data;
  } catch (error) {
    console.error("문의 내용 답변 오류:", error);
    throw error;
  }
};

// 새로운 문의 작성
export const createInquiry = async (inquiryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/asks`, inquiryData);
    return response.data;
  } catch (error) {
    console.error("문의 작성 중 오류 발생:", error);
    throw error;
  }
};

//특정 문의 내용 조회
export const getInquiry = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/asks/${id}`);
    return response.data;
  } catch (error) {
    console.error("문의 내용 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 문의 삭제
export const deleteInquiry = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/asks/${id}`);
    return response.data;
  } catch (error) {
    console.error("문의 삭제 중 오류 발생:", error);
    throw error;
  }
};

// 문의 목록 수정
export const updateInquiry = async (id, inquiryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/asks/${id}`, inquiryData);
    return response.data;
  } catch (error) {
    console.error("문의 수정 중 오류 발생:", error);
    throw error;
  }
};

// 유저별로 조회
export const getUserInquiries = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/asks/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("유저별 문의 조회 중 오류 발생:", error);
    throw error;
  }
};
