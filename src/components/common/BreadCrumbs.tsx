import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({
  BreadCrumbsPathnames,
}: {
  BreadCrumbsPathnames?: string[];
}) => {
  const location = useLocation();
  const [pathnames, setPathnames] = useState<string[]>([]);

  useEffect(() => {
    if (BreadCrumbsPathnames) {
      setPathnames(BreadCrumbsPathnames);
    } else {
      setPathnames(location.pathname.split("/").filter((x) => x));
    }
  }, []);

  return (
    <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row ec_breadcrumb_inner">
              <div className="col-md-6 col-sm-12">
                <h2 className="ec-breadcrumb-title">
                  {pathnames.length > 0
                    ? pathnames[pathnames.length - 1].replace(/-/g, " ")
                    : "Home"}
                </h2>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* ec-breadcrumb-list start */}
                <ul className="ec-breadcrumb-list">
                  <li className="ec-breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    return (
                      <li
                        key={to}
                        className={`ec-breadcrumb-item ${
                          index === pathnames.length - 1 ? "active" : ""
                        }`}
                      >
                        {index === pathnames.length - 1 ? (
                          value.replace(/-/g, " ")
                        ) : (
                          <Link to={to}>{value.replace(/-/g, " ")}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {/* ec-breadcrumb-list end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
