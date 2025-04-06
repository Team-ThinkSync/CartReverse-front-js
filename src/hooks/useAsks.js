import { useState, useEffect } from "react";
import { ResInquiries, createInquiry, getInquiry, deleteInquiry, updateInquiry, getUserInquiries } from "../api/asksApi";

const useInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setIsLoading(true);
        const data = await getInquiry();
        setInquiries(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // 새로운 문의 작성
  const handleCreateInquiry = async (inquiryData) => {
    try {
      const newInquiry = await createInquiry(inquiryData);
      setInquiries((prev) => [newInquiry, ...prev]);
    } catch (err) {
      console.error("문의 작성 중 오류 발생:", err);
    }
  };
  

  // 문의 삭제
  const handleDeleteInquiry = async (id) => {
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
    } catch (err) {
      console.error("문의 삭제 중 오류 발생:", err);
    }
  };

  return { inquiries, isLoading, error, handleCreateInquiry, handleDeleteInquiry };
};

export default useInquiry;

// ResInquiries
const useResInquiries = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleResInquiries = async (id) => {
    try {
      setIsLoading(true);
      const data = await ResInquiries(id);
      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, handleResInquiries };
}

//업데이트임 (이거 함수 use로 써주셈 handle은 화면에서 쓸거임)
const useUpdateInquiry = () => {
  const [updatedInquiry, setUpdatedInquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdateInquiry = async (id, inquiryData) => {
    try {
      setIsLoading(true);
      const data = await updateInquiry(id, inquiryData);
      setUpdatedInquiry(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updatedInquiry, isLoading, error, handleUpdateInquiry };
};

//유저별로 조회
const useUserInquiries = (userId) => {
  const [userInquiries, setUserInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInquiries = async () => {
      try {
        setIsLoading(true);
        const data = await getUserInquiries(userId);
        setUserInquiries(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInquiries();
  }, [userId]);

  return { userInquiries, isLoading, error };
};

