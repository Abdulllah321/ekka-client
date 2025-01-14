import { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { deleteCoupon, fetchCouponsByStore } from "../../slices/couponSlice";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import NoDataFound from "../common/NoDataFound";
import { AnimatePresence } from "framer-motion"; // Import Framer Motion
import Modal from "../common/Modal";
import Form from "./CouponForm";
import { fetchUserStores } from "../../slices/storeSlice";
import { FaPlus } from "react-icons/fa"; // Import the Plus Icon

const CouponDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const { coupons, error, loading } = useAppSelector((state) => state.coupons);
  const { userStore } = useAppSelector((state) => state.store);
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for adding new coupon
  const [isInfo, setIsInfo] = useState<boolean>(false); // State for showing the info modal

  useEffect(() => {
    if (userStore) {
      dispatch(fetchCouponsByStore(userStore.id));
    } else {
      dispatch(fetchUserStores());
    }
  }, [dispatch, userStore]);

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

  const handleInfoClick = (coupon: any) => {
    setIsEditing(false);
    setIsInfo(true); // Open info modal
    setSelectedCoupon(coupon);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsAdding(false); // Close adding modal
    setIsInfo(false); // Close info modal
    setSelectedCoupon(null);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    setSelectedCoupon(null);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCoupon(id));
      setIsDelete(null);
      toast.success("Coupon Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const handleAddNewCoupon = () => {
    setIsAdding(true);
  };

  return (
    <div className="">
      <div className="ec-coupon-list card card-default">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h5>Coupon List</h5>
            <button
              className="btn btn-primary rounded-circle"
              onClick={handleAddNewCoupon}
              title="Add New Coupon"
            >
              <FaPlus />
            </button>
          </div>
          {coupons.length ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>S. no</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Discount</th>
                    <th>Discount Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon, index) => (
                    <tr key={coupon.id}>
                      <td># {index + 1}</td>
                      <td>{coupon.code}</td>
                      <td>{coupon.description}</td>
                      <td>{coupon.discountAmount}</td>
                      <td>{coupon.discountType}</td>
                      <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
                      <td>{new Date(coupon.endDate).toLocaleDateString()}</td>
                      <td>{coupon.status.toUpperCase()}</td>
                      <td>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => handleInfoClick(coupon)}
                          >
                            Info
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-display="static"
                          >
                            <span className="sr-only">Info</span>
                          </button>
                          <div className="dropdown-menu">
                            <span
                              className="dropdown-item"
                              onClick={() => {
                                setSelectedCoupon(coupon);
                                setIsEditing(true);
                              }}
                            >
                              Edit
                            </span>
                            <span
                              className="dropdown-item"
                              onClick={() => setIsDelete(coupon.id!)}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataFound
              title="No Coupons Found"
              message="It seems like you haven't added any coupons yet. Please add some to get started!"
              buttonText="Add New Coupon"
              buttonLink={() => setIsAdding(true)}
            />
          )}
        </div>
      </div>
      <AnimatePresence>
        {selectedCoupon && isEditing && (
          <Modal title="Edit Coupon" show={isEditing} onClose={closeModal}>
            <Form
              isEditing={true}
              onSubmit={handleUpdate}
              couponData={selectedCoupon}
            />
          </Modal>
        )}
        {isAdding && (
          <Modal title="Add New Coupon" show={isAdding} onClose={closeModal}>
            <Form isEditing={false} onSubmit={handleUpdate} />
          </Modal>
        )}
        {isInfo && selectedCoupon && (
          <Modal title="Coupon Info" show={isInfo} onClose={closeModal}>
            <div className="modal-body">
              <p>
                <strong>Code:</strong> {selectedCoupon.code}
              </p>
              <p>
                <strong>Description:</strong> {selectedCoupon.description}
              </p>
              <p>
                <strong>Discount:</strong> {selectedCoupon.discountAmount}
              </p>
              <p>
                <strong>Discount Type:</strong> {selectedCoupon.discountType}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(selectedCoupon.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(selectedCoupon.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedCoupon.status}
              </p>

              {/* Display the products associated with the coupon */}
              <p>
                <strong>Products:</strong>
                {selectedCoupon.products &&
                selectedCoupon.products.length > 0 ? (
                  <ul>
                    {selectedCoupon.products.map((product: any) => (
                      <>
                        <li
                          key={product.id}
                          className="ml-4"
                          style={{
                            listStyleType: "circle",
                          }}
                        >
                          {product.name}
                        </li>{" "}
                      </>
                    ))}
                  </ul>
                ) : (
                  <span>No products associated with this coupon.</span>
                )}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Modal>
        )}

        {isDelete && (
          <Modal
            title="Delete Coupon"
            show={isDelete !== null}
            onClose={() => setIsDelete(null)}
          >
            <div className="modal-body">
              Are you sure you want to delete this coupon?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(isDelete)}
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CouponDetails;
