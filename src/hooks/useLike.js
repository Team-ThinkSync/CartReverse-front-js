import { useState, useEffect } from 'react';
import { addLike } from '../api/LikeApi';

//좋아요 훅임
const useLike = () => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 좋아요 데이터 가져오기
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setIsLoading(true);
        const data = await addLike();
        setLikes(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, []);

  return { likes, isLoading, error };
};

export default useLike;
