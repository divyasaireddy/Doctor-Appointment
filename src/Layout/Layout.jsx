import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Routers from "../Routes/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}> {/* Ensure content fills space */}
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
