import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <a
            className={i === currentPage ? "active" : ""}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="ec-pro-pagination">
      <span>
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        item(s)
      </span>
      <ul className="ec-pro-pagination-inner">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage - 1);
            }}
            className={`next ${currentPage === 1 ? "disabled" : ""}`}
          >
            <i className="ecicon eci-angle-left mr-2" /> Prev
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage + 1);
            }}
            className={`next ${currentPage === totalPages ? "disabled" : ""}`}
          >
            Next <i className="ecicon eci-angle-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
