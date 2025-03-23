import { useState } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import Clothes from "../assets/images/clothes.png";
import { TrophyIcon, ShoppingBagIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-center mb-6">인기 상품 랭킹</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">카테고리</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  variant={category === cat ? "filled" : "outlined"}
                  className="px-4 py-2"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="flex items-center justify-center p-4 w-16">
                      <span className="text-xl font-bold">{item.rank}</span>
                    </div>
                    <div className="flex-1 p-4">
                      <img src={item.image} alt={item.title} className="w-full h-40 object-cover mb-3" />
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <p className="font-bold mt-2">{item.price}</p>
                    </div>
                    <div className="flex flex-col justify-between p-4 bg-gray-50">
                      <div className="flex items-cente mb-2">
                        <TrophyIcon size={16} className="mr-1" />
                        <span className="text-sm">랭킹 {item.rank}위</span>
                      </div>
                      <Button className="flex items-center">
                        <ShoppingBagIcon size={16} className="mr-1" />
                        <span>장바구니</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              해당 카테고리에 상품이 없습니다.
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}