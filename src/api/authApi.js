import axios from "axios";
import { BASE_URL } from "./BaseApi";

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;


export const getKakaoLoginUrl = () => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};

// 회원가입 (일반)
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
};

// 유저 전체 조회
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("유저 전체 조회 오류:", error);
    throw error;
  }
};

//Patch 유저 정보 추가
export const updateUser = async (userData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("유저 정보 수정 오류:", error);
    throw error;
  }
};

// 유저 resign
export const resignUser = async (userData) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("회원탈퇴 오류:", error);
    throw error;
  }
};


// 유저 패스워드 변경 
export const changePassword = async (userData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/me/password`, userData);
    return response.data;
  } catch (error) {
    console.error("비밀번호 변경 오류:", error);
    throw error;
  }
};

export const completeKakaoSignup = (accessToken) => {
  return fetch("/api/users/kakao/signup", {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("회원가입 최종 처리 실패");
    return res.json();
  });
};

// 카카오 회원가입
export const kakaoLogin = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/kakao/callback?code=${code}`);
    return response.data;
  } catch (error) {
    console.error("카카오 로그인 오류:", error);
    throw error;
  }
};

// 카카오 회원가입
export const kakaoSignup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/kakao/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("카카오 회원가입 오류:", error);
    throw error;
  }
};

// 마이페이지 회원 조회
export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, userId);
    return response.data;
  } catch (error) {
    console.error("회원 정보 조회 오류:", error);
    throw error;
  }
};

// 이메일 인증 번호 발송
export const sendEmailVerification = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/send-verification-code`, { email });
    return response.data;
  } catch (error) {
    console.error("이메일 인증 번호 발송 오류:", error);
    throw error;
  }
};


// 로그인 
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("로그인 오류:", error);
    throw error;
  }
};

// 인증번호 체크 
export const verifyEmailCode = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/check-verification-code`, { email, code });
    return response.data;
  } catch (error) {
    console.error("인증번호 확인 오류:", error);
    throw error;
  }
};

// 이메일 잃어버림 
export const findEmail = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forget-email`, userData);
    return response.data;
  } catch (error) {
    console.error("이메일 찾기 오류:", error);
    throw error;
  }
};
