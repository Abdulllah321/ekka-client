import {  useAppSelector } from "../../store";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router";
import ProductCard from "../products/ProductCard";

const ProductTabs = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  // const [quickView, setQuickView] = useState<string>("");

  if (error) toast.error(error);

  if (loading) return <Loader />;

  if (!products.length) return null;

  const uniqueCategories = [
    "All",
    ...new Set(
      products
        .map((product) => product?.mainCategory?.name)
        .filter((name) => name)
    ),
  ];
  const transformCategoryName = (name: string) => {
    return name.replace(/\s+/g, "_").toLowerCase();
  };
  return (
    <section className="section ec-product-tab section-space-p" id="collection">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-title">
              <h2 className="ec-bg-title">Our Top Collection</h2>
              <h2 className="ec-title">Our Top Collection</h2>
              <p className="sub-title">Browse The Collection of Top Products</p>
            </div>
          </div>
          {/* Tab Start */}
          <div className="col-md-12 text-center">
            <ul className="ec-pro-tab-nav justify-content-center">
              {uniqueCategories.map((cat) => (
                <li
                  key={cat}
                  className="nav-item"
                  onClick={() =>
                    setSelectedCategory(transformCategoryName(cat!))
                  }
                >
                  <a
                    className={`nav-link ${
                      selectedCategory === transformCategoryName(cat!)
                        ? "active"
                        : ""
                    }`}
                    data-bs-toggle="tab"
                    href={`#${transformCategoryName(cat!)}`} // Use transformed category name
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Tab End */}
        </div>
        <div className="row">
          <div className="col">
            <div className="tab-content">
              {/* 1st Product tab start */}
              <div className="tab-pane fade show active" id={selectedCategory}>
                <div className="row">
                  {/* Product Content */}
                  {products.map((product) => (
                    <ProductCard
                      product={product}
                      key={product.id}
                      isListView={false}
                    />
                  ))}

                  <div className="col-sm-12 shop-all-btn">
                    <Link to="/shop">Shop All Collection</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
