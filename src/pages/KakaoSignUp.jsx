import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { completeKakaoSignup } from "../api/authApi"; // 최종 회원가입 API

const KakaoSignup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 백엔드에서 저장된 회원 정보 가져오기
    fetch("/api/users/me", {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data))
      .catch(() => navigate("/login"));
  }, [accessToken, navigate]);

  const handleComplete = () => {
    completeKakaoSignup(accessToken).then(() => {
      // 토큰 저장 등 처리 후 메인으로 이동
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    });
  };

  if (!userInfo) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>회원가입 완료</h1>
      <p>닉네임: {userInfo.nickname}</p>
      <p>전화번호: {userInfo.phone}</p>
      <p>주소: {userInfo.address}</p>
      <button onClick={handleComplete}>확인하고 시작하기</button>
    </div>
  );
};

export default KakaoSignup;
