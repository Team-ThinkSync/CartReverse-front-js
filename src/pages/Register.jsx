import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";


const Register = () => {
  return (
    <div>
      <Header />
      <div id="wrap" className="mx-auto h-[1800px] bg-gray-100">
        <RegisterForm />
      </div>

      <Footer />
    </div>
  )
}

export default Register;