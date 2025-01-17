import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { AppDispatch, useAppSelector } from "../store";
import Loader from "../components/common/Loader";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/common/Modal"; // Assume a Modal component exists
import { useDispatch } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
  updateUserDetails,
} from "../slices/userSlice";
import { getImageUrl } from "../constants";
import { AnimatePresence } from "framer-motion";
import AddressDetails from "../components/checkout/AddressDetails";
import AddressForm from "../components/checkout/AddressForm";
import toast from "react-hot-toast";
import { Address, AddressType, User, UserRole } from "../utils/types";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    userDetails: user,
    loading,
    addresses,
  } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    role: user.role || UserRole.customer,
    profileImage: user?.profileImage || "",
    coverPhoto: user?.coverPhoto || "",
  });

  const [addressModal, setAddressModal] = useState<boolean | Address | null>(
    false
  );
  const [address, setAddress] = useState<Address>({
    addressType: AddressType.BILLING,
    city: "",
    country: "",
    postalCode: "",
    state: "",
    street: "",
    firstName: "",
    lastName: "",
  });
  const [isDelete, setIsDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress!,
      [name]: value,
    }));
  };

  const handleSaveAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof addressModal === "boolean") {
        await dispatch(addAddress(address)).unwrap();
        toast.success("Address added Successfully");
        setAddressModal(false);
      } else {
        await dispatch(
          updateAddress({ addressId: addressModal?.id!, address })
        ).unwrap();
        toast.success("Address updated successfully");
        setAddressModal(null);
      }
    } catch (error) {
      toast.error("Failed to add address.");
    }
  };

  const handleSaveChanges = () => {
    dispatch(updateUserDetails(editForm)); // Dispatch the update action
    setIsEditing(false);
  };

  if (loading) {
    return <Loader />;
  }

  const handleDeleteAddress = async (id: string) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
      toast.success("Address removed from wishlist");
    } catch (error) {}
  };

  const handleFileChange = async (file: File, fileName: string) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.filePath) {
        setEditForm((prev) => ({
          ...prev,
          [fileName]: response.data.filePath,
        }));
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <Layout>
      <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">User Profile</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  {/* ec-breadcrumb-list start */}
                  <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="ec-breadcrumb-item active">User Profile</li>
                  </ul>
                  {/* ec-breadcrumb-list end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            {<ProfileSidebar />}

            {/* Profile Information */}
            <div className="ec-shop-rightside col-lg-9 col-md-12">
              <div className="ec-vendor-dashboard-card ec-vendor-setting-card">
                <div className="ec-vendor-card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="ec-vendor-block-profile">
                        <div className="ec-vendor-block-img space-bottom-30">
                          <div className="ec-vendor-block-bg">
                            <img
                              className="v-img"
                              src={
                                getImageUrl(user?.coverPhoto!) ||
                                "assets/images/user/1.jpg"
                              }
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1,
                              }}
                              alt="user profile"
                            />
                            <button
                              className="btn btn-lg btn-primary"
                              onClick={handleEditClick}
                              style={{
                                position: "relative",
                                top: "0",
                                right: "0",
                                zIndex: 2,
                                borderBottomRightRadius: "10px",
                              }}
                            >
                              Edit Detail
                            </button>
                          </div>
                          <div
                            className="ec-vendor-block-detail"
                            style={{
                              position: "relative",
                              zIndex: 5,
                            }}
                          >
                            <img
                              className="v-img"
                              src={
                                getImageUrl(user?.profileImage!) ||
                                "assets/images/user/1.jpg"
                              }
                              alt="user profile"
                            />
                            <h5 className="name">
                              {user?.firstName} {user?.lastName}
                            </h5>
                            <p>({user?.role})</p>
                          </div>
                          <p>
                            Hello{" "}
                            <span>
                              {user?.firstName} {user?.lastName}!
                            </span>
                          </p>
                          <p>
                            From your account, you can easily view and track
                            orders. You can manage and change your account
                            information like address, contact information, and
                            history of orders.
                          </p>
                        </div>
                        <h5>Account Information</h5>
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                              <h6>E-mail address</h6>
                              <ul>
                                <li>
                                  <strong>Email : </strong>
                                  {user?.email}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="ec-vendor-detail-block ec-vendor-block-contact space-bottom-30">
                              <h6>Contact number</h6>
                              <ul>
                                {user?.phoneNumber ? (
                                  <li>
                                    <strong>Phone Number : </strong>
                                    {user?.phoneNumber}
                                  </li>
                                ) : (
                                  <li>No phone number provided</li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="col-12 ">
                            <div className="ec-vendor-detail-block ec-vendor-block-address mar-b-30">
                              <h6
                                style={{
                                  alignItems: "center",
                                }}
                              >
                                Address
                                <button
                                  className="btn btn-primary"
                                  onClick={() => setAddressModal(true)}
                                >
                                  Add New Address
                                </button>
                              </h6>

                              <ul>
                                {addresses.length > 0 ? (
                                  addresses.map((add) => (
                                    <AddressDetails
                                      key={add.id}
                                      id={add.id!}
                                      addressType={add.addressType}
                                      city={add.city}
                                      country={add.country}
                                      postalCode={add.postalCode}
                                      state={add.state}
                                      street={add.street}
                                      firstName={add.firstName}
                                      lastName={add.lastName}
                                      onEdit={() => setAddressModal(add)}
                                      onDelete={() => setIsDelete(add.id!)}
                                    />
                                  ))
                                ) : (
                                  <li>No addresses available</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <Modal
            show={isEditing}
            title="Edit Profile"
            onClose={() => setIsEditing(false)}
            onSave={handleSaveChanges}
            id="edit_modal"
          >
            <div className="row">
              <div className="ec-vendor-block-img space-bottom-30">
                <div className="ec-vendor-block-bg cover-upload">
                  <div className="thumb-upload">
                    <div className="thumb-edit">
                      <input
                        type="file"
                        id="thumbUpload01"
                        className="ec-image-upload"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) =>
                          handleFileChange(e.target.files![0], "coverPhoto")
                        }
                      />
                      <label>
                        <i className="fi-rr-edit" />
                      </label>
                    </div>
                    <div className="thumb-preview ec-preview">
                      <div className="image-thumb-preview">
                        <img
                          className="image-thumb-preview ec-image-preview v-img"
                          src={
                            editForm.coverPhoto
                              ? getImageUrl(editForm.coverPhoto)
                              : "assets/images/banner/8.jpg"
                          }
                          alt="edit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ec-vendor-block-detail">
                  <div className="thumb-upload">
                    <div className="thumb-edit">
                      <input
                        type="file"
                        id="thumbUpload02"
                        className="ec-image-upload"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) =>
                          handleFileChange(e.target.files![0], "profileImage")
                        }
                      />
                      <label>
                        <i className="fi-rr-edit" />
                      </label>
                    </div>
                    <div className="thumb-preview ec-preview">
                      <div className="image-thumb-preview">
                        <img
                          className="image-thumb-preview ec-image-preview v-img"
                          src={
                            editForm.profileImage
                              ? getImageUrl(editForm.profileImage)
                              : "assets/images/user/1.jpg"
                          }
                          alt="edit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ec-vendor-upload-detail">
                  <form className="row g-3">
                    <div className="col-md-6 space-t-15">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={editForm?.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 space-t-15">
                      <label className="form-label">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={editForm?.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 space-t-15">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={editForm?.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 space-t-15">
                      <label className="form-label">Phone number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={editForm?.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Address Modal */}
      <div className="ec-checkout-wrap">
        <AnimatePresence>
          {addressModal && (
            <Modal
              show={addressModal as boolean}
              title="Add New Address"
              onClose={() => setAddressModal(false)}
              id="add_modal"
            >
              <div className="ec-check-bill-form mt-10">
                <form onSubmit={handleSaveAddress}>
                  <AddressForm
                    handleChange={handleChange}
                    initialValues={addressModal as Address}
                  />
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <ClipLoader />
                    ) : typeof addressModal === "boolean" ? (
                      "Add new address"
                    ) : (
                      "Edit Address"
                    )}
                  </button>
                </form>
              </div>{" "}
            </Modal>
          )}
        </AnimatePresence>
      </div>
      {/* Delete Address Modal */}
      <AnimatePresence>
        {isDelete && (
          <Modal
            show={isDelete !== ""}
            title="Delete Address"
            onClose={() => setIsDelete(null)}
            closeButtonText="Cancel"
            saveButtonText="Delete"
            onSave={() => {
              handleDeleteAddress(isDelete!);
              setIsDelete("");
            }}
            id="delete_modal"
            type="danger"
          >
            <p>Are you sure you want to delete this address?</p>
          </Modal>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProfilePage;
export function ProfileSidebar() {
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.auth.user?.role);

  return (
    <div className="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
      <div className="ec-sidebar-wrap ec-border-box">
        <div className="ec-sidebar-block">
          <div className="ec-vendor-block">
            <div className="ec-vendor-block-items">
              <ul>
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/checkout">Checkout</Link>
                </li>
                <li>
                  <Link to="/change-password">Change Password</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                {/* Add Upgrade to Vendor Button */}
                <li>
                  <button
                    className="btn btn-primary"
                    style={{
                      marginTop: "10px",
                      width: "100%",
                    }}
                    onClick={() => {
                      navigate(
                        role === UserRole.customer
                          ? "/upgrade-to-vendor"
                          : "/vendor/dashboard"
                      );
                    }}
                  >
                    {role === UserRole.customer
                      ? " Upgrade to Vendor"
                      : "Vendor Dashboard"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
