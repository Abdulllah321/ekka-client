import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { useParams } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";
import { fetchProductBySlug } from "../slices/productSlice";
import NoDataFound from "../components/common/NoDataFound";
import ProductImageSliders from "../components/products/ProductImageSliders";
import "swiper/css";
import "swiper/css/navigation";
import { getPrice } from "../constants";
import ReviewForm from "../components/products/ProductReviewsForm";
import Reviews from "../components/products/ProductReviews";
import RelatedProducts from "../components/products/RelatedProducts";
import { useAuthenticatedAction } from "../utils/useAuthenticatedAction";
import { addToCart, getCartCount } from "../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../slices/wishlistslice";
import QuickViewModal from "../components/products/QuickViewModal ";
import { AnimatePresence } from "framer-motion";
import { useCurrency } from "../context/CurrencyContext.tsx";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [selected, setSelected] = useState<{
    color: string | null;
    size: null | string;
  }>({
    color: null,
    size: null,
  });
  const { items } = useAppSelector((state) => state.wishlist);
  const { cartItems } = useAppSelector((state) => state.cart);

  const { productDetails, loading, error } = useAppSelector(
    (state) => state.products,
  );
  const wishlist = items.find((item) => item.productId === productDetails?.id);
  const [quantity, setQuantity] = useState<number>(1);
  const [isQuickView, setIsQuickView] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const { execute } = useAuthenticatedAction();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    dispatch(fetchProductBySlug(slug!));
  }, [dispatch, slug]);

  useEffect(() => {
    const productInCart = cartItems.find(
      (item) => item.productId === productDetails?.id!,
    );
    if (productInCart) {
      setIsInCart(true);
      setQuantity(productInCart.quantity);
    } else {
      setIsInCart(false);
    }
  }, [items, productDetails?.id]);

  if (error) toast.error(error);

  if (loading)
    return (
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );

  if (!productDetails)
    return (
      <Layout>
        <NoDataFound title="No Product Found" />
      </Layout>
    );

  const handleCart = async () => {
    execute(async () => {
      const cartItem = {
        productId: productDetails.id,
        quantity,
        selectedColor: null,
        selectedSize: null,
      };

      try {
        if (isInCart) {
          toast.error("Product is already in the cart");
        } else {
          const response = await dispatch(addToCart(cartItem)).unwrap();
          toast.success("Item added to cart");
          if (response) await dispatch(getCartCount()).unwrap();
          setIsInCart(true); // Set to true after adding to cart
        }
      } catch (error) {
        toast.error(error as string);
      }
    });
  };

  const handleWishlist = async () => {
    execute(async () => {
      try {
        if (wishlist) {
          await dispatch(removeFromWishlist(productDetails.id!)).unwrap();
          toast.success("Item removed from wishlist");
        } else {
          await dispatch(addToWishlist(productDetails.id!)).unwrap();
          toast.success("Item added to wishlist");
        }
      } catch (error) {
        toast.error(error as string);
      }
    });
  };

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">{productDetails.name}</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  {/* ec-breadcrumb-list start */}
                  <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="ec-breadcrumb-item active">Products</li>
                  </ul>
                  {/* ec-breadcrumb-list end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="ec-pro-rightside ec-common-rightside col-lg-12 col-md-12">
              {/* Single product content Start */}
              <div className="single-pro-block">
                <div className="single-pro-inner">
                  <div className="row">
                    <div className="single-pro-img single-pro-img-no-sidebar">
                      <ProductImageSliders productDetails={productDetails} />
                    </div>
                    <div className="single-pro-desc single-pro-desc-no-sidebar">
                      <div className="single-pro-content">
                        <h5 className="ec-single-title">
                          {productDetails.name}
                        </h5>
                        <div className="ec-single-rating-wrap">
                          {productDetails.rating ? (
                            <div className="ec-single-rating">
                              {Array.from({ length: 5 }, (_, index) => (
                                <i
                                  key={index}
                                  className={`ecicon ${
                                    index < productDetails.rating
                                      ? "eci-star fill"
                                      : "eci-star-o"
                                  }`}
                                />
                              ))}{" "}
                              ({productDetails.rating})
                            </div>
                          ) : (
                            <span className="ec-read-review">
                              <a href="#ec-spt-nav-review">
                                Be the first to review this product
                              </a>
                            </span>
                          )}
                        </div>
                        <div className="ec-single-desc">
                          {productDetails.shortDesc}
                        </div>

                        <div className="ec-single-price-stoke">
                          <div className="ec-single-price">
                            <span className="ec-single-ps-title">
                              As low as
                            </span>
                            <div className="d-flex align-items-end gap-2">
                              <span
                                className="old-price "
                                style={{ textDecoration: "line-through" }}
                              >
                                {formatPrice(productDetails.price)}
                              </span>
                              <span className="new-price">
                                {formatPrice(
                                  getPrice(productDetails) as number,
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="ec-single-stoke">
                            <span className="ec-single-ps-title">
                              {productDetails.stockStatus === "inStock" ? (
                                <span
                                  style={{
                                    color: "green",
                                  }}
                                >
                                  In stock
                                </span>
                              ) : productDetails.stockStatus ===
                                "limitedStock" ? (
                                <span
                                  style={{
                                    color: "yellow",
                                  }}
                                >
                                  Limited Stock
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Out of stock
                                </span>
                              )}
                            </span>
                            <span className="ec-single-sku">
                              Stock {productDetails.stockQuantity}
                            </span>
                          </div>
                        </div>
                        <div className="ec-pro-variation">
                          <div className="ec-pro-variation-inner ec-pro-variation-size">
                            <span>SIZE</span>
                            <div className="ec-pro-variation-content">
                              <ul>
                                {productDetails?.sizes?.map((size, index) => (
                                  <li
                                    key={index}
                                    className={
                                      selected.size === size ? "active" : ""
                                    }
                                    onClick={() =>
                                      setSelected({ ...selected, size })
                                    }
                                  >
                                    <span>{size}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="ec-pro-variation-inner ec-pro-variation-color">
                            <span>Color</span>
                            <div className="ec-pro-variation-content">
                              <ul>
                                <ul>
                                  {productDetails?.colors?.map(
                                    (color, index) => (
                                      <li
                                        key={index}
                                        className={
                                          selected.color === color
                                            ? "active"
                                            : ""
                                        }
                                        onClick={() =>
                                          setSelected({
                                            ...selected,
                                            color,
                                          })
                                        }
                                      >
                                        <span
                                          style={{ backgroundColor: color }}
                                        />{" "}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="ec-single-qty">
                          <div className="qty-plus-minus">
                            <input
                              className="qty-input"
                              type="text"
                              name="ec_qtybtn"
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Number(e.target.value))
                              }
                              disabled={isInCart} // Disable input if product is in cart
                            />
                          </div>
                          <div className="ec-single-cart">
                            <button
                              className="btn btn-primary"
                              onClick={handleCart}
                              disabled={isInCart}
                            >
                              {isInCart ? "Already in Cart" : "Add to Cart"}
                            </button>
                          </div>
                          <div
                            className="ec-single-wishlist "
                            onClick={handleWishlist}
                          >
                            <a
                              className={`ec-btn-group wishlist ${
                                wishlist ? "active" : ""
                              }`}
                              style={{
                                color: wishlist ? "#fff" : "#000",
                                background: wishlist ? "#3474D4" : "#fff",
                              }}
                              title="Wishlist"
                            >
                              <i className="fi-rr-heart" />
                            </a>
                          </div>
                          <div
                            className="ec-single-quickview"
                            onClick={() => setIsQuickView(true)}
                          >
                            <a
                              href="#"
                              className="ec-btn-group quickview"
                              data-link-action="quickview"
                              title="Quick view"
                              data-bs-toggle="modal"
                              data-bs-target="#ec_quickview_modal"
                            >
                              <i className="fi-rr-eye" />
                            </a>
                          </div>
                        </div>
                        <div className="ec-single-social">
                          <ul className="mb-0">
                            {/* TODO: These social media will be dynamic by the vendor profile */}
                            <li className="list-inline-item facebook">
                              <a href="#">
                                <i className="ecicon eci-facebook" />
                              </a>
                            </li>
                            <li className="list-inline-item twitter">
                              <a href="#">
                                <i className="ecicon eci-twitter" />
                              </a>
                            </li>
                            <li className="list-inline-item instagram">
                              <a href="#">
                                <i className="ecicon eci-instagram" />
                              </a>
                            </li>
                            <li className="list-inline-item youtube-play">
                              <a href="#">
                                <i className="ecicon eci-youtube-play" />
                              </a>
                            </li>
                            <li className="list-inline-item behance">
                              <a href="#">
                                <i className="ecicon eci-behance" />
                              </a>
                            </li>
                            <li className="list-inline-item whatsapp">
                              <a href="#">
                                <i className="ecicon eci-whatsapp" />
                              </a>
                            </li>
                            <li className="list-inline-item plus">
                              <a href="#">
                                <i className="ecicon eci-plus" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*Single product content End */}
              {/* Single product tab start */}
              <div className="ec-single-pro-tab">
                <div className="ec-single-pro-tab-wrapper">
                  <div className="ec-single-pro-tab-nav">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#ec-spt-nav-details"
                          role="tab"
                          aria-controls="ec-spt-nav-details"
                          aria-selected="true"
                        >
                          Detail
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#ec-spt-nav-info"
                          role="tab"
                          aria-controls="ec-spt-nav-info"
                          aria-selected="false"
                        >
                          More Information
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#ec-spt-nav-review"
                          role="tab"
                          aria-controls="ec-spt-nav-review"
                          aria-selected="false"
                        >
                          Reviews
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content  ec-single-pro-tab-content">
                    <div
                      id="ec-spt-nav-details"
                      className="tab-pane fade show active"
                    >
                      <div className="ec-single-pro-tab-desc">
                        <p>
                          {productDetails.description ||
                            "No description available."}
                        </p>
                        <ul>
                          <li>
                            {productDetails.shortDesc ||
                              "No additional details provided."}
                          </li>
                          {productDetails?.sizes?.length > 0 && (
                            <li>
                              Available Sizes: {productDetails.sizes.join(", ")}
                            </li>
                          )}
                          {productDetails?.colors?.length > 0 && (
                            <li>
                              Available Colors:{" "}
                              {productDetails?.colors?.map((color, index) => (
                                <span
                                  key={index}
                                  style={{
                                    display: "inline-block",
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: color,
                                    border: "1px solid #ccc",
                                    marginLeft: "5px",
                                  }}
                                ></span>
                              ))}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Info Tab */}
                    <div id="ec-spt-nav-info" className="tab-pane fade">
                      <div className="ec-single-pro-tab-moreinfo">
                        <ul>
                          <li>
                            <span>Weight: </span>
                            {productDetails.weight || "Not specified"}
                          </li>
                          <li>
                            <span>Dimensions: </span>
                            {productDetails.dimensions || "Not specified"}
                          </li>
                          <li>
                            <span>Colors: </span>
                            {productDetails?.colors?.length > 0
                              ? productDetails?.colors?.join(", ")
                              : "Not specified"}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id="ec-spt-nav-review" className="tab-pane fade">
                      <div className="row">
                        <div className="ec-t-review-wrapper">
                          <Reviews reviews={productDetails?.reviews!} />
                        </div>
                        <ReviewForm productId={productDetails.id!} id={slug!} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* product details description area end */}
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts products={productDetails.relatedProducts!} />

      <AnimatePresence>
        <QuickViewModal
          product={productDetails}
          isOpen={isQuickView}
          onClose={() => setIsQuickView(false)}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleCart}
          isProductInCart={isInCart}
        />
      </AnimatePresence>
    </Layout>
  );
};

export default ProductDetailPage;
