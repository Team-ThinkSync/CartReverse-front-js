import { useState, useEffect } from 'react';
import { requestPayment, approvePayment, cancelPayment, getPaymentHistory } from '../api/paymentApi';

// 결제 요청 훅 
const usePayment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 결제 요청
  const handleRequestPayment = async (data) => {
    try {
      setIsLoading(true);
      const response = await requestPayment(data);
      setPaymentData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 결제 승인
  const handleApprovePayment = async (paymentId) => {
    try {
      setIsLoading(true);
      const response = await approvePayment(paymentId);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  //결제 취소
    const handleCancelPayment = async (paymentId) => {
        try {
        setIsLoading(true);
        const response = await cancelPayment(paymentId);
        return response;
        } catch (err) {
        setError(err);
        } finally {
        setIsLoading(false);
        }
    }

    // 결제 내역 조회 
    const handleGetPaymentHistory = async (userId) => {
        try {
        setIsLoading(true);
        const response = await getPaymentHistory(userId);
        return response;
        } catch (err) {
        setError(err);
        } finally {
        setIsLoading(false);
        }
    }
};

export default usePayment;