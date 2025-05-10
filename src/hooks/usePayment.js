import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  requestPayment,
  approvePayment,
  cancelPayment,
  getPaymentHistory,
} from '../api/paymentApi';

const usePayment = () => {
  const queryClient = useQueryClient();

  // 결제 요청
  const requestPaymentMutation = useMutation({
    mutationFn: requestPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 결제 승인
  const approvePaymentMutation = useMutation({
    mutationFn: approvePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 결제 취소
  const cancelPaymentMutation = useMutation({
    mutationFn: cancelPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 결제 내역 조회
  const usePaymentHistory = (userId) =>
    useQuery({
      queryKey: ['paymentHistory', userId],
      queryFn: () => getPaymentHistory(userId),
      enabled: !!userId,
      onError: (error) => {
        console.error(error);
      },
    });

  return {
    requestPaymentMutation,
    approvePaymentMutation,
    cancelPaymentMutation,
    usePaymentHistory,
  };
};

export default usePayment;
