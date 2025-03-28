import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import CartMock from "../assets/data/CartItem.json"; // JSON 파일을 바로 가져옴

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = () => {
      try {
        const data = CartMock;
        setCartItems(data.cartItems);
      } catch (e) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  if (isLoading) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="text-center mt-20">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-100 h-screen">
        <Header />
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">장바구니에 담은 상품이 없습니다.</h2>
          <button
            className="mt-10 px-6 py-2 bg-black text-white rounded"
            onClick={() => console.log("쇼핑 계속하기")}
          >
            CONTINUE SHOPPING
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">장바구니</h2>
        <div className="border-t border-gray-300 py-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
