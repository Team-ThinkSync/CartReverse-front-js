import { useState } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import Clothes from "../assets/images/clothes.png";
import { TrophyIcon } from "lucide-react";
import Header from "../components/Header";
import useProductData from "../hooks/useProductData";
import Footer from "../components/Footer";
import { useProductUIStore } from "../store/useProductStore";


export default function RankingPage() {
  const handleFetchProductsByCategory = useProductData();
  const [ setCategory, selectedColor ] = useProductUIStore();
  const filteredItems = handleFetchProductsByCategory.
    .filter((item) => category === "전체" || item.category === category)
    .sort((a, b) => a.rank - b.rank);
    
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center p-2 w-full">
                      <span className="text-xl font-bold">{item.rank}</span>
                    </div>
                    <div className="flex-1 p-4">
                      <img src={item.image} alt={item.title} className="w-full h-40 object-cover mb-3" />
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <p className="font-bold mt-2">{item.price}</p>
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