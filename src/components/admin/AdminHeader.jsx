import { Link } from "react-router-dom";

const AdminHeader = () => {

    return(
      <>
      {/* header-top */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center border-b-8 h-[80px] border-[#708090] bg-white z-50">
        <div id="logo" className="flex items-center justify-center bg-[white] text-[#708090] text-3xl font-extrabold ml-10 z-50">
        <Link className="" to={"/"}>ECLO</Link>
        </div>
        <div>
          <svg className="mr-10" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#708090"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
          </svg>
        </div>
      </div>

      {/* 네비게이션 */}
        <div className="fixed top-[80px] left-0 w-60 h-full bg-gray-50 flex flex-col border-r-2 border-[#708090]">
        <ul>
          <li className="cursor-pointer font-bold text-lg text-center p-5 hover:text-[white] hover:bg-[#708090] border-b-gray-300 border">
            <Link to="/admin/dashboard">대시보드</Link>
          </li>
          <li className="cursor-pointer font-bold text-lg text-center p-5 hover:text-white border-b-gray-300 border hover:bg-[#708090]">
          <Link to="/admin/users">회원관리</Link>
          </li>
          <li className="cursor-pointer font-bold text-lg text-center p-5 hover:text-[white] border-b-gray-300 border hover:bg-[#708090]">
          <Link to="/admin/products">상품관리</Link>
          </li>

     
        </ul>
        </div>
      </>
    )
}

export default AdminHeader;