import { useMutation, useQuery, useQueryClient } from 'react-query';
import { requestPayment, approvePayment, cancelPayment, getPaymentHistory } from '../api/paymentApi';

const usePayment = () => {
  const queryClient = useQueryClient();

  // 결제 요청
  const requestPaymentMutation = useMutation(requestPayment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('paymentHistory');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 결제 승인
  const approvePaymentMutation = useMutation(approvePayment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('paymentHistory');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 결제 취소
  const cancelPaymentMutation = useMutation(cancelPayment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('paymentHistory');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 결제 내역 조회
  const usePaymentHistory = (userId) => {
    return useQuery(['paymentHistory', userId], () => getPaymentHistory(userId), {
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return {
    requestPaymentMutation,
    approvePaymentMutation,
    cancelPaymentMutation,
    usePaymentHistory,
  };
};

export default usePayment;
