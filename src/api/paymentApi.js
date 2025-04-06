import axios from 'axios';
import { BASE_URL } from "./BaseApi";

// 결제 요청
export const requestPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/payments/request`, paymentData);
        return response.data;
    } catch (error) {
        console.error("결제 요청 오류:", error);
        throw error;
    }
};

// 결제 승인
export const approvePayment = async (paymentId) => {
    try {
        const response = await axios.post(`${BASE_URL}/payments/confirm`, { paymentId });
        return response.data;
    } catch (error) {
        console.error("결제 승인 오류:", error);
        throw error;
    }
};

// 결제 취소
export const cancelPayment = async (paymentId) => {
    try {
        const response = await axios.post(`${BASE_URL}/payments/cancel`, { paymentId });
        return response.data;
    } catch (error) {
        console.error("결제 승인 오류:", error);
        throw error;
    }
}

// 결제 내역 조회 
export const getPaymentHistory = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/payments`, userId);
        return response.data;
    } catch (error) {
        console.error("결제 내역 조회 오류:", error);
        throw error;
    }
};
