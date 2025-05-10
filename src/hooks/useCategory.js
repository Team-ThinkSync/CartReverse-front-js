import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '../api/categoryApi';

// 카테고리 훅
const useCategory = () => {
  const queryClient = useQueryClient();

  // 카테고리 데이터 가져오기
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // 카테고리 추가
  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (newCategory) => {
      queryClient.setQueryData(["categories"], (old) => [...(old || []), newCategory]);
    },
    onError: (err) => {
      console.error("카테고리 추가 중 오류 발생:", err);
    },
  });

  const handleAddCategory = (categoryData) => {
    addCategoryMutation.mutate(categoryData);
  };

  // 카테고리 삭제
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["categories"], (old) =>
        (old || []).filter((category) => category.id !== id)
      );
    },
    onError: (err) => {
      console.error("카테고리 삭제 중 오류 발생:", err);
    },
  });

  const handleDeleteCategory = (id) => {
    deleteCategoryMutation.mutate(id);
  };

  // 카테고리 수정
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(["categories"], (old) =>
        (old || []).map((category) =>
          category.id === updatedCategory.id ? { ...category, ...updatedCategory } : category
        )
      );
    },
    onError: (err) => {
      console.error("카테고리 수정 중 오류 발생:", err);
    },
  });

  const handleUpdateCategory = (id, updatedData) => {
    updateCategoryMutation.mutate({ id, ...updatedData });
  };

  return {
    categories,
    isLoading,
    error,
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateCategory,
  };
};

export default useCategory;