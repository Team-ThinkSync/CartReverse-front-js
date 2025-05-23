
import { useEffect, useState } from 'react';
// import users from "../assets/data/dummy.json"
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import KakaoLoginButton from "./KakaoLogin";
import {useLoginUser} from "../hooks/useAuth";


function LoginForm2() {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const navigate = useNavigate();
    const {login, isLoggedIn} = useAuthStore();
    const loginMutation = useLoginUser();

    // 이메일 입력 핸들러
    const handleEmail = (e) => {
        console.log(e);
        const value = e.target.value;
        setEmail(value);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(regex.test(value));
    };

    // 비밀번호 입력 핸들러
    const handlePw = (e) => {
        const value = e.target.value;
        setPw(value);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setPwValid(regex.test(value));
    };

    // 로그인 버튼 클릭 핸들러
    const onClickConfirmButton = async (e) => {
        e.preventDefault(); 

        const userData = {
            email: email,
            password: pw,
        };
    
        try {
        const res = await loginMutation.mutateAsync(userData); 
        console.log("res 값:" , res);

        if (res.code === 200) {
            alert("로그인에 성공했습니다.");
            // localStorage.setItem("token", res.token);
            login(res.data); 
            navigate("/");
        } else {
            alert(`로그인 실패: ${res.message}`);
        }
        } catch (err) {
            alert("서버와 연결할 수 없습니다.");
            console.error(err);
        }
    };


        // const currentUser = users.find((user) => user.email === email && user.password === pw);

        // if (currentUser) {
        //     alert('로그인에 성공했습니다.');
        //     login(currentUser);
        //     // console.log("로그인 성공")
        //     navigate('/');
        // } else {
        //     alert('등록되지 않은 회원이거나 입력한 값이 일치하지 않습니다.');
        // }
    // };

    // 입력 유효성에 따른 버튼 상태 업데이트
    useEffect(() => {
        setNotAllow(!(emailValid && pwValid));
    }, [emailValid, pwValid]);

    return (
        <div id="main" className="flex flex-col w-[480px] h-[850px] mx-auto my-[50px] ">
            <h2 id="login__title" className="mt-[200px] mb-[60px] text-3xl font-bold">로그인</h2>

            <form className="flex flex-col" onSubmit={onClickConfirmButton}>
                <label htmlFor="login-id" className="flex flex-col mb-[7px]">
                    <span className="text-[rgba(0,0,0,0.7)] font-semibold text-lg mb-[7px]">이메일</span>
                    <input
                        id="register-id"
                        type="text"
                        value={email}
                        onChange={handleEmail}
                        className="text-xl border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
                    />
                </label>

                <label htmlFor="login-password" className="flex flex-col mb-[7px]">
                    <span className="text-[rgba(0,0,0,0.7)] font-semibold text-lg mb-[7px]">비밀번호</span>
                    <input
                        id="login-password"
                        type="password"
                        value={pw}
                        onChange={handlePw}
                        className="text-xl border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
                    />
                </label>

                <div className="flex justify-between mb-[60px]">
                    <Link to={"/register"} className="text-[rgba(0,0,0,0.7)] text-sm no-underline font-semibold">회원가입</Link>
                    <a className="text-[rgba(0,0,0,0.7)] text-sm no-underline font-semibold" href="#">아이디 / 비밀번호 찾기</a>
                </div>

                <input
                    type="submit"
                    value="로그인"
                    disabled={notAllow}
                    className={`text-lg py-[10px] rounded-md border-none mb-[5px] cursor-pointer w-[384px] h-[57px] mx-auto ${
                        notAllow ? 'bg-gray-400' : 'bg-black text-white'
                    }`}
                />
            </form>

            <KakaoLoginButton />
        </div>
    );
}

export default LoginForm2;
