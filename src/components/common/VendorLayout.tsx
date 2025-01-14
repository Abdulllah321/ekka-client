import  { ReactNode } from "react";
import Layout from "./Layout";
import Breadcrumbs from "./BreadCrumbs";
import VendorSidebar from "../store/VendorSidebar";

const VendorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <Breadcrumbs />
      <section className="ec-page-content ec-vendor-dashboard section-space-p">
        <div className="container">
          <div className="row">
            {/* Sidebar Area Start */}
            {<VendorSidebar />}
            <div className="ec-shop-rightside col-lg-9 col-md-12">
              {children}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VendorLayout;
