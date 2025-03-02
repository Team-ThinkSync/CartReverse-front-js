const UserManagement = () => {
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
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>1</td> 
                        <td>홍길동</td>
                        <td>hong@naver.com</td>
                        <td>Hong</td>
                        <td>Gold</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>2</td> 
                        <td>신라면</td>
                        <td>shin@naver.com</td>
                        <td>NongShim</td>
                        <td>Bronze</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>3</td> 

                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>4</td> 

                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>5</td> 

                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>6</td> 

                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>7</td> 

                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>8</td> 

                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>9</td> 

                    </tr>                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>10</td> 

                    </tr>
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
                    회원 추가
                    </button>

                </div>
                

            </div>
      </div>
    )
}

export default UserManagement;