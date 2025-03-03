import { useState, useEffect } from "react";

const AddressSearch = ({ setAddress }) => {
  const [zonecode, setZonecode] = useState(""); // 우편번호 상태
  const [roadAddress, setRoadAddress] = useState(""); // 도로명 주소 상태
  const [specificAddress, setSpecificAddress] = useState(""); // 도로명 주소 상태

  useEffect(() => {
    // 다음 우편번호 API 로드
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 주소 검색 실행 함수
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZonecode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setAddress(data.roadAddress); // 부모 컴포넌트의 주소 상태 업데이트
      },
    }).open();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">주소 검색</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={zonecode}
          readOnly
          placeholder="우편번호"
          className="text-lg border-2 w-32 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
        />
        <button
          type="button"
          onClick={handleAddressSearch}
          className="p-2 bg-gray-700 text-white rounded-md"
        >
          우편번호 검색
        </button>
      </div>
      <input
        type="text"
        value={roadAddress}
        readOnly
        placeholder="주소"
        className="text-lg border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
      />
      <input
        type="text"
        value={specificAddress}
        onChange={(e)=>setSpecificAddress(e.target.value)}       
        placeholder="상세 주소 입력"
        className="text-lg border-2 border-gray-400 rounded-lg mb-[10px] p-2 focus:outline-none focus:border-black"
      />
    </div>
  );
};

export default AddressSearch;
