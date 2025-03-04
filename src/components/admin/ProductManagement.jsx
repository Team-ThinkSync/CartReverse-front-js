import { useState } from "react";


const ProductManagement = () => {

    const [products, setProducts] = useState([
        {id: 1, category: "여성", subcategory: "아우터", itemName: "덕다운 베이지 패딩", itemStock: "3", itemPrice: "120000", checked: false},
        {id: 2, category: "남성", subcategory: "상의", itemName: "회색 스트라이프 블래이저	", itemStock: "5", itemPrice: "60000", checked: false}


    ]);
    
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter(product =>
        product.itemName.includes(searchTerm)
    );

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
        
                {/* 상품 목록 테이블 */}
                <table className="w-full border-collapse border my-4">
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
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <tr key={product.id}>
                            <td className="border p-2">
                                <input
                                    type="checkbox"
                                    checked={product.checked}
                                />
                            </td>
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{product.category}</td>
                            <td className="border p-2">{product.subcategory}</td>
                            <td className="border p-2">{product.itemName}</td>
                            <td className="border p-2">{parseInt(product.itemPrice).toLocaleString()} 원</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="border p-4 text-gray-500">검색된 상품이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
                </table>
        
                <div className="flex justify-between">
                    {/* 상품 삭제 버튼 */}
                    <button
                    className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md"
                    >
                    상품 삭제
                    </button>
                    
                    <div>
                    {/* 회원 추가 버튼 */}
                    <button
                    className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md"
                    >
                    상품 수정
                    </button>
                    
                    {/* 회원 추가 버튼 */}
                    <button
                    className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md"
                    >
                    상품 추가
                    </button>
                    </div>

                </div>
                
            </div>
      </div>
    )
}

export default ProductManagement;