import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import Loader from "../common/Loader";
import { getImageUrl } from "../../constants";

const VendorSidebar = () => {
  const { userStore, loading } = useAppSelector((state) => state.store);
  if (loading) return <Loader />;

  return (
    <div className="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
      <div className="ec-sidebar-wrap ec-border-box">
        {/* Sidebar Category Block */}
        <div className="ec-sidebar-block">
          <div className="ec-vendor-block">
            <img
              className="ec-vendor-block-bg"
              src={
                getImageUrl(userStore?.bannerImage!) ||
                "/assets/images/banner/7.jpg"
              }
            />
            <div className="ec-vendor-block-detail text-center">
              <img
                className="v-img rounded-circle mb-3"
                src={getImageUrl(userStore?.logo!)}
                alt="Vendor"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                }}
              />
              <h5 className="font-weight-bold">{userStore?.name}</h5>
            </div>
            <div className="ec-vendor-block-items">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/vendor/dashboard" className="text-decoration-none">
                    Dashboard
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/vendor/profile" className="text-decoration-none">
                    Store Profile
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/vendor/products" className="text-decoration-none">
                    Vendor Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/vendor/orders" className="text-decoration-none">
                    Vendor Orders
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/vendor/policies" className="text-decoration-none">
                    Store Policies
                  </Link>
                </li>

                <li className="mb-2">
                  <Link to="/vendor/coupons" className="text-decoration-none">
                    Products Coupons
                  </Link>
                </li>

                {/* <li className="mb-2">
                  <Link to="/vendor/settings" className="text-decoration-none">
                    Settings (Edit)
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
