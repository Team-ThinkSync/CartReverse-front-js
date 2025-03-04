import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm2 from "../components/LoginForm2";


const Login = () => {


  return (
    <>
      <Header />
      <div id="wrap" className="mx-auto h-[850px] bg-gray-100">
        <LoginForm2 />
      </div>
      <Footer />
    </>
  )
}

export default Login;