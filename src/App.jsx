import {Routes, Route, Link} from "react-router-dom"
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetail";
import Events from "./pages/Event";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";  
import Asks from "./pages/Asks";
import AsksWrite from "./pages/AsksWrite";
import MyPage from "./pages/MyPage";
import FashionFeed from "./pages/Social";
import BestProducts from "./pages/Best";
import RankingPage from "./pages/Ranking";
import ProductDetail from "./pages/ProductDetail";
import SocialDetail from "./pages/SocialDetail";
import KakaoRedirect from "./pages/KakaoRedirect";
import Admin from "./pages/Admin";
import AdminInquiry from "./components/admin/AdminInquiry";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";


function App() {

  return ( 

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/NotFound" element={<NotFound/>}/>
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/asks" element={<Asks />} />
        <Route path="/bestProducts" element={<BestProducts />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/fashionFeed" element={<FashionFeed/>}/>
        <Route path="/asks/write" element={<AsksWrite />} />
        <Route path="/kakao" element={<KakaoRedirect />} />
        <Route path="/social/detail" element={<SocialDetail/>}/>

      {/* 관리자 페이지 */}
        <Route path="/admin" element={<Admin />}>
          <Route path="admininquiry" element={<AdminInquiry/>} />
          <Route path="users" element={<UserManagement/>} />
          <Route path="products" element={<ProductManagement/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App;