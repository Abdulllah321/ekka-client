import React from "react";
import { getImageUrl } from "../../constants";

interface StoreConfirmationProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
}

const StoreConfirmation: React.FC<StoreConfirmationProps> = ({
  formData,
  onBack,
  onSubmit,
}) => {
  return (
    <div className="p-4 bg-light">
      <h4
        style={{
          fontWeight: "bold",
          borderBottom: "2px solid #007bff",
          paddingBottom: 10,
          marginBottom: 20,
        }}
      >
        Step 5: Confirm Store Information
      </h4>

      {/* Store Details */}
      <div
        className="card mb-4 shadow-sm"
        style={{ border: "1px solid #ddd", borderRadius: "8px" }}
      >
        <div className="card-body">
          <h5 className="card-header mb-2 rounded-top">Store Details</h5>
          <p>
            <strong>Name:</strong> {formData.name || "N/A"}
          </p>
          <p>
            <strong>Slug:</strong> {formData.slug || "N/A"}
          </p>
          <p>
            <strong>Contact Email:</strong> {formData.contactEmail || "N/A"}
          </p>
          <p>
            <strong>Contact Phone:</strong> {formData.contactPhone || "N/A"}
          </p>
        </div>
      </div>

      {/* Store Assets */}
      <div
        className="card mb-4 shadow-sm"
        style={{ border: "1px solid #ddd", borderRadius: "8px" }}
      >
        <div className="card-body">
          <h5 className="card-header mb-2 rounded-top">Store Assets</h5>
          <div className="mb-3">
            <strong>Logo:</strong>{" "}
            {formData.logo ? (
              <img
                src={getImageUrl(formData.logo)}
                alt="Logo"
                className="img-thumbnail"
                style={{ width: "100px", height: "auto", borderRadius: "800px" }}
              />
            ) : (
              "N/A"
            )}
          </div>
          <div>
            <strong>Banner Image:</strong>{" "}
            {formData.bannerImage ? (
              <img
                src={getImageUrl(formData.bannerImage)}
                alt="Banner"
                className="img-thumbnail"
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            ) : (
              "N/A"
            )}
          </div>
        </div>
      </div>

      {/* Store Address */}
      <div
        className="card mb-4 shadow-sm"
        style={{ border: "1px solid #ddd", borderRadius: "8px" }}
      >
        <div className="card-body">
          <h5 className="card-header mb-2 rounded-top">Store Address</h5>
          <p>
            <strong>Address:</strong> {formData.address || "N/A"}
          </p>
        </div>
      </div>

      {/* Store Policies */}
      <div
        className="card mb-4 shadow-sm"
        style={{ border: "1px solid #ddd", borderRadius: "8px" }}
      >
        <div className="card-body">
          <h5 className="card-header mb-2 rounded-top">Store Policies</h5>
          <p>
            <strong>Shipping Policies:</strong>{" "}
            {formData.shippingPolicies || "N/A"}
          </p>
          <p>
            <strong>Return Policies:</strong> {formData.returnPolicies || "N/A"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn-outline-secondary px-4 py-2"
          onClick={onBack}

        >
          <i className="bi bi-arrow-left-circle"></i> Back
        </button>
        <button
          type="button"
          className="btn-success px-4 py-2"
          onClick={onSubmit}
       
        >
          Confirm & Submit <i className="bi bi-check-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default StoreConfirmation;
