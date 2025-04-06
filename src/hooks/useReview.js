import { useState, useEffect } from "react";
import { getReviews, createReview, deleteReview, updateReview } from "../api/reviewApi";

// 리뷰 훅
const useReview = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 리뷰 목록 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const data = await getReviews(productId);
        setReviews(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

    // 리뷰 작성
    const handleCreateReview = async (reviewData) => {
        try {
            const newReview = await createReview(productId, reviewData);
            setReviews((prev) => [...prev, newReview]);
        } catch (err) {
            console.error("리뷰 작성 중 오류 발생:", err);
        }
    };

    // 리뷰 삭제
    const handleDeleteReview = async (id) => {
        try {
            await deleteReview(id);
            setReviews((prev) => prev.filter((review) => review.id !== id));
        } catch (err) {
            console.error("리뷰 삭제 중 오류 발생:", err);
        }
    };

    // 리뷰 수정
    const handleUpdateReview = async (id, updatedData) => {
        try {
            const updatedReview = await updateReview(id, updatedData);
            setReviews((prev) =>
                prev.map((review) => (review.id === id ? { ...review, ...updatedReview } : review))
            );
        } catch (err) {
            console.error("리뷰 수정 중 오류 발생:", err);
        }
    };
}

export default useReview;
