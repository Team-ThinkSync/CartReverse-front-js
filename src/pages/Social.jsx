import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Dummy from "../assets/images/clothes.png"

const categories = ["전체", "봄", "여름", "가을", "겨울"];
const dummyData = [
  { id: 1, image: {Dummy}, title: "캐주얼 데님 스타일" },
  { id: 2, image: {Dummy}, title: "편안한 후드 셋업" },
  { id: 3, image: {Dummy}, title: "세련된 스트릿 패션" },
  { id: 4, image: {Dummy}, title: "모던한 겨울룩" },
  { id: 5, image: {Dummy}, title: "트렌디한 가을 코디" },
  { id: 6, image: {Dummy}, title: "스포티한 데일리룩" },
];

export default function FashionFeed() {
  const [items, setItems] = useState(dummyData);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("전체");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setItems(dummyData.filter((item) => category === "전체" || item.title.includes(category)));
  }, [category]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...dummyData]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() => { setCategory(cat); setPage(1); }}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <img src={item.image} alt={item.title} className="rounded-xl" />
              <p className="mt-2 text-sm text-gray-600">{item.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Button onClick={loadMore} variant="outline">더 보기</Button>
        )}
      </div>
    </div>
  );
}
