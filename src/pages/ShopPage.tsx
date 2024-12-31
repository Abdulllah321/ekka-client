import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import Breadcrumbs from "../components/shop/Breadcrumbs";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import ProductCard from "../components/products/ProductCard";
import { fetchMainCategories } from "../slices/categorySlice";
import { useSearchParams } from "react-router";
import { ITEMS_PER_PAGE } from "../constants";
import Pagination from "../components/common/Pagination";
import NoDataFound from "../components/common/NoDataFound";

const ShopPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isListView, setIsListView] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortCriteria, setSortCriteria] = useState<string>("Relevance");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const { products } = useAppSelector((state) => state.products);
  const { mainCategories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchMainCategories());
  }, [dispatch]);

  useEffect(() => {
    setSearchParams(selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    const dynamicFilters: Record<string, string[]> = {};

    searchParams.forEach((value, key) => {
      if (!dynamicFilters[key]) {
        dynamicFilters[key] = [];
      }
      dynamicFilters[key].push(value);
    });

    setSelectedFilters(dynamicFilters);
  }, [searchParams]);

  useEffect(() => {
    // Filter products based on selected filters
    let filtered = products;

    Object.keys(selectedFilters).forEach((category) => {
      const selectedSubcategories = selectedFilters[category];
      if (selectedSubcategories.length > 0) {
        filtered = filtered.filter(
          (product) =>
            product.subCategoryId &&
            selectedSubcategories.includes(product.subCategoryId)
        );
      }
    });

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSizes.some((size) => product.sizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.some((color) => product.colors.includes(color))
      );
    }

    // Sort products based on selected criteria
    if (sortCriteria === "Price, low to high") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === "Price, high to low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortCriteria === "Name, A to Z") {
      filtered = filtered.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
    } else if (sortCriteria === "Name, Z to A") {
      filtered = filtered.sort((a, b) =>
        b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedFilters, sortCriteria, selectedSizes, selectedColors]);

  const handleFilterChange = (category: string, subcategoryId: string) => {
    setSelectedFilters((prevFilters) => {
      const categoryFilters = prevFilters[category] || [];
      if (categoryFilters.includes(subcategoryId)) {
        return {
          ...prevFilters,
          [category]: categoryFilters.filter((id) => id !== subcategoryId),
        };
      } else {
        return {
          ...prevFilters,
          [category]: [...categoryFilters, subcategoryId],
        };
      }
    });
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSize = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  const handleColor = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((s) => s !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  return (
    <Layout>
      <Breadcrumbs />
      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="ec-shop-rightside col-lg-9 order-lg-last col-md-12 order-md-first margin-b-30">
              {/* Shop Top Start */}
              <div className="ec-pro-list-top d-flex">
                <div className="col-md-6 ec-grid-list">
                  <div className="ec-gl-btn">
                    <button
                      className={`btn btn-grid ${isListView ? "" : "active"}`}
                      onClick={() => setIsListView(false)}
                    >
                      <i className="fi-rr-apps" />
                    </button>
                    <button
                      className={`btn btn-list ${isListView ? "active" : ""}`}
                      onClick={() => setIsListView(true)}
                    >
                      <i className="fi-rr-list" />
                    </button>
                  </div>
                </div>
                <div className="col-md-6 ec-sort-select">
                  <span className="sort-by">Sort by</span>
                  <div className="ec-select-inner">
                    <select
                      name="ec-select"
                      id="ec-select"
                      onChange={handleSort}
                    >
                      <option disabled>Position</option>
                      <option value="Relevance">Relevance</option>
                      <option value="Name, A to Z">Name, A to Z</option>
                      <option value="Name, Z to A">Name, Z to A</option>
                      <option value="Price, low to high">
                        Price, low to high
                      </option>
                      <option value="Price, high to low">
                        Price, high to low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Shop Top End */}
              {/* Shop content Start */}
              <div className={`shop-pro-content `}>
                <div
                  className={`shop-pro-inner ${isListView ? "list-view" : ""}`}
                >
                  {paginatedProducts.length ? (
                    <div className="row">
                      {paginatedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isListView={isListView}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <NoDataFound
                        title="No Product Found"
                        message="No Product found for this filtration"
                      />
                    </div>
                  )}
                </div>
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
              {/*Shop content End */}
            </div>
            {/* Sidebar Area Start */}
            <div className="ec-shop-leftside col-lg-3 order-lg-first col-md-12 order-md-last">
              <div id="shop_sidebar">
                <div className="ec-sidebar-heading">
                  <h1>Filter Products By</h1>
                </div>
                <div className="ec-sidebar-wrap">
                  {/* Sidebar Category Block */}
                  <div className="ec-sidebar-block">
                    <div className="ec-sb-title">
                      <h3 className="ec-sidebar-title">Category</h3>
                    </div>
                    <div className="ec-sb-block-content">
                      <ul>
                        {mainCategories.map((category) => (
                          <li key={category.id}>
                            <div className="ec-sidebar-block-item">
                              <p
                                style={{
                                  color: "black",
                                  fontSize: "1.2rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {category.name}
                              </p>

                              <ul
                                style={{
                                  marginLeft: "10px",
                                }}
                              >
                                {category.subCategories.map((subcategory) => (
                                  <li key={subcategory.id}>
                                    <div className="ec-sidebar-block-item">
                                      <input
                                        type="checkbox"
                                        name={subcategory.id}
                                        id={subcategory.id}
                                        checked={selectedFilters[
                                          category.slug!
                                        ]?.includes(subcategory.id!)}
                                        onChange={() =>
                                          handleFilterChange(
                                            category.slug!,
                                            subcategory.id!
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={subcategory.id}
                                        className="ml-5 "
                                        style={{ cursor: "pointer" }}
                                      >
                                        {subcategory.name}
                                      </label>
                                      <span className="checked" />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="ec-sidebar-block">
                    <div className="ec-sb-title">
                      <h3 className="ec-sidebar-title">Sizes</h3>
                    </div>
                    <div className="ec-sb-block-content">
                      <ul style={{ marginTop: "30px" }}>
                        {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map(
                          (size) => (
                            <li>
                              <div className="ec-sidebar-block-item">
                                <input
                                  type="checkbox"
                                  name={size}
                                  id={size}
                                  checked={selectedSizes.includes(size)}
                                  onChange={() => handleSize(size)}
                                />
                                <label
                                  htmlFor={size}
                                  className="ml-5 "
                                  style={{ cursor: "pointer" }}
                                >
                                  {size}
                                </label>
                                <span className="checked" />
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="ec-sidebar-block">
                      <div className="ec-sb-title">
                        <h3 className="ec-sidebar-title">Colors</h3>
                      </div>
                      <div className="ec-sb-block-content">
                        <ul style={{ marginTop: "30px" }}>
                          {[
                            ...new Set(
                              products.flatMap((product) => product.colors)
                            ),
                          ].map((color) => (
                            <li key={color}>
                              <div className="ec-sidebar-block-item">
                                <input
                                  type="checkbox"
                                  name={color}
                                  id={color}
                                  checked={selectedSizes.includes(color)}
                                  onChange={() => handleColor(color)}
                                />
                                <label
                                  htmlFor={color}
                                  className="ml-5"
                                  style={{ cursor: "pointer" }}
                                >
                                  {color}
                                </label>
                                <span className="checked" />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShopPage;
