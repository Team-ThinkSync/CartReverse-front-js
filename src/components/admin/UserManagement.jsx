import { useState, useEffect } from "react";

const UserManagement = () => {

  const [users, setUsers] = useState([
    {id: 1, name: "홍길동", email: "hong@naver.com", nickname: "Hong", grade: "Gold", checked: false},
    {id: 2, name: "신라면", email: "shin@naver.com", nickname: "nongshim", grade: "Bronze", checked: false},
    {id: 3, name: "김철수", email: "kcs2010@naver.com", nickname: "fashionterrorist", grade: "Diamond", checked: false},
    {id: 4, name: "이우진", email: "lwj0320@naver.com", nickname: "woojin", grade: "Silver", checked: false},
    {id: 5, name: "이순신", email: "lee@naver.com", nickname: "general", grade: "Gold", checked: false},
    {id: 6, name: "박지성", email: "park@naver.com", nickname: "jspark", grade: "Platinum", checked: false},
    {id: 7, name: "손흥민", email: "son@naver.com", nickname: "sonaldo", grade: "Diamond", checked: false},
    {id: 8, name: "유재석", email: "yoo@naver.com", nickname: "grasshopper", grade: "Gold", checked: false},
    {id: 9, name: "강호동", email: "kang@naver.com", nickname: "strongman", grade: "Silver", checked: false},
    {id: 10, name: "정형돈", email: "jung@naver.com", nickname: "handsome", grade: "Gold", checked: false},
    {id: 11, name: "김연아", email: "kim@naver.com", nickname: "queen", grade: "Diamond", checked: false},
  ]);

	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		email: "",
		grade: "",
		checked: false
	});
	const [isEditing, setIsEditing] = useState(false); // 회원 수정 
  const [editUser, setEditUser] = useState(null); // 수정할 회원 저장
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // 페이지당 최대 회원 수



  // 검색 기능
	const filteredUsers = users.filter(user =>
		user.name.includes(searchTerm) || user.email.includes(searchTerm)
	);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // 입력 값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 체크박스 상태 변경
  const handleCheckboxChange = (id) => {
    setUsers(prev =>
        prev.map(user =>
            user.id === id ? { ...user, checked: !user.checked } : user
        )
    );
};

const handleNicknameClick = (user) => {
  setEditUser({ ...user });
};

// editUser가 설정되면 모달을 자동으로 열도록 설정
useEffect(() => {
  if (editUser) {
    setIsEditing(true);
  }
}, [editUser]);

// 수정할 유저 찾기 & 모달 열기
const handleEditUser = () => {
  const selectedUser = users.find(user => user.checked);

  if(users.filter(user => user.checked).length > 1){
    alert("회원을 한 명만 선택하세요.");
    return;
  }
  
  if (!selectedUser) {
    alert("수정할 회원을 선택하세요.");
    return;
  }
  setEditUser(selectedUser); // 수정할 회원 저장
  setIsEditing(true);
  };

  // 상품 수정
  const handleUpdateUser = () => {
    setUsers(prev =>
      prev.map(user =>
        user.id === editUser.id ? editUser : user
      )
    );
    setIsEditing(false);
  };

  // 선택한 상품 삭제
  const handleDeleteSelected = () => {
      setUsers(prev => prev.filter(user => !user.checked));
  };



  // 페이지 기능
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

return(
  <div id="wrap" className="p-8">
    <div className="bg-white p-8 rounded-3xl">

      <h2 className="text-2xl font-bold mb-4 ">회원 관리</h2>

      {/* 검색창 */}
      <input
      type="text"
      placeholder="회원 이메일 또는 이름 검색"
      className="border p-2 rounded-md w-64 mb-4"
      value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
      />


      {/* 회원 목록 테이블 */}
      <table className="w-full border-collapse border my-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">선택</th>
            <th className="border p-2">NO.</th>
            <th className="border p-2">이름</th>
            <th className="border p-2">이메일</th>
            <th className="border p-2">닉네임</th>
            <th className="border p-2">등급</th>
          </tr>
        </thead>
        <tbody className="text-center ">
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="border p-2">
                      <input
                          type="checkbox"
                          checked={user.checked}
                          onChange={() => handleCheckboxChange(user.id)}
                      />
                  </td>
                  <td className="border p-2">{indexOfFirstUser + index + 1}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2 cursor-pointer hover:underline" onClick={() => handleNicknameClick(user)}>{user.nickname}</td>
                  <td className="border p-2">{user.grade}</td>
                </tr>
              ))
            ) : (
              <tr>
                  <td colSpan={6} className="border p-4 text-gray-500">검색된 회원이 없습니다.</td>
              </tr>
            )}                
        </tbody>
      </table>


        {(
          <div className="flex justify-center gap-2 mt-4">

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-md ${currentPage === index + 1 }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

          </div>
        )}


      <div className="flex justify-between">
        {/* 회원 삭제 버튼 */}
        <button
        className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md"
        onClick={handleDeleteSelected}>
        회원 삭제
        </button>

        {/* 회원 수정 버튼 */}
        <button
        className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md"
          onClick={handleEditUser}>
        회원 수정
        </button>

      </div>

      {/* 회원 수정 모달창 */}
      {isEditing && editUser && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">회원 수정</h2>

            <div className="flex flex-col gap-4 p-5">
              <label>이름</label>
              <input type="text" name="name" className="border p-2 rounded-md w-full mb-2"
                onChange={handleInputChange} value={editUser?.name || ""} />

              <label>이메일</label>
              <input type="text" name="email" className="border p-2 rounded-md w-full mb-2"
                onChange={handleInputChange} value={editUser?.email || ""} />

              <label>닉네임</label>
              <input type="text" name="nickname" className="border p-2 rounded-md w-full mb-2"
                onChange={handleInputChange} value={editUser?.nickname || ""} />

              <label>등급</label>
              <select name="grade" className="border p-2 rounded-md w-full mb-2"
                onChange={handleInputChange} value={editUser?.grade || ""}>
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="Diamond">Diamond</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={() => setIsEditing(false)}>취소</button>
              <button className="px-4 py-2 bg-[#708090] text-white rounded-md" onClick={handleUpdateUser}>저장</button>
            </div>
          </div>
        </div>
      )}



    </div>
	</div>
)
}

export default UserManagement;