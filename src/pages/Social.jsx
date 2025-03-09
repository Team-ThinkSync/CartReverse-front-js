import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Loader2 } from "lucide-react";
import Dummy from "../assets/images/clothes.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const categories = ["전체", "봄", "여름", "가을", "겨울"];
const dummyData = [
  { id: 1, image: Dummy, title: "캐주얼 데님 스타일" },
  { id: 2, image: Dummy, title: "편안한 후드 셋업" },
  { id: 3, image: Dummy, title: "세련된 스트릿 패션" },
  { id: 4, image: Dummy, title: "모던한 겨울룩" },
  { id: 5, image: Dummy, title: "트렌디한 가을 코디" },
  { id: 6, image: Dummy, title: "스포티한 데일리룩" },
];

export default function FashionFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("전체");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Filter items based on category
    const filteredItems = dummyData.filter(
      (item) => 
        category === "전체" || 
        (category === "봄" && item.title.includes("봄")) ||
        (category === "여름" && item.title.includes("여름")) ||
        (category === "가을" && item.title.includes("가을")) ||
        (category === "겨울" && item.title.includes("겨울"))
    );
    setItems(filteredItems);
  }, [category]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      // Clone the dummy data and give new IDs to simulate new content
      const newItems = dummyData.map((item) => ({
        ...item,
        id: item.id + items.length
      }));
      setItems((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
      setPage((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
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

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-xl" />
                <p className="mt-2 text-sm text-gray-600">{item.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">해당 카테고리에 아이템이 없습니다.</p>
      )}

      <div className="flex justify-center mt-4">
        {loading ? (
          <div className="flex items-center">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span>로딩 중...</span>
          </div>
        ) : (
          items.length > 0 && <Button onClick={loadMore} variant="outline">더 보기</Button>
        )}
      </div>
      <Footer />
    </div>
  );
}