import VendorLayout from "../../components/common/VendorLayout";
import ProductList from "../../components/store/VendorProductList";
import { useAppSelector } from "../../store";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

const VendorProductListPage = () => {
  const { userStore, loading } = useAppSelector((state) => state.store);
  const navigate = useNavigate();
  if (loading) return <Loader />;
  return (
    <VendorLayout>
      <h1>Vendor Product List</h1>
      <ProductList
        products={userStore?.products!}
        onAddProduct={() => navigate("/product-form")}
      />
    </VendorLayout>
  );
};

export default VendorProductListPage;
