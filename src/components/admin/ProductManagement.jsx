const ProductManagement = () => {
    return(
      <div id="wrap" className="p-8">
            <div className="bg-white p-8 rounded-3xl">

                <h2 className="text-2xl font-bold mb-4 ">상품 관리</h2>
        
                {/* 검색창 */}
                <input
                type="text"
                placeholder="상품명 검색"
                className="border p-2 rounded-md w-64 mb-4"
                />
        
                {/* 상품 추가 버튼 */}
                <button
                className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md"
                >
                상품 추가
                </button>
        
                {/* 상품 목록 테이블 */}
                <table className="w-full border-collapse border mt-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2"><input type="checkbox" /></th>
                        <th className="border p-2">NO.</th>
                        <th className="border p-2">카테고리</th>
                        <th className="border p-2">세부카테고리</th>
                        <th className="border p-2">상품명</th>
                        <th className="border p-2">가격</th>
                    </tr>
                </thead>
                <tbody className="text-center ">
                    <tr>
                        <td className="p-2 border"><input type="checkbox" /></td> 
                        <td>1</td> 
                        <td>여성</td>
                        <td>아우터</td>
                        <td>덕다운 베이지 패딩</td>
                        <td>220,000 원</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td> 
                        <td>2</td> 
                        <td>남성</td>
                        <td>상의</td>
                        <td>회색 스트라이프 블래이저</td>
                        <td>60,000 원</td>
                    </tr>
                </tbody>
                </table>
        

            </div>
      </div>
    )
}

export default ProductManagement;