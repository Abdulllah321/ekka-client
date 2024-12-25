import clothesIcon from "../../assets/images/icons/cat_1.png";
import clothesIconHover from "../../assets/images/icons/cat_1_1.png";
import watchesIcon from "../../assets/images/icons/cat_2.png";
import watchesIconHover from "../../assets/images/icons/cat_2_1.png";
import bagsIcon from "../../assets/images/icons/cat_3.png";
import bagsIconHover from "../../assets/images/icons/cat_3_1.png";
import shoesIcon from "../../assets/images/icons/cat_4.png";
import shoesIconHover from "../../assets/images/icons/cat_4_1.png";
import catBanner1 from "../../assets/images/cat-banner/1.jpg";
import catBanner2 from "../../assets/images/cat-banner/2.jpg";
import catBanner3 from "../../assets/images/cat-banner/3.jpg";
import catBanner4 from "../../assets/images/cat-banner/4.jpg";

const categories = [
  {
    id: "tab-cat-1",
    icon: clothesIcon,
    iconHover: clothesIconHover,
    title: "Clothes",
    products: 440,
    banner: catBanner1,
  },
  {
    id: "tab-cat-2",
    icon: watchesIcon,
    iconHover: watchesIconHover,
    title: "Watches",
    products: 510,
    banner: catBanner2,
  },
  {
    id: "tab-cat-3",
    icon: bagsIcon,
    iconHover: bagsIconHover,
    title: "Bags",
    products: 620,
    banner: catBanner3,
  },
  {
    id: "tab-cat-4",
    icon: shoesIcon,
    iconHover: shoesIconHover,
    title: "Shoes",
    products: 320,
    banner: catBanner4,
  },
];

const CategorySection = () => {
  return (
    <section className="section ec-category-section section-space-p" id="categories">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-title">
              <h2 className="ec-bg-title">Our Top Collection</h2>
              <h2 className="ec-title">Top Categories</h2>
              <p className="sub-title">Browse The Collection of Top Categories</p>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Category Navigation */}
          <div className="col-lg-3">
            <ul className="ec-cat-tab-nav nav">
              {categories.map((cat) => (
                <li key={cat.id} className="cat-item">
                  <a className={`cat-link ${cat.id === "tab-cat-1" ? "active" : ""}`} data-bs-toggle="tab" href={`#${cat.id}`}>
                    <div className="cat-icons">
                      <img className="cat-icon" src={cat.icon} alt={`${cat.title} icon`} />
                      <img className="cat-icon-hover" src={cat.iconHover} alt={`${cat.title} hover icon`} />
                    </div>
                    <div className="cat-desc">
                      <span>{cat.title}</span>
                      <span>{cat.products} Products</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Category Content */}
          <div className="col-lg-9">
            <div className="tab-content">
              {categories.map((cat) => (
                <div key={cat.id} className={`tab-pane fade ${cat.id === "tab-cat-1" ? "show active" : ""}`} id={cat.id}>
                  <div className="row">
                    <img src={cat.banner} alt={`${cat.title} banner`} />
                  </div>
                  <span className="panel-overlay">
                    <a href="shop-left-sidebar-col-3.html" className="btn btn-primary">
                      View All
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
