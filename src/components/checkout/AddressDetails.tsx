import React from "react";

interface AddressDetailsProps {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
  selected: boolean;
  onSelect: (id: string) => void;
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
  selected = false,
  onSelect,
  firstName,
  lastName,
}) => {
  return (
    <div
      className={`card shadow-sm border-0 mb-4`}
      style={{
        background: selected ? "#3474D410" : "white",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => onSelect(id)}
    >
      <div className="card-body">
        <p
          className={`mb-1 bg-${
            addressType == "billing" ? "primary" : "secondary"
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
        <div className="row">
          <p className="mb-1 col-6">
            <strong>First Name:</strong> <span className="">{firstName}</span>
          </p>
          <p className="mb-1 col-6">
            <strong>Last Name:</strong> <span className="">{lastName}</span>
          </p>
        </div>
        <hr />
        <p className="mb-1">
          <strong>Street:</strong> <span className="">{street}</span>
        </p>
        <p className="mb-1">
          <strong>City:</strong> <span className="">{city}</span>
        </p>
        <hr />
        <div className="row">
          <p className="mb-1 col-4 text-center">
            <strong>State:</strong> <span className="">{state}</span>
          </p>
          <p className="mb-1 col-4 text-center">
            <strong>Postal Code:</strong> <span className="">{postalCode}</span>
          </p>
          <p className="mb-1 col-4 text-center">
            <strong>Country:</strong> <span className="">{country}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
