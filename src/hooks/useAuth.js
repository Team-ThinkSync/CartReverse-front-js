import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: registerUser,
  });
};

// 유저 전체 조회
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  });
};

// 유저 정보 추가
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};

// 유저 resign
export const useResignUser = () => {
  return useMutation({
    mutationFn: resignUser,
  });
};

// 유저 패스워드 변경
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

// 카카오 로그인
export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: kakaoLogin,
  });
};

// 카카오 회원가입
export const useKakaoSignup = () => {
  return useMutation({
    mutationFn: kakaoSignup,
  });
};

// 마이페이지 회원 조회
export const useGetUserInfo = (userId) => {
  return useQuery({
    queryKey: ["getUserInfo", userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
  });
};

// 이메일 인증 번호 발송
export const useSendEmailVerification = () => {
  return useMutation({
    mutationFn: sendEmailVerification,
  });
};

// 로그인
export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

// 인증번호 체크
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: ({ email, code }) => verifyEmailCode(email, code),
  });
};

// 이메일 잃어버림
export const useFindEmail = () => {
  return useMutation({
    mutationFn: findEmail,
  });
};
