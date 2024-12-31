import { AddressFormFields } from "../../constants";

const AddressForm = ({
  handleChange,
}: {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) => {
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
                onChange={handleChange}
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
              onChange={handleChange}
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default AddressForm;