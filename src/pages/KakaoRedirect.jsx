import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { kakaoLogin } from "../api/authApi"; // API 함수 import

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;
    const isHandled = sessionStorage.getItem("kakaoCodeHandled");
    if (isHandled === code) return;

    kakaoLogin(code)
      .then((res) => {
        console.log("카카오 로그인 성공", res);
        localStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("kakaoCodeHandled", code); // 재요청 방지
        navigate("/");
      })
      .catch((err) => {
        console.error("카카오 로그인 실패", err);
        navigate("/login");
      });
  }, [code]);

  return <p>로그인 중...</p>;
};

export default KakaoRedirect;
