import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { kakaoLogin } from "../api/authApi"; // API 함수 import

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      console.error("Authorization code is missing from the URL.");
      navigate("/login");
      return;
    }
  
    const isHandled = sessionStorage.getItem("kakaoCodeHandled");
    if (isHandled === code) return;
  
    kakaoLogin(code)
      .then((res) => {
        console.log("카카오 로그인 성공", res);

        console.log("accessToken", res.accessToken); 
        console.log("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        sessionStorage.setItem("kakaoCodeHandled", code);
        navigate("/");
      })
      .catch((err) => {
        console.error("카카오 로그인 실패", err);
        navigate("/login");
      });
  }, [code, navigate]);
  

  if (!code) {
    return null;
  }

  return <p>로그인 중...</p>;
};

export default KakaoRedirect;
