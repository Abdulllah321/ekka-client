import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="ec-under-maintenance">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-6 text-center">
            <div className="under-maintenance">
              <h1 className="text-danger">Error 404</h1>
              <h4 className="text-muted">The page was not found.</h4>
              <p className="text-muted mb-4">
                Oops! It seems the page you're looking for doesn't exist. Please
                check the URL or return to the homepage.
              </p>
              <Link to="/" className="btn btn-lg btn-primary" tabIndex={0}>
                Back to Home
              </Link>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <div className="under-maintenance">
              <img
                className="maintenance-img img-fluid"
                src="/assets/images/common/404.png"
                alt="404 Error"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
