import Layout from "../components/common/Layout";
import { useAppSelector } from "../store";
import ProductCard from "../components/products/ProductCard";
import Loader from "../components/common/Loader";
import NotFound from "../components/common/NoDataFound";

const WishListPage = () => {
  const { items, loading } = useAppSelector((state) => state.wishlist);

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  console.log(items)
  if (items.length === 0) {
    return (
      <Layout>
        <NotFound
          title="Wishlist Empty"
          message="No items found in your wishlist."
          buttonLink="/shop"
          buttonText="Shop"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">Wishlist</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  {/* ec-breadcrumb-list start */}
                  <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="ec-breadcrumb-item active">Wishlist</li>
                  </ul>
                  {/* ec-breadcrumb-list end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {items.map((item) => (
        <section className="ec-page-content section-space-p">
          <div className="container">
            <div className="row">
              {/* Compare Content Start */}
              <div className="ec-wish-rightside col-lg-12 col-md-12">
                {/* Compare content Start */}
                <div className="ec-compare-content">
                  <div className="ec-compare-inner">
                    <div className="row margin-minus-b-30">
                      <ProductCard
                        key={item.id}
                        isListView={false}
                        product={item.product}
                        isWishlist={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default WishListPage;
