import React from "react";
import { Review } from "../../utils/types";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  const getAvatar = (firstName?: string, lastName?: string): string => {
    if (firstName || lastName) {
      return `${firstName?.charAt(0) || ""}${
        lastName?.charAt(0) || ""
      }`.toUpperCase();
    }
    return "NA";
  };

  if (reviews.length === 0) {
    return <div>No reviews available for this product.</div>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <div className="ec-t-review-item" key={review.id}>
          <div className="ec-t-review-avtar">
            {review.user?.profileImage ? (
              <img
                src={review.user.profileImage}
                alt={`${review.user.firstName} ${review.user.lastName}`}
              />
            ) : (
              <div className="ec-avatar-placeholder">
                {getAvatar(review.user?.firstName, review.user?.lastName)}
              </div>
            )}
          </div>
          <div className="ec-t-review-content">
            <div className="ec-t-review-top">
              <div className="ec-t-review-name">
                {`${review.user?.firstName || "Unknown"} ${
                  review.user?.lastName || "User"
                }`}
              </div>
              <div className="ec-t-review-rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i
                    key={index}
                    className={`ecicon eci-star ${
                      index < review.rating ? "fill" : "o"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="ec-t-review-bottom">
              <p>{review.comment || "No comment provided."}</p>
              <small>
                Reviewed on: {new Date(review.createdAt!).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
