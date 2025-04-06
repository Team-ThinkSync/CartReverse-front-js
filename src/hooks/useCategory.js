import { useState, useEffect } from "react";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '../api/categoryApi';

// 카테고리 훅
const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 카테고리 추가
  const handleAddCategory = async (categoryData) => {
    try {
      const newCategory = await addCategory(categoryData);
      setCategories((prev) => [...prev, newCategory]);
    } catch (err) {
      console.error("카테고리 추가 중 오류 발생:", err);
    }
  };

  // 카테고리 삭제
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      console.error("카테고리 삭제 중 오류 발생:", err);
    }
  };

    // 카테고리 수정    
    const handleUpdateCategory = async (id, updatedData) => {   
        try {
            const updatedCategory = await updateCategory(id, updatedData);
            setCategories((prev) =>
                prev.map((category) =>
                    category.id === id ? { ...category, ...updatedCategory } : category
                )
            );
        } catch (err) {
            console.error("카테고리 수정 중 오류 발생:", err);
        }
    };
}

export default useCategory;