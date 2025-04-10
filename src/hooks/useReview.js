import { useQuery, useMutation, useQueryClient } from "react-query";
import { getReviews, createReview, deleteReview, updateReview } from "../api/reviewApi";

// 리뷰 훅
const useReview = (productId) => {
  const queryClient = useQueryClient();

  // 리뷰 목록 가져오기
  const { data: reviews, isLoading, error } = useQuery(
    ["reviews", productId],
    () => getReviews(productId),
    {
      enabled: !!productId, 
    }
  );

  // 리뷰 작성
  const createReviewMutation = useMutation(
    (reviewData) => createReview(productId, reviewData),
    {
      onSuccess: (newReview) => {
        queryClient.setQueryData(["reviews", productId], (oldReviews) => [
          ...(oldReviews || []),
          newReview,
        ]);
      },
    }
  );

  // 리뷰 삭제
  const deleteReviewMutation = useMutation((id) => deleteReview(id), {
    onSuccess: (_, id) => {
      queryClient.setQueryData(["reviews", productId], (oldReviews) =>
        oldReviews.filter((review) => review.id !== id)
      );
    },
  });

  // 리뷰 수정
  const updateReviewMutation = useMutation(
    ({ id, updatedData }) => updateReview(id, updatedData),
    {
      onSuccess: (updatedReview, { id }) => {
        queryClient.setQueryData(["reviews", productId], (oldReviews) =>
          oldReviews.map((review) =>
            review.id === id ? { ...review, ...updatedReview } : review
          )
        );
      },
    }
  );

  return {
    reviews,
    isLoading,
    error,
    createReview: createReviewMutation.mutate,
    deleteReview: deleteReviewMutation.mutate,
    updateReview: updateReviewMutation.mutate,
  };
};

export default useReview;
