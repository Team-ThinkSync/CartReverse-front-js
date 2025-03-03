import { useState } from "react"; 
import { Card, CardContent } from "../components/Card"; 
import { Button } from "../components/Button"; 
import Clothes from "../assets/images/clothes.png";
import { TrophyIcon, ShoppingBagIcon } from "lucide-react";

const categories = ["전체", "신발", "아우터", "상의", "바지"]; 

const dummyItems = [ 
  { id: 1, image: Clothes, title: "프리미엄 런닝화", category: "신발", rank: 1, price: "89,000원" }, 
  { id: 2, image: Clothes, title: "오버사이즈 패딩", category: "아우터", rank: 2, price: "129,000원" }, 
  { id: 3, image: Clothes, title: "캐시미어 니트", category: "상의", rank: 3, price: "79,000원" }, 
  { id: 4, image: Clothes, title: "와이드 슬랙스", category: "바지", rank: 4, price: "69,000원" }, 
]; 

export default function RankingPage() { 
  const [category, setCategory] = useState("전체"); 
  
  const filteredItems = dummyItems
    .filter((item) => category === "전체" || item.category === category)
    .sort((a, b) => a.rank - b.rank); 
    
  return ( 
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen"> 
      <h2 className="text-2xl font-bold mb-6 text-center">인기 상품 랭킹</h2>
      
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <p className="text-sm text-gray-500 mb-3">카테고리</p>
        <div className="flex gap-2 overflow-x-auto pb-2"> 
          {categories.map((cat) => ( 
            <Button 
              key={cat} 
              variant={category === cat ? "default" : "outline"} 
              onClick={() => setCategory(cat)} 
            > 
              {cat} 
            </Button> 
          ))} 
        </div> 
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5"> 
        {filteredItems.map((item) => ( 
          <Card key={item.id} className="overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1"> 
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="absolute top-3 left-3">
                <div className={`flex items-center justify-center ${
                  item.rank === 1 ? 'bg-yellow-400' : 
                  item.rank === 2 ? 'bg-gray-300' : 
                  item.rank === 3 ? 'bg-amber-600' : 'bg-black'
                } text-white rounded-full w-8 h-8 shadow-md`}>
                  <span className="font-bold text-sm">{item.rank}</span>
                </div>
              </div>
            </div>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                </div>
                <p className="font-bold text-sm">{item.price}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <TrophyIcon size={14} className="mr-1" />
                  <span>랭킹 {item.rank}위</span>
                </div>
                <Button variant="ghost" className="p-1">
                  <ShoppingBagIcon size={16} />
                </Button>
              </div>
            </CardContent> 
          </Card> 
        ))} 
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>해당 카테고리에 상품이 없습니다.</p>
        </div>
      )}
    </div> 
  ); 
}