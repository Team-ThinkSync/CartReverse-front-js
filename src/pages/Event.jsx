import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import { useState } from "react";
import useFetchItems from "../hooks/useReview";

const Events = () => {
    const [category, setCategory] = useState("ALL");
    const { filteredItems, isLoading, error } = useFetchItems(category);

    if (isLoading) {
        return <div>로딩 중</div>;
    }

    if (error) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header className="w-full" />
            
            <div className="w-full max-w-6xl mx-auto px-4 flex-grow">
                <div className="grid grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <Footer className="w-full" />
        </div>
    );
};

export default Events;