import { useState } from "react";

const UserManagement = () => {

	const [users, setUsers] = useState([
		{id: 1, name: "홍길동", email: "hong@naver.com", nickname: "Hong", grade: "Gold", checked: false},
		{id: 2, name: "신라면", email: "shin@naver.com", nickname: "nongshim", grade: "Bronze", checked: false},
		{id: 3, name: "김철수", email: "kcs2010@naver.com", nickname: "fashionterrorist", grade: "Diamond", checked: false},
		{id: 4, name: "이진우", email: "ljw0320@naver.com", nickname: "jinwooo", grade: "Silver", checked: false},
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
  const [preview, setPreview] = useState(null); // 이미지 미리보기 URL 저장

	const filteredUsers = users.filter(user =>
		user.name.includes(searchTerm) || user.email.includes(searchTerm)
	);


	  // 입력 값 변경 핸들러
		const handleInputChange = (e) => {
      const { name, value } = e.target;

      setEditUser(prev => ({
        ...prev,
        [name]: value
      }));
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
					/>

	
					{/* 회원 목록 테이블 */}
					<table className="w-full border-collapse border my-4">
					<thead>
						<tr className="bg-gray-100">
								<th className="border p-2"><input type="checkbox" /></th>
								<th className="border p-2">NO.</th>
								<th className="border p-2">이름</th>
								<th className="border p-2">이메일</th>
								<th className="border p-2">닉네임</th>
								<th className="border p-2">등급</th>
						</tr>
					</thead>
						<tbody className="text-center ">
								{filteredUsers.length > 0 ? (
									filteredUsers.map((user, index) => (
										<tr key={user.id}>
											<td className="border p-2">
													<input
															type="checkbox"
															checked={user.checked}
													/>
											</td>
											<td className="border p-2">{index + 1}</td>
											<td className="border p-2">{user.name}</td>
											<td className="border p-2">{user.email}</td>
											<td className="border p-2">{user.nickname}</td>
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

					<div className="flex justify-between">
						{/* 회원 삭제 버튼 */}
						<button
						className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md"
						>
						회원 삭제
						</button>

						{/* 회원 추가 버튼 */}
						<button
						className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md"
						>
						회원 수정
						</button>

					</div>
					

			</div>
		</div>
	)
}

export default UserManagement;