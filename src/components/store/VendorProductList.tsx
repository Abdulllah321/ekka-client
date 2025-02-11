import React, { useState } from "react";
import { Product } from "../../utils/types";
import { getImageUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import { useAppDispatch } from "../../store";
import { deleteProduct } from "../../slices/productSlice";
import toast from "react-hot-toast";
import { fetchUserStores } from "../../slices/storeSlice";
import { useCurrency } from "../../context/CurrencyContext.tsx";

interface ProductListProps {
  products: Product[];
  onViewAll?: () => void; // Callback for "View All" button
  onAddProduct: () => void; // Callback for "Add" button
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onViewAll,
  onAddProduct,
}) => {
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState<Product | null>(null); // Store the product to delete
  const dispatch = useAppDispatch();
  const { formatPrice } = useCurrency();

  const handleDelete = async () => {
    if (isDelete) {
      try {
        await dispatch(deleteProduct(isDelete.id!));
        setIsDelete(null);
        toast.success("Product deleted successfully");
        await dispatch(fetchUserStores());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="ec-vendor-dashboard-card space-bottom-30">
      <div className="ec-vendor-card-header">
        <h5>Product List</h5>
        <div className="ec-header-btn">
          {onViewAll && (
            <button className="btn btn-lg btn-primary" onClick={onViewAll}>
              View All
            </button>
          )}
          <button className="btn btn-lg btn-primary" onClick={onAddProduct}>
            Add
          </button>
        </div>
      </div>
      <div className="ec-vendor-card-body">
        <div className="ec-vendor-card-table">
          <table className="table ec-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 ? (
                products?.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">
                      <span>{product.id}</span>
                    </th>
                    <td>
                      <img
                        className="prod-img"
                        src={getImageUrl(product.thumbnail)}
                        alt={product.name}
                      />
                    </td>
                    <td>
                      <span>{product.name}</span>
                    </td>
                    <td>
                      <span>{formatPrice(product.price.toFixed(2))}</span>
                    </td>
                    <td>
                      <span className={``}>
                        {product.status.charAt(0).toUpperCase() +
                          product.status.slice(1)}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          navigate(`/product-form/${product.slug}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => setIsDelete(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      {isDelete && (
        <Modal
          onClose={() => setIsDelete(null)}
          show={!!isDelete}
          title={`Delete "${isDelete.name}"?`}
          saveButtonText="Delete"
          onSave={handleDelete}
          type="danger"
        />
      )}
    </div>
  );
};

export default ProductList;
