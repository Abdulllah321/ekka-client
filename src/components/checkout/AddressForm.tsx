import React, { useState, useEffect } from "react";
import { AddressFormFields } from "../../constants";
import { Address, AddressType } from "../../utils/types";

interface AddressFormProps {
  initialValues?: Address; // Initial values for the form
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void; // Callback to handle the change event
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialValues = {
    addressType: AddressType.BILLING,
    city: "",
    country: "",
    postalCode: "",
    state: "",
    street: "",
    firstName: "",
    lastName: "",
  },
  handleChange,
}) => {
  const [formData, setFormData] = useState<Address>({
    addressType: AddressType.BILLING,
    city: "",
    country: "",
    postalCode: "",
    state: "",
    street: "",
    firstName: "",
    lastName: "",
  });
  // Update state when the form fields change
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update local state
    handleChange(event); // Pass the change event to the parent
  };

  // Sync initial values with the form data when they change
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return (
    <form>
      {AddressFormFields.map((field) => (
        <div
          key={field.name}
          className={`ec-bill-wrap ${field.isHalf ? "ec-bill-half" : ""}`}
          style={{
            width: field.isHalf
              ? "50%"
              : field.type === "select"
              ? "30%"
              : "70%",
          }}
        >
          <label htmlFor={field.name}>{field.label}</label>

          {field.type === "select" ? (
            <span className="ec-bl-select-inner">
              <select
                name={field.name}
                id={field.name}
                className="ec-bill-select"
                value={formData[field.name as keyof Address] || ""} // Pre-fill with initial value or empty
                onChange={onInputChange}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </span>
          ) : (
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof Address] || ""} // Pre-fill with initial value or empty
              onChange={onInputChange}
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default AddressForm;
