import { ReactNode, useState } from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import CartSidebar from "./CartSidebar";
import Footer from "./Footer";

const Layout = ({ children }: { children?: ReactNode }) => {
  const [isCartBarVisible, setCartBarVisible] = useState<boolean>(false);

  const toggleCart = () => {
    setCartBarVisible(!isCartBarVisible);
  };
  return (
    <>
      <Header toggleCart={toggleCart} />
      <CartSidebar
        toggleCart={toggleCart}
        isCartBarVisible={isCartBarVisible}
      />
      <Toaster position="top-center" />{" "}
      <div
        style={{
          width: "100vw",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
