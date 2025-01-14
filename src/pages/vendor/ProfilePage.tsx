import React, { useState, useEffect } from "react";
import VendorLayout from "../../components/common/VendorLayout";
import { getImageUrl } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchUserStores, updateStore } from "../../slices/storeSlice";
import { Tooltip } from "react-tooltip";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userStore } = useAppSelector((state) => state.store);
  const [vendor, setVendor] = useState<typeof userStore | null>(userStore);
  const [originalVendor, setOriginalVendor] = useState<typeof userStore | null>(
    userStore
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserStores());
    setVendor(userStore);
    setOriginalVendor(userStore);
  }, [dispatch]);

  if (!userStore) return null;

  const handleSaveChanges = () => {
    // Save changes
    dispatch(updateStore({ id: userStore.id, storeData: vendor }));
    setIsEditing(false); // Exit edit mode
  };

  const handleDiscardChanges = () => {
    // Revert changes to original state
    setVendor(originalVendor);
    setIsEditing(false); // Exit edit mode
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVendor((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const totalStars = 5; // Assuming the rating is out of 5
    const filledStars = Math.round(rating); // Round the rating to nearest whole number

    return [...Array(totalStars)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < filledStars ? "filled" : ""}`}
      >
        ★
      </span>
    ));
  };

  return (
    <VendorLayout>
      {vendor && (
        <div className="ec-vendor-dashboard-card ec-vendor-profile-card">
          <div className="ec-vendor-card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="ec-vendor-block-profile">
                  <div className="ec-vendor-block-img space-bottom-30">
                    <img
                      className="ec-vendor-block-bg"
                      src={getImageUrl(vendor.bannerImage!)}
                    />
                    <div className="ec-vendor-block-detail">
                      <img
                        className="v-img"
                        src={getImageUrl(vendor.logo!)}
                        alt="vendor logo"
                      />
                      <h5 className="name">
                        {isEditing ? (
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={vendor.name}
                            onChange={handleChange}
                          />
                        ) : (
                          vendor.name
                        )}
                      </h5>
                      <div className="rating">
                        {renderStars(vendor.rating || 0)}{" "}
                        <span
                          data-tip={`Reviews: ${vendor.reviewsCount}`}
                          className="reviews-count"
                        >
                          ({vendor.reviewsCount})
                        </span>
                        <Tooltip />
                      </div>
                    </div>
                  </div>
                  <div className="ec-vendor-block-about space-bottom-30">
                    <h5>About Our Firm</h5>
                    <p>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          name="description"
                          value={vendor.description || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        vendor.description || "No description available"
                      )}
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
                            {isEditing ? (
                              <input
                                className="form-control"
                                type="email"
                                name="contactEmail"
                                value={vendor.contactEmail}
                                onChange={handleChange}
                              />
                            ) : (
                              vendor.contactEmail
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="ec-vendor-detail-block ec-vendor-block-contact space-bottom-30">
                        <h6>Contact number</h6>
                        <ul>
                          <li>
                            <strong>Phone : </strong>
                            {isEditing ? (
                              <input
                                className="form-control"
                                type="tel"
                                name="contactPhone"
                                value={vendor.contactPhone}
                                onChange={handleChange}
                              />
                            ) : (
                              vendor.contactPhone
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="ec-vendor-detail-block ec-vendor-block-address mar-b-30">
                        <h6>Address</h6>
                        <ul>
                          <li>
                            <strong>Home : </strong>
                            {isEditing ? (
                              <input
                                className="form-control"
                                type="text"
                                name="address"
                                value={vendor.address}
                                onChange={handleChange}
                              />
                            ) : (
                              vendor.address
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    {isEditing ? (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={handleSaveChanges}
                        >
                          Save Changes
                        </button>
                        <button
                          className="btn btn-secondary ml-2"
                          onClick={handleDiscardChanges}
                        >
                          Discard Changes
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </VendorLayout>
  );
};

export default ProfilePage;
