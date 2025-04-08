import { useState, useEffect } from "react";
import {
  registerUser,
  getAllUsers,
  updateUser,
  resignUser,
  changePassword,
  kakaoLogin,
  kakaoSignup,
  getUserInfo,
  sendEmailVerification,
  loginUser,
  verifyEmailCode,
  findEmail,
} from "../api/authApi";

// 회원가입 일반
export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(userData);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};

// 유저 전체 조회
export const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error };
};

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (userData) => {
    setIsLoading(true);
    try {
      const response = await updateUser(userData);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
};

// 유저 resign
export const useResignUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resign = async (userData) => {
    setIsLoading(true);
    try {
      const response = await resignUser(userData);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { resign, isLoading, error };
};

// 유저 패스워드 변경
export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const change = async (userData) => {
    setIsLoading(true);
    try {
      const response = await changePassword(userData);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { change, isLoading, error };
};

// 카카오 회원가입
export const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (code) => {
    setIsLoading(true);
    try {
      const response = await kakaoLogin(code);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

// 카카오 회원가입
export const useKakaoSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (code) => {
    setIsLoading(true);
    try {
      const response = await kakaoSignup(code);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserInfo = async (userId) => {
    setIsLoading(true);
    try {
      const response = await getUserInfo(userId);
      setUserInfo(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { userInfo, isLoading, error, fetchUserInfo };
};

export const useSendEmailVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendVerification = async (email) => {
    setIsLoading(true);
    try {
      const response = await sendEmailVerification(email);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendVerification, isLoading, error };
};

export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (userData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(userData);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

// 인증번호 체크
export const useVerifyEmailCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyCode = async (email, code) => {
    setIsLoading(true);
    try {
      const response = await verifyEmailCode(email, code);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { verifyCode, isLoading, error };
};

// 이메일 잃어버림
export const useFindEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const find = async (userData) => {
    setIsLoading(true);
    try {
      const response = await findEmail(userData);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { find, isLoading, error };
};

