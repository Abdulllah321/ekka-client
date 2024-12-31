import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import {  useParams } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";
import { fetchProductBySlug } from "../slices/productSlice";
import NoDataFound from "../components/common/NoDataFound";
import ProductImageSliders from "../components/products/ProductImageSliders";
import "swiper/css";
import "swiper/css/navigation";
import { CURRENCY, getPrice } from "../constants";

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

  const { productDetails, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductBySlug(slug!));
  }, [dispatch]);

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
                              ))}
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
                                {CURRENCY + productDetails.price}
                              </span>
                              <span className="new-price">
                                {CURRENCY + getPrice(productDetails)}
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
                                {productDetails.sizes.map((size, index) => (
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
                                  {productDetails.colors.map((color, index) => (
                                    <li
                                      key={index}
                                      className={
                                        selected.color === color ? "active" : ""
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
                                  ))}
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
                              defaultValue={1}
                            />
                          </div>
                          <div className="ec-single-cart ">
                            <button className="btn btn-primary">
                              Add To Cart
                            </button>
                          </div>
                          <div className="ec-single-wishlist">
                            <a
                              className="ec-btn-group wishlist"
                              title="Wishlist"
                            >
                              <i className="fi-rr-heart" />
                            </a>
                          </div>
                          <div className="ec-single-quickview">
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
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
                        </p>
                        <ul>
                          <li>
                            Any Product types that You want - Simple,
                            Configurable
                          </li>
                          <li>
                            Downloadable/Digital Products, Virtual Products
                          </li>
                          <li>Inventory Management with Backordered items</li>
                          <li>Flatlock seams throughout.</li>
                        </ul>
                      </div>
                    </div>
                    <div id="ec-spt-nav-info" className="tab-pane fade">
                      <div className="ec-single-pro-tab-moreinfo">
                        <ul>
                          <li>
                            <span>Weight</span> 1000 g
                          </li>
                          <li>
                            <span>Dimensions</span> 35 × 30 × 7 cm
                          </li>
                          <li>
                            <span>Color</span> Black, Pink, Red, White
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id="ec-spt-nav-review" className="tab-pane fade">
                      <div className="row">
                        <div className="ec-t-review-wrapper">
                          <div className="ec-t-review-item">
                            <div className="ec-t-review-avtar">
                              <img
                                src="assets/images/review-image/1.jpg"
                                alt=""
                              />
                            </div>
                            <div className="ec-t-review-content">
                              <div className="ec-t-review-top">
                                <div className="ec-t-review-name">Jeny Doe</div>
                                <div className="ec-t-review-rating">
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star-o" />
                                </div>
                              </div>
                              <div className="ec-t-review-bottom">
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="ec-t-review-item">
                            <div className="ec-t-review-avtar">
                              <img
                                src="assets/images/review-image/2.jpg"
                                alt=""
                              />
                            </div>
                            <div className="ec-t-review-content">
                              <div className="ec-t-review-top">
                                <div className="ec-t-review-name">
                                  Linda Morgus
                                </div>
                                <div className="ec-t-review-rating">
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star-o" />
                                  <i className="ecicon eci-star-o" />
                                </div>
                              </div>
                              <div className="ec-t-review-bottom">
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ec-ratting-content">
                          <h3>Add a Review</h3>
                          <div className="ec-ratting-form">
                            <form action="#">
                              <div className="ec-ratting-star">
                                <span>Your rating:</span>
                                <div className="ec-t-review-rating">
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star fill" />
                                  <i className="ecicon eci-star-o" />
                                  <i className="ecicon eci-star-o" />
                                  <i className="ecicon eci-star-o" />
                                </div>
                              </div>
                              <div className="ec-ratting-input">
                                <input
                                  name="your-name"
                                  placeholder="Name"
                                  type="text"
                                />
                              </div>
                              <div className="ec-ratting-input">
                                <input
                                  name="your-email"
                                  placeholder="Email*"
                                  type="email"
                                  required
                                />
                              </div>
                              <div className="ec-ratting-input form-submit">
                                <textarea
                                  name="your-commemt"
                                  placeholder="Enter Your Comment"
                                  defaultValue={""}
                                />
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                  value="Submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
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
    </Layout>
  );
};

export default ProductDetailPage;
