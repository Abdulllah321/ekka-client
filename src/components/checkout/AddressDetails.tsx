import React from "react";

interface AddressDetailsProps {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
  selected?: boolean; // Optional prop
  onSelect?: (id: string) => void; // Optional prop
  onEdit?: (id: string) => void; // Optional callback for edit
  onDelete?: (id: string) => void; // Optional callback for delete
  id: string;
  firstName: string;
  lastName: string;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({
  street,
  id,
  city,
  state,
  postalCode,
  country,
  addressType,
  selected = false, // Default value if not provided
  onSelect,
  onEdit,
  onDelete,
  firstName,
  lastName,
}) => {
  return (
    <div
      className={`card shadow-sm border-0 mb-4`}
      style={{
        background: selected ? "#3474D410" : "white",
        position: "relative",
        cursor: onSelect ? "pointer" : "default", // Change cursor only if onSelect is provided
      }}
      onClick={() => onSelect && onSelect(id)} // Call onSelect only if it exists
    >
      <div className="card-body">
        {/* Address Type Label */}
        <p
          className={`mb-1 bg-${
            addressType === "billing" ? "primary" : "secondary"
          } p-2`}
          style={{
            position: "absolute",
            right: 0,
            textTransform: "capitalize",
            color: "white",
            borderBottomLeftRadius: "10px",
            top: 0,
          }}
        >
          {addressType}
        </p>

        {/* Edit and Delete Icons */}
        <div
          style={{
            position: "absolute",
            top: "45px",
            right: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          {onEdit && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              style={{
                cursor: "pointer",
                color: "#007bff",
                fontSize: "18px",
              }}
              title="Edit Address"
            >
              ✏️
            </span>
          )}
          {onDelete && (
            <span
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onSelect
                onDelete(id);
              }}
              style={{
                cursor: "pointer",
                color: "#dc3545",
                fontSize: "18px",
              }}
              title="Delete Address"
            >
              🗑️
            </span>
          )}
        </div>

        {/* Address Details */}
        <div className="row">
          <p className="mb-1 col-6">
            <strong>First Name:</strong> <span>{firstName}</span>
          </p>
          <p className="mb-1 col-6">
            <strong>Last Name:</strong> <span>{lastName}</span>
          </p>
        </div>
        <hr />
        <p className="mb-1">
          <strong>Street:</strong> <span>{street}</span>
        </p>
        <p className="mb-1">
          <strong>City:</strong> <span>{city}</span>
        </p>
        <hr />
        <div className="row">
          <p className="mb-1 col-4 text-center">
            <strong>State:</strong> <span>{state}</span>
          </p>
          <p className="mb-1 col-4 text-center">
            <strong>Postal Code:</strong> <span>{postalCode}</span>
          </p>
          <p className="mb-1 col-4 text-center">
            <strong>Country:</strong> <span>{country}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
