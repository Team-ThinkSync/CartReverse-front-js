import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Star, ChevronDown, Share2, Truck, CreditCard, MessageSquare } from "lucide-react";
import { Button } from "../components/Button";
import Clothes from "../assets/images/clothes.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useProductData from "../hooks/useProductData";
import useReview from "../hooks/useReview";
import { useProductUIStore } from '../store/useProductStore';

export default function ProductDetail() {
  const navigate = useNavigate();
  const  {
    selectedColor, selectedSize,
    quantity, showSizeGuide,
    mainImage, setColor, setSize,
    changeQuantity, toggleSizeGuide, setMainImage,
    resetUI
  } = useProductUIStore();
  // 상품 데이터임
  const [ 
    handleAddProduct, 
    handleDeleteProduct, 
    handleUpdateProduct,
    handleFetchProductDetails,
    handleFetchProductsByCategory, 
  ] = useProductData();

  // {
  //   "productName": "string",
  //   "productImages": [
  //     "string"
  //   ],
  //   "productPrice": 0,
  //   "productStock": 0,
  //   "categoryType": "string",
  //   "categoryName": "string",
  //   "likeCount": 0
  // }

  // 리뷰 데이터임
  const reviews = useReview();
  const { id } = useParams();
  
  // 수량 변경 함수
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
        changeQuantity(newQuantity);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <Header/>
      {/* 상품 정보 섹션 */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* 이미지 섹션 */}
        <div className="md:w-1/2">
          {/* 메인 이미지 */}
          <div className="mb-3">
            <img src={mainImage} alt={handleFetchProductDetails.productName} className="w-full h-96 object-cover" />
          </div>
          
          {/* 썸네일 이미지 */}
          <div className="flex gap-2">
            {handleFetchProductDetails.images.map((img, index) => (
              <div 
                key={index} 
                className={`w-20 h-20 cursor-pointer ${mainImage === img ? 'border-2 border-black' : 'border border-gray-200'}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`썸네일 ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        {/* 상품 정보 */}
        <div className="md:w-1/2">
          <div className="mb-1">
            <span className="text-sm text-gray-500">{handleFetchProductDetails.categoryName}</span>
          </div>
          
          <h1 className="text-xl font-bold mb-2">{handleFetchProductDetails.title}</h1>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={16} 
                  fill={star <= Math.floor(reviews.content.rate) ? "#000" : "none"} 
                  color="#000" 
                />
              ))}
              <span className="ml-1 text-sm">{reviews.rating}</span>
            </div>
            <span className="text-sm text-gray-500">리뷰 {reviews.reviewCount}</span>
          </div>
          
          <div className="mb-5">
            <div className="flex items-center">
              <span className="text-xl font-bold">{handleFetchProductDetails.data.price}</span>
            </div>
            <p className="text-sm text-gray-400 line-through">{handleFetchProductDetails.data.originalPrice}</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-5">{handleFetchProductDetails.data.description}</p>
          
          {/* 색상 선택 */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">색상</span>
              <span className="text-sm text-gray-500">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {handleFetchProductDetails.options.colors.map((color) => (
                <button
                  key={color}
                  className={`px-3 py-2 text-sm border ${selectedColor === color ? 'border-black' : 'border-gray-200'}`}
                  onClick={() => setColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">사이즈</span>
              <button 
                className="text-sm text-gray-500 underline"
                onClick={() => toggleSizeGuide(!showSizeGuide)}
              >
                사이즈 가이드
              </button>
            </div>
          </div>
          
          {/* 수량 선택 */}
          <div className="flex items-center mb-6">
            <span className="text-sm font-medium mr-4">수량</span>
            <div className="flex border border-gray-200">
              <button 
                className="px-3 py-1 border-r border-gray-200"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                className="px-3 py-1 border-l border-gray-200"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          {/* 구매 버튼 */}
          <div className="flex gap-2 mb-4">
            <button className="flex-1 bg-black text-white py-3 font-medium text-sm">
              바로 구매하기
            </button>
            <button className="flex-1 border border-black py-3 font-medium text-sm flex items-center justify-center">
              <ShoppingBag size={16} className="mr-1" />
              장바구니
            </button>
            <button className="w-12 border border-gray-200 flex items-center justify-center">
              <Heart size={20} />
            </button>
          </div>
          
          {/* 배송 정보 */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-start mb-2">
              <Truck size={16} className="mr-2 mt-1" />
              <div>
                <p className="text-sm font-medium">무료 배송</p>
                <p className="text-xs text-gray-500">3만원 이상 구매 시 무료 배송</p>
              </div>
            </div>
            <div className="flex items-start">
              <CreditCard size={16} className="mr-2 mt-1" />
              <div>
                <p className="text-sm font-medium">안전 결제</p>
                <p className="text-xs text-gray-500">카드, 무통장, 간편결제 가능</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 상품 상세 정보 탭 */}
      <div className="mt-12 border-t border-gray-200">
        <div className="flex border-b border-gray-200">
          <button className="py-3 px-4 font-medium border-b-2 border-black">상품 정보</button>
          <button className="py-3 px-4 text-gray-500">리뷰 ({reviews.data.size})</button>
          <button className="py-3 px-4 text-gray-500">Q&A</button>
        </div>
        
        <div className="py-8">
          <h3 className="text-lg font-bold mb-4">상품 상세 정보</h3>
          
          <div className="mt-8">
            <img src={Clothes} alt="상세 이미지" className="w-full" />
            <img src={Clothes} alt="상세 이미지" className="w-full mt-4" />
          </div>
        </div>
      </div>
      
      {/* 하단 구매 버튼 (모바일) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 md:hidden">
        <button className="w-12 border border-gray-200 flex items-center justify-center">
          <Heart size={20} />
        </button>
        <button className="flex-1 border border-black py-3 font-medium text-sm">
          장바구니
        </button>
        <button className="flex-1 bg-black text-white py-3 font-medium text-sm">
          구매하기
        </button>
      </div>
      <Footer/>
    </div>
  );
}