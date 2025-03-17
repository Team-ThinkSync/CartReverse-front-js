import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Loader2 } from "lucide-react";
import DummyImage from "../assets/images/clothes.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

const categories = ["전체", "봄", "여름", "가을", "겨울"];
const dummyData = [
  { id: 1, media: DummyImage, type: "image", title: "캐주얼 데님 스타일" },
  { id: 2, media: DummyImage, type: "image", title: "편안한 후드 셋업" },
  { id: 3, media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", type: "video", title: "세련된 스트릿 패션" },
  { id: 4, media: DummyImage, type: "image", title: "모던한 겨울룩" },
  { id: 5, media: "https://cdn.pixabay.com/vimeo/837797244/180252.mp4", type: "video", title: "트렌디한 가을 코디" },
  { id: 6, media: DummyImage, type: "image", title: "스포티한 데일리룩" },
  { id: 7, media: DummyImage, type: "image", title: "베이직한 티셔츠" },
  { id: 8, media: DummyImage, type: "image", title: "여름 린넨 코디" },
];

export default function FashionFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("전체");
  const [page, setPage] = useState(1);

  useEffect(() => {
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
    <div className="w-full h-screen flex flex-col">
      <Header/>
      <div className="flex-1 flex flex-col p-4 overflow-auto">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 flex-1">
            {items.map((item) => (
              <Card key={item.id} className="h-full">
                <CardContent className="p-2">
                  {item.type === "image" ? (
                    <img src={item.media} alt={item.title} className="w-full h-32 object-cover rounded-lg" />
                  ) : (
                    <video 
                      src={item.media} 
                      className="w-full h-32 object-cover rounded-lg" 
                      controls
                      preload="metadata"
                    />
                  )}
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500 flex-1 flex items-center justify-center">
            해당 카테고리에 아이템이 없습니다.
          </p>
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
      </div>
      <Footer />
    </div>
  );
}
