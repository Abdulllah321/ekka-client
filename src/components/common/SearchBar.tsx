import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../constants";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(`/search?search=${value}`);
        setResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleNavigation = (slug: string) => {
    navigate(`/product-detail/${slug}`);
  };

  return (
    <div className="position-relative">
      <div className="align-self-center">
        <div className="header-search">
          <div className="ec-btn-group-form">
            <input
              className="form-control ec-search-bar"
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleSearch}
            />
            <button className="submit" type="submit">
              <i className="fi-rr-search" />
            </button>
          </div>
        </div>
      </div>
      {loading && <div className="text-center mt-2">Loading...</div>}
      {!loading && query.length > 2 && results.length === 0 && (
        <div className="text-center mt-2">No products found</div>
      )}
      {results.length > 0 && (
        <ul
          className="list-group position-absolute w-100 mt-2 bg-white shadow z-2"
          style={{
            zIndex: 20,
          }}
        >
          {results.map((product) => (
            <li
              key={product.id}
              className="list-group-item d-flex align-items-center p-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigation(product.slug)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f8f9fa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <img
                src={getImageUrl(product.thumbnail)}
                alt={product.name}
                className="me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
