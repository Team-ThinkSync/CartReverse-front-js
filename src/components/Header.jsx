import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Header() {

  const Navigate = useNavigate();
  const {isLoggedIn, logout, login} = useAuthStore();
  console.log('현재 로그인 상태:', isLoggedIn);

  return (
    
  <div id="header border-t border-gray-300">

    {/* Header-top */}
    <div id="header-top" className="bg-[#708090] flex justify-between items-center p-5 mt-5">
      <div id="logo" className="text-[white] text-3xl font-extrabold">
      <Link to={"/"}>ECLO</Link>
      </div>
      <ul className="flex list-none gap-5">
        <li className="flex items-center gap-1">
          <span className="material-icons">shopping_cart</span>
          <Link to={"/cart"}>장바구니</Link>
        </li>
        <li className="flex items-center gap-1">
          <span className="material-icons">account_circle</span>
          <Link to={"/mypage"}>마이페이지</Link>
        </li>
        <li className="flex items-center gap-1">
          <span className="material-icons">assignment</span>
          <Link to={"/Register"}>회원가입</Link>
        </li>
        <li className="flex items-center gap-1">
          {
            isLoggedIn ? 
            <>
            <span className="material-icons">logout</span>
            <div className="cursor-pointer" onClick={()=>{logout(); alert('로그아웃 되었습니다.')}}>로그아웃</div>
            </>
            :
            <>
            <span className="material-icons">login</span>
            <Link to={"/login"}>로그인</Link>
            </>
          }
        </li>
      </ul>
    </div>

    {/* Header-middle */}
    <div id="header-middle" className="flex my-5 items-center">
      <div id="nav">
        <button className="ml-5 bg-transparent w-10 h-10 bg-[url('./assets/icons/menu.svg')] bg-no-repeat bg-cover cursor-pointer">
        </button> 
      </div>
      <ul className="flex gap-16 px-14 w-full">
        <li className="cursor-pointer font-[650] w-full" onClick={() => Navigate("/")}>Home</li>
        <li className="cursor-pointer font-[650] w-full" onClick={() => Navigate("/NotFound")}>Magazine</li>
        <li className="cursor-pointer font-[650] w-full" onClick={() => Navigate("/asks")}>Services</li>
        <li className="cursor-pointer font-[650] w-full" onClick={() => Navigate("/events")}>Events</li>
        <li className="cursor-pointer font-[650] w-full" onClick={() => Navigate("/NotFound")}>About Us</li>
      </ul>
      <div className="relative w-72 ml-5 w-full">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-4/5 pl-4 pr-10 py-2 border border-gray-300 rounded-full bg-white text-base outline-none transition-shadow focus:shadow-lg"
        />
        <span className="material-icons absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black">
          search
        </span>
      </div>
    </div>
      
    {/* Header-bottom */}
    <div id="header-bottom" className="mt-6 bottom-1">
      <ul className="flex list-none gap-14 pl-12 my-5">
        <li className="font-libre text-3xl cursor-pointer  font-semibold w-full" onClick={() => Navigate("/bestProducts")}>Best</li>
        <li className="font-libre text-3xl cursor-pointer font-semibold hover:underline hover:underline-offset-4 w-full">Women</li>
        <li className="font-libre text-3xl cursor-pointer font-semibold hover:underline hover:underline-offset-4 w-full">Men</li>
        <li className="font-libre text-3xl cursor-pointer font-semibold hover:underline hover:underline-offset-4 w-full">Kid</li>
        <li className="font-libre text-3xl cursor-pointer font-semibold hover:underline hover:underline-offset-4 w-full" onClick={() => Navigate("/ranking")}>Ranking</li>
        <li className="font-libre text-3xl text-gray-500 cursor-pointer w-full" onClick={() => Navigate("/fashionFeed")}>Social</li>
      </ul>
    </div>
  </div>
  );
}

export default Header;