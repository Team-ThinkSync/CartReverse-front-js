
import { useState, useEffect } from "react";

const AdminInquiry = () => {

  const [users, setUsers] = useState([
    {id: 1, name: "홍길동", email: "hong@naver.com", title: "반품 요청", nickname: "Hong", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 2, name: "신라면", email: "shin@naver.com", title: "재입고 날짜", nickname: "nongshim", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 3, name: "김철수", email: "kim@naver.com", title: "사이즈 교환", nickname: "fashionterrorist", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 4, name: "이우진", email: "lee@naver.com", title: "반품 요청", nickname: "woojin", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 5, name: "이순신", email: "general@naver.com", title: "반품 요청", nickname: "general", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 6, name: "박지성", email: "jsp@naver.com", title: "반품 요청", nickname: "jspark", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 7, name: "손흥민", email: "son@naver.com", title: "반품 요청", nickname: "sonaldo", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 8, name: "유재석", email: "yoo@naver.com", title: "반품 요청", nickname: "grasshopper", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 9, name: "강호동", email: "khd@naver.com", title: "반품 요청", nickname: "strongman", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 10, name: "정형돈", email: "jhd@naver.com", title: "반품 요청", nickname: "handsome", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
    {id: 11, name: "김연아", email: "yak@naver.com", title: "반품 요청", nickname: "queen", isAnswered: "답변예정", checked: false, inquiryContent: "상품이 마음에 들지 않아 반품하고 싶습니다.", answerContent: ""},
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchTerm) || user.email.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleCheckboxChange = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, checked: !user.checked } : user
      )
    );
  };

  const handleTitleClick = (user) => {
    setSelectedInquiry({ ...user }); // 복사본을 전달
  };

  const handleInquiry = () => {
    const selected = users.filter((user) => user.checked);
    if (selected.length !== 1) {
      alert("수정할 문의 내역을 하나만 선택해주세요.");
      return;
    }
    setSelectedInquiry({ ...selected[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedInquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInquiry = () => {

    const updated = {
      ...selectedInquiry,
      isAnswered: selectedInquiry.answerContent.trim() !== "" ? "답변완료" : "답변예정",
    };

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedInquiry.id ? updated : user
      )
    );
    setSelectedInquiry(null);
  };

  const handleDeleteSelected = () => {
    setUsers((prev) => prev.filter((user) => !user.checked));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">문의 내역</h2>

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

        <table className="w-full border-collapse border my-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">선택</th>
              <th className="border p-2">NO.</th>
              <th className="border p-2">이름</th>
              <th className="border p-2">문의 제목</th>
              <th className="border p-2">닉네임</th>
              <th className="border p-2">답변 여부</th>
            </tr>
          </thead>
          <tbody className="text-center">
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
                  <td
                    className="border p-2 cursor-pointer hover:underline"
                    onClick={() => handleTitleClick(user)}
                  >
                    {user.title}
                  </td>
                  <td className="border p-2">{user.nickname}</td>
                  <td className="border p-2">{user.isAnswered}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-gray-500">
                  검색된 회원이 없습니다.
                </td>
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

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={handleDeleteSelected}
          >
            문의 삭제
          </button>
          <button
            className="px-4 py-2 bg-[#708090] text-white rounded-md"
            onClick={handleInquiry}
          >
            문의 조회
          </button>
        </div>

        {selectedInquiry && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">문의 수정</h2>

              <div className="flex flex-col gap-4">
                <label>이름</label>
                <input
                  name="name"
                  className="border p-2 rounded-md"
                  value={selectedInquiry.name}
                />

                <label>이메일</label>
                <input
                  name="email"
                  className="border p-2 rounded-md"
                  value={selectedInquiry.email}
                />

                <label>닉네임</label>
                <input
                  name="nickname"
                  className="border p-2 rounded-md"
                  value={selectedInquiry.nickname}
                />

                <label>답변 여부</label>
                <select
                  name="isAnswered"
                  className="border p-2 rounded-md"
                  value={selectedInquiry.isAnswered}
                >
                  <option value="답변예정">답변예정</option>
                  <option value="답변완료">답변완료</option>
                </select>

                <label>문의 내용</label>
                <textarea
                  name="inquiryContent"
                  className="border p-2 rounded-md"
                  rows={3}
                  value={selectedInquiry.inquiryContent}
                />

                <label>답변 내용</label>
                <textarea
                  name="answerContent"
                  className="border p-2 rounded-md"
                  rows={3}
                  value={selectedInquiry.answerContent || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={() => setSelectedInquiry(null)}
                >
                  닫기
                </button>
                <button
                  className="px-4 py-2 bg-[#708090] text-white rounded-md"
                  onClick={handleUpdateInquiry}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiry;