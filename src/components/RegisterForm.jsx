import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressSearch from "./AddressSearch";
import {useRegisterUser} from "../hooks/useAuth";


function RegisterForm() {
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });
  const { register, isLoading, error } = useRegisterUser();

  const registerMutation = useRegisterUser();

  // 모두 동의 체크박스 클릭 시 실행되는 함수
  const handleAllCheck = () => {
    const newCheckState = !allChecked;
    setAllChecked(newCheckState);
    setIndividualChecks({
      age: newCheckState,
      terms: newCheckState,
      privacy: newCheckState,
      marketing: newCheckState,
    });
  };

  // 개별 체크박스 클릭 시 실행되는 함수
  const handleIndividualCheck = (key) => {
    setIndividualChecks((prev) => {
      const updatedChecks = { ...prev, [key]: !prev[key] };
      const isAllChecked = Object.values(updatedChecks).every((value) => value);
      setAllChecked(isAllChecked);
      return updatedChecks;
    });
  };

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwCheck, setPwCheck] = useState('');

  const [pwMatch, setPwMatch] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");


  // 이메일 입력 핸들러
  const handleEmail = (e) => {
      const value = e.target.value;
      setEmail(value);
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(value)){
        setEmailValid(true);
    } else {
        setEmailValid(false);
    }
};

  // 비밀번호 입력 핸들러
  const handlePw = (e) => {
      const value = e.target.value;
      setPw(value);
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(regex.test(value)){
        setPwValid(true);
      }else{
        setPwValid(false);
      }
  };
  const handlePwCheck = (e) => {
    const value = e.target.value;
    setPwCheck(value);
    setPwMatch(value === pw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    console.log("Form submitted!")
  
    // 필수 약관 체크
    if (!individualChecks.age || !individualChecks.terms || !individualChecks.privacy) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    }
  
    const userData = {
      email: email,
      nickname: elements["register-nickname"]?.value,
      username: elements["register-username"]?.value,
      password: pw,
      phoneNumber: elements["phone-number"]?.value,
      address: address,
    };
    console.log("전송할 userData:", userData);

    try {
      const res = await registerMutation.mutateAsync(userData);
      console.log(res.code);
      if (res.code === 200) {
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      } else {
        alert(`회원가입 실패: ${res.message}`);
      }
    } catch (err) {
      alert("서버 통신 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  const onClickConfirmButton = (e) => {
    alert('회원가입이 완료되었습니다.')
    navigate('/');
  };

  // 입력 유효성에 따른 버튼 상태 업데이트
  useEffect(() => {
    if(emailValid && pwValid){
        setNotAllow(false);
        return;
    }
      setNotAllow(true);
  }, [emailValid, pwValid]);


  return (
    <div id="main" className="flex flex-col w-[480px] h-[1400px] mx-auto mt-[50px]">
      <h2 id="register__title" className="mt-[200px] mb-[60px] text-3xl font-bold text-gray-700">
        회원가입
      </h2>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
        <label htmlFor="email-address" className="flex flex-col mb-[7px]">
          <span className="text-[rgba(0,0,0,0.7)] font-semibold mb-[7px]">이메일주소</span>

          <input
            id="register-id"
            type="text"
            value={email}
            onChange={handleEmail}
            className="border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
          />
          {
            !emailValid && email.length >0 && (
              <span className="text-red-500 text-sm -mt-2 mb-2">올바른 이메일 형식을 입력하세요.</span>
            )
          }
        </label>
        {/* 이름 입력 */}
        <label htmlFor="register-username" className="flex flex-col mb-[7px]">
        <span className="text-[rgba(0,0,0,0.7)] font-semibold mb-[7px]">이름</span>

          <input
            id="register-username"
            name="register-username"
            type="text"
            className="text-lg border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"          />
        </label>

        {/* 닉네임 입력 */}
        <label htmlFor="register-nickname" className="flex flex-col mb-[7px]">
          <span className="text-[rgba(0,0,0,0.7)] font-semibold mb-[7px]">닉네임</span>
          <input
            id="register-nickname"
            name="register-nickname"
            type="text"
            className="text-lg border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
          />
        </label>
        

        {/* 비밀번호 입력 */}
        <label htmlFor="register-password" className="flex flex-col mb-[7px]">
          <span className="text-[rgba(0,0,0,0.7)] font-semibold mb-[7px]">비밀번호</span>
          <input
            id="register-password"
            type="password"
            onChange={handlePw}

            className="text-lg border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
          />
        </label>

          {/* 비밀번호 확인 입력 */}
          <label htmlFor="register-password" className="flex flex-col mb-[7px]">
          <span className="text-[rgba(0,0,0,0.7)] font-semibold mb-[7px]">비밀번호 확인</span>
          <input
            id="register-password"
            type="password"
            onChange={handlePwCheck}

            className="text-lg border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
          />
          {
            !pwMatch && pwCheck.length > 0 && (
              <span className="text-red-500 text-sm -mt-2 mb-2">비밀번호가 일치하지 않습니다.</span>
            )
          }
        </label>

        {/* 전화번호 입력 */}
        <label htmlFor="phone-number" className="flex flex-col mb-[7px]">
          <span className="text-[rgba(0,0,0,0.7)] font-semibold mb-[7px]">전화번호</span>
          <input
            id="phone-number"
            type="tel"
            name="phone-number"
            className="text-lg border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
          />
        </label>

        <AddressSearch setAddress={setAddress}/>

        {/* 이용약관 */}
        <div id="이용약관" className="flex flex-col h-[300px] bg-gray-100 my-10 font-bold text-[rgba(0,0,0,0.9)]">
          <div className="h-20 flex items-center">
            <input
              className="w-[20px] h-[20px] mr-2"
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheck}
            />
            <span> 모두 동의합니다</span>
          </div>
          <div className="h-10 flex items-center">
            <input
              type="checkbox"
              checked={individualChecks.age}
              onChange={() => handleIndividualCheck("age")}
              className="mr-2  w-[15px] h-[15px]"
            />
            <span> [필수] 만 14세 이상입니다</span>
          </div>
          <div className="h-10 flex items-center">
            <input
              type="checkbox"
              checked={individualChecks.terms}
              onChange={() => handleIndividualCheck("terms")}
              className="mr-2 w-[15px] h-[15px]"
            />
            <span> [필수] 이용약관 동의</span>
          </div>
          <div className="h-10 flex items-center">
            <input
              type="checkbox"
              checked={individualChecks.privacy}
              onChange={() => handleIndividualCheck("privacy")}
              className="mr-2 w-[15px] h-[15px]"
            />
            <span> [필수] 개인 정보 수집 및 이용 동의</span>
          </div>
          <div className="h-10 flex items-center">
            <input
              type="checkbox"
              checked={individualChecks.marketing}
              onChange={() => handleIndividualCheck("marketing")}
              className="mr-2 w-[15px] h-[15px]"
            />
            <span> [선택] 광고성 정보 수신 모두 동의</span>
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <input
          type="submit"
          value="본인인증하고 가입하기"
          className="bg-black text-white text-lg rounded-md border-none mb-[5px] cursor-pointer w-[384px] h-[57px] mx-auto"
        />
      </form>
    </div>
  );
}

export default RegisterForm;
