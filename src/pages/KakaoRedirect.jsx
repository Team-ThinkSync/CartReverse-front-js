import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { kakaoLogin } from "../api/authApi"; // API 함수 import

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // 백엔드로 인가 코드 전달
      kakaoLogin(code)
        .then((res) => {
          console.log("카카오 로그인 성공", res);
          localStorage.setItem("accessToken", res.accessToken);
          navigate("/"); // 홈으로 이동
        })
        .catch((err) => {
          console.error("카카오 로그인 실패", err);
          navigate("/login");
        });
    }
  }, [searchParams]);

  return <p>로그인 중...</p>;
};

export default KakaoRedirect;
