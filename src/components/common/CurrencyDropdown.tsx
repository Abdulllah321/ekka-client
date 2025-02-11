import { useCurrency } from "../../context/CurrencyContext.tsx";

const CurrencyDropdown = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="header-top-curr dropdown">
      <button className="dropdown-toggle text-upper" data-bs-toggle="dropdown">
        Currency {currency}{" "}
        <i className="ecicon eci-caret-down" aria-hidden="true" />
      </button>
      <ul className="dropdown-menu">
        <li className={currency === "₹" ? "active" : ""}>
          <a className="dropdown-item" onClick={() => setCurrency("₹")}>
            INR ₹
          </a>
        </li>
        <li className={currency === "$" ? "active" : ""}>
          <a className="dropdown-item" onClick={() => setCurrency("$")}>
            USD $
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CurrencyDropdown;
