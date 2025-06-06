import React from "react";
import { useNavigate } from "react-router-dom";

interface NoDataFoundProps {
  title: string;
  message?: string;
  buttonText?: string; // Make buttonText optional
  buttonLink?: string | (() => void); // buttonLink can be a string (URL) or a function
  iconClass?: string; // Optional icon class
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  title,
  message,
  buttonText,
  buttonLink,
  iconClass = "bi bi-exclamation-circle", // Default icon if none provided
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (typeof buttonLink === "function") {
      buttonLink();
    } else if (typeof buttonLink === "string") {
      navigate(buttonLink);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-danger font-bolder">
                <i className={`${iconClass} me-2`}></i>
                {title}
              </h5>
              {message && <p className="card-text">{message}</p>}
              {buttonText && (
                <button onClick={handleButtonClick} className="btn btn-primary">
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
