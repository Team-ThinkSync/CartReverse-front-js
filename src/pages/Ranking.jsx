import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Clothes from "../assets/images/clothes.png"

const categories = ["전체", "신발", "아우터", "상의", "바지"];

const dummyItems = [
  { id: 1, image: {Clothes}, title: "상품1", category: "신발", rank: 1 },
  { id: 2, image: {Clothes}, title: "상품2", category: "아우터", rank: 2 },
  { id: 3, image: {Clothes}, title: "상품3", category: "상의", rank: 3 },
  { id: 4, image: {Clothes}, title: "상품4", category: "바지", rank: 4 },
];

export default function RankingPage() {
  const [category, setCategory] = useState("전체");

  const filteredItems = dummyItems
    .filter((item) => category === "전체" || item.category === category)
    .sort((a, b) => a.rank - b.rank); 

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <img src={item.image} alt={item.title} className="rounded-xl" />
              <p className="mt-2 text-sm">{item.rank}위 - {item.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
