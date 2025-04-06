import axios from 'axios';
import { BASE_URL } from "./BaseApi";

// 리뷰 목록 조회
export const getReviews = async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${productId}/reviews`);
        return response.data;
    } catch (error) {
        console.error("리뷰 목록 조회 오류:", error);
        throw error;
    }
};

// 리뷰 작성 
export const createReview = async (productId, reviewData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${productId}/reviews`, reviewData);
        return response.data;
    } catch (error) {
        console.error("리뷰 작성 오류:", error);
        throw error;
    }
};

// 리뷰 삭제 
export const deleteReview = async (productId, reviewId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${productId}/reviews/${reviewId}`);
        return response.data;
    } catch (error) {
        console.error("리뷰 삭제 오류:", error);
        throw error;
    }
};

// 리뷰 수정
export const updateReview = async (productId, reviewId, reviewData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${productId}/reviews/${reviewId}`, reviewData);
        return response.data;
    } catch (error) {
        console.error("리뷰 수정 오류:", error);
        throw error;
    }
};
