import { useState } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([
      { id: 1, category: "여성", subcategory: "아우터", itemName: "덕다운 베이지 패딩", itemStock: "3", itemPrice: "120000", checked: false },
      { id: 2, category: "남성", subcategory: "상의", itemName: "회색 스트라이프 블래이저", itemStock: "5", itemPrice: "60000", checked: false }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
      category: "",
      subcategory: "",
      itemName: "",
      itemStock: "",
      itemPrice: "",
      checked: false
  });
  const [isEditing, setIsEditing] = useState(false); // 상품 수정 
  const [editProduct, setEditProduct] = useState(null); // 수정할 상품 저장

  const [preview, setPreview] = useState(null); // 이미지 미리보기 URL 저장


  // 검색 기능
  const filteredProducts = products.filter(product =>
      product.itemName.includes(searchTerm)
  );

  // 입력 값 변경 핸들러
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProduct(prev => ({
          ...prev,
          [name]: value
      }));
      
      setEditProduct(prev => ({
        ...prev,
        [name]: value
      }));
  };

  // 상품 추가 기능
  const handleAddProduct = () => {
      if (!newProduct.category || !newProduct.itemName || !newProduct.itemStock || !newProduct.itemPrice) {
          alert("모든 필드를 입력하세요.");
          return;
      }

      setProducts(prev => [
          ...prev,
          { ...newProduct, id: prev.length + 1 } // ID 자동 증가
      ]);

      setNewProduct({ category: "", subcategory: "", itemName: "", itemStock: "", itemPrice: "", checked: false });
      setIsModalOpen(false);
  };

  // 체크박스 상태 변경
  const handleCheckboxChange = (id) => {
      setProducts(prev =>
          prev.map(product =>
              product.id === id ? { ...product, checked: !product.checked } : product
          )
      );
  };

  // 수정할 상품 찾기 & 모달 열기
  const handleEditProduct = () => {
    const selectedProduct = products.filter(product => product.checked);
    if(selectedProduct.length>0){
      alert("상품을 한 개만 선택하세요.");
      return;
    }
    if (!selectedProduct) {
      alert("수정할 상품을 선택하세요.");
      return;
    }
    setEditProduct(selectedProduct); // 수정할 상품 저장
    setIsEditing(true);
  };

  // 상품 수정
  const handleUpdateProduct = () => {
    setProducts(prev =>
      prev.map(product =>
        product.id === editProduct.id ? editProduct : product
      )
    );
    setIsEditing(false);
  };

  // 선택한 상품 삭제
  const handleDeleteSelected = () => {
      setProducts(prev => prev.filter(product => !product.checked));
  };


    // 파일 업로드 핸들러 (이미지 미리보기)
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // 첫 번째 파일 가져오기
    if (file) {
        setNewProduct((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  return (
    <div id="wrap" className="p-8">
      <div className="bg-white p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">상품 관리</h2>

        {/* 검색창 */}
        <input
            type="text"
            placeholder="상품명 검색"
            className="border p-2 rounded-md w-64 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* 상품 목록 테이블 */}
        <table className="w-full border-collapse border my-4">
          <thead>
            <tr className="bg-gray-100">
                <th className="border p-2">선택</th>
                <th className="border p-2">NO.</th>
                <th className="border p-2">카테고리</th>
                <th className="border p-2">세부카테고리</th>
                <th className="border p-2">상품명</th>
                <th className="border p-2">가격</th>
            </tr>
          </thead>
          <tbody className="text-center">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                    <tr key={product.id}>
                        <td className="border p-2">
                          <input
                              type="checkbox"
                              checked={product.checked}
                              onChange={() => handleCheckboxChange(product.id)}
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

        {/* 버튼 영역 */}
        <div className="flex justify-between">
          <button
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={handleDeleteSelected}
          >
            상품 삭제
          </button>
          
          <div>
            <button className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md" onClick={handleEditProduct}>
              상품 수정
            </button>
            <button className="ml-4 px-4 py-2 bg-[#708090] text-white rounded-md" onClick={() => setIsModalOpen(true)}>
              상품 추가
            </button>
          </div>
        </div>

        {/* 상품 수정 모달창 */}
        {isEditing && editProduct && (
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {/* 모달 헤더 */}
              <h2 className="text-xl font-bold mb-4">상품 수정</h2>
          
              <div className="flex gap-20 p-5">
                {/* 모달 좌측 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label>카테고리</label>
                    <select name="category" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={editProduct.category}>
                      <option value="여성">여성</option>
                      <option value="남성">남성</option>
                      <option value="키즈">키즈</option>
                    </select>
                  </div>

                  <div>
                    <label>세부카테고리</label>
                    <select name="subcategory" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={editProduct.subcategory}>
                      <option value="">선택</option>
                      <option value="아우터">아우터</option>
                      <option value="상의">상의</option>
                      <option value="하의">하의</option>
                      <option value="신발">신발</option>
                      <option value="악세사리">악세사리</option>
                    </select>
                  </div>

                  <div>
                    <label>상품명</label>
                    <input type="text" name="itemName" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={editProduct.itemName} />
                  </div>

                  <div>
                    <label>수량</label>
                    <input type="number" name="itemStock" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={editProduct.itemStock} />
                  </div>

                  <div>
                    <label>가격</label>
                    <input type="number" name="itemPrice" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={editProduct.itemPrice} />
                  </div>
                </div>

                {/* 모달 우측 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label>이미지 선택</label>
                    <select className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange}>
                      <option value="">선택</option>
                    </select>
                  </div>
                  {/* 이미지 업로드 및 미리보기 */}
                  <div className="flex flex-col items-center mb-4">
                    <label className="w-40 h-40 border border-gray-300 flex justify-center items-center cursor-pointer rounded-lg overflow-hidden">
                        {preview ? (
                            <img src={preview} alt="미리보기" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">이미지 추가</span>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <span className="text-sm text-gray-500 mt-2">JPG, PNG 파일만 업로드 가능</span>
                  </div>
                </div>
              </div>
        
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={() => setIsEditing(false)}>취소</button>
                <button className="px-4 py-2 bg-[#708090] text-white rounded-md" onClick={handleUpdateProduct}>저장</button>
              </div>
            </div>
          </div>
        )}

        {/* 상품 추가 모달창 */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {/* 모달 헤더 */}
              <h2 className="text-xl font-bold mb-4">상품 추가</h2>
          
              <div className="flex gap-20 p-5">
                {/* 모달 좌측 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label>카테고리</label>
                    <select name="category" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={products.category}>
                      <option value="">선택</option>
                      <option value="여성">여성</option>
                      <option value="남성">남성</option>
                      <option value="키즈">키즈</option>
                    </select>
                  </div>

                  <div>
                    <label>세부카테고리</label>
                    <select name="subcategory" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={newProduct.subcategory}>
                      <option value="">선택</option>
                      <option value="아우터">아우터</option>
                      <option value="상의">상의</option>
                      <option value="하의">하의</option>
                      <option value="신발">신발</option>
                      <option value="악세사리">악세사리</option>
                    </select>
                  </div>

                  <div>
                    <label>상품명</label>
                    <input type="text" name="itemName" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={newProduct.itemName} />
                  </div>

                  <div>
                    <label>수량</label>
                    <input type="number" name="itemStock" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={newProduct.itemStock} />
                  </div>

                  <div>
                    <label>가격</label>
                    <input type="number" name="itemPrice" className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange} value={newProduct.itemPrice} />
                  </div>
                </div>
                {/* 모달 우측 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label>이미지 선택</label>
                    <select className="border p-2 rounded-md w-full mb-2" onChange={handleInputChange}>
                      <option value="">선택</option>
                    </select>
                  </div>
                  {/* 이미지 업로드 및 미리보기 */}
                  <div className="flex flex-col items-center mb-4">
                    <label className="w-40 h-40 border border-gray-300 flex justify-center items-center cursor-pointer rounded-lg overflow-hidden">
                        {preview ? (
                            <img src={preview} alt="미리보기" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">이미지 추가</span>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <span className="text-sm text-gray-500 mt-2">JPG, PNG 파일만 업로드 가능</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-[#708090] text-white rounded-md" onClick={() => setIsModalOpen(false)}>취소</button>
                <button className="px-4 py-2 bg-[#708090] text-white rounded-md" onClick={handleAddProduct}>추가</button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default ProductManagement;
