import { useEffect } from "react";
import Layout from "../components/common/Layout";
import HeroSection from "../components/Home/HeroSection";
import ProductTabs from "../components/Home/ProductTabs";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import BannerSection from "../components/Home/BannerSection";
import CategorySection from "../components/Home/CategorySection";
import TopVendorSection from "../components/Home/TopVendorSection";
import ServicesSection from "../components/Home/ServicesSection";
import OfferSection from "../components/Home/OfferSection";
import NewArrivalsSection from "../components/Home/NewArrivalSection";
import TestimonialSection from "../components/Home/TestimonialSection";
import BrandSection from "../components/Home/BrandSection";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <Layout>
      <HeroSection />
      <ProductTabs />
      <BannerSection />
      <CategorySection />
      <TopVendorSection />
      <ServicesSection />
      <OfferSection />
      <NewArrivalsSection />
      <TestimonialSection />
      <BrandSection />
    </Layout>
  );
};

export default HomePage;
