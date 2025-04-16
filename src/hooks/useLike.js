import { useQuery } from '@tanstack/react-query';
import { addLike } from '../api/LikeApi';

// 좋아요 훅 (리액트 쿼리 사용)
const useLike = () => {
  const { data: likes, isLoading, error } = useQuery('likes', addLike);

  return { likes, isLoading, error };
};

export default useLike;
