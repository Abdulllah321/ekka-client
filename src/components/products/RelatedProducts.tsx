import { useState } from "react";
import { Product } from "../../utils/types";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }: { products: Product[] }) => {
    const [viewModalProductSlug, setViewModalProductSlug] = useState<
      string | null
    >(null);

    const handleOpenModal = (slug: string) => {
      setViewModalProductSlug(slug);
    };

    const handleCloseModal = () => {
      setViewModalProductSlug(null);
    };
  return (
    <section className="section ec-releted-product section-space-p">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-title">
              <h2 className="ec-bg-title">Related products</h2>
              <h2 className="ec-title">Related products</h2>
              <p className="sub-title">Browse The Collection of Top Products</p>
            </div>
          </div>
        </div>
        <div className="row margin-minus-b-30">
          {/* Related Product Content */}
          {products.map((product) => (
            <ProductCard
              product={product}
              isViewModelOpen={viewModalProductSlug === product.slug}
              onOpenModal={() => handleOpenModal(product.slug)}
              onCloseModal={handleCloseModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
