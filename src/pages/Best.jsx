import { useState } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import Clothes from "../assets/images/clothes.png";
import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const bestItems = [
  { 
    id: 1, 
    image: Clothes, 
    brand: "나이키", 
    title: "에센셜 오버사이즈 후드 집업", 
    originalPrice: "89,000원", 
    price: "58,740원", 
    discount: "34%",
    isNew: true,
    isSoldOut: false
  },
  { 
    id: 2, 
    image: Clothes, 
    brand: "아디다스", 
    title: "오리지널 클래식 맨투맨", 
    originalPrice: "109,000원", 
    price: "32,700원", 
    discount: "70%",
    isNew: false,
    isSoldOut: false 
  },
  { 
    id: 3, 
    image: Clothes, 
    brand: "폴로", 
    title: "베이직 셔츠 (슬림핏)", 
    originalPrice: "129,000원", 
    price: "83,850원", 
    discount: "35%",
    isNew: true,
    isSoldOut: false
  },
  { 
    id: 4, 
    image: Clothes, 
    brand: "유니클로", 
    title: "울트라 라이트 다운 재킷", 
    originalPrice: "99,000원", 
    price: "49,500원", 
    discount: "50%",
    isNew: false,
    isSoldOut: true
  },
  { 
    id: 5, 
    image: Clothes, 
    brand: "지오다노", 
    title: "하이넥 니트 스웨터", 
    originalPrice: "59,000원", 
    price: "38,940원", 
    discount: "34%",
    isNew: false,
    isSoldOut: false
  },
];

  export default function BestProducts() {
    const navigate = useNavigate();

    const handleItemClick = (id) => {
      navigate('/productDetail');
    };

    return (
      <div className="w-full mx-auto p-4 font-sans">
        <Header />
        <div className="flex-1 flex flex-col p-4 overflow-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold">BEST</h2>
          <span className="text-sm text-gray-500 cursor-pointer hover:underline">더보기</span>
        </div>
        
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-3">
            {bestItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="w-44 flex-shrink-0 border-0 shadow-none relative group"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-52 object-cover"
                  />
                  
                  {/* 랭킹 표시 */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  
                  {/* 위시리스트 아이콘 */}
                  <button className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white bg-opacity-70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={16} color="#333" />
                  </button>
                  
                  {/* New 태그 */}
                  {item.isNew && (
                    <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1">
                      NEW
                    </div>
                  )}
                  
                  {/* 품절 태그 */}
                  {item.isSoldOut && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                      <span className="text-gray-800 font-bold">SOLD OUT</span>
                    </div>
                  )}
                </div>
                
                <CardContent className="px-0 py-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">{item.brand}</p>
                  <p className="text-sm font-medium truncate mb-1">{item.title}</p>
                  <div className="flex items-center">
                    <span className="text-red-600 text-sm font-medium mr-1">{item.discount}</span>
                    <span className="text-sm font-bold">{item.price}</span>
                  </div>
                  <p className="text-xs text-gray-400 line-through">{item.originalPrice}</p>
                  
                  {/* 마우스 오버시 나타나는 장바구니 버튼 */}
                  <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity pb-16">
                    <button className="bg-black text-white text-xs py-2 px-3 flex items-center rounded-sm">
                      <ShoppingBag size={14} className="mr-1" />
                      장바구니
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    );
  }
