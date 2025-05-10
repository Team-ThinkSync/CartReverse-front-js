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
    if (!accessToken) {
      console.error("Access Token이 없습니다.");
      navigate("/login");  // 토큰이 없으면 로그인 페이지로 리다이렉트
      return;
    }

    // 백엔드에서 저장된 회원 정보 가져오기
    fetch("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer 토큰 포함
        },
      })
        .then((res) => {
          if (!res.ok) {
            // HTML 응답을 받았을 경우, text()로 처리
            return res.text().then((html) => {
              throw new Error(`Error: ${res.status} - ${res.statusText}, HTML response: ${html}`);
            });
          }
          return res.json(); // 정상적인 JSON 응답 처리
        })
        .then((data) => {
          if (data.code === 0) {
            setUserInfo(data.data); // 'data' 안에 실제 사용자 정보가 포함되어 있음
          } else {
            throw new Error(`Failed to fetch user info: ${data.message}`);
          }
        })
        .catch((err) => {
          const errorMessage = err instanceof Error ? err.message : err.toString();
          console.error("Error fetching user info: ", errorMessage);
          navigate("/login");  // 에러 발생 시 로그인 페이지로 리다이렉트
        });
      

    // 3초 후에 홈으로 리다이렉트
    const timer = setTimeout(() => {
      navigate("/");  // 3초 후 홈으로 리다이렉트
    }, 3000);

    // 컴포넌트 언마운트 시 타이머를 클리어
    return () => clearTimeout(timer);

  }, [accessToken, navigate]);

  const handleComplete = () => {
    completeKakaoSignup(accessToken).then(() => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");  // 메인 화면으로 리다이렉트
    }).catch((err) => {
      const errorMessage = err instanceof Error ? err.message : err.toString();
      console.error("회원가입 완료 처리 중 에러 발생: ", errorMessage);
    });
  };

  if (!userInfo) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>회원가입 완료</h1>
      <p>닉네임: {userInfo.nickname}</p>
      <p>전화번호: {userInfo.phoneNumber}</p>
      <p>주소: {userInfo.address}</p>
      <button onClick={handleComplete}>확인하고 시작하기</button>
    </div>
  );
};

export default KakaoSignup;
