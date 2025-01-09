import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addReview } from "../../slices/reviewSlice";
import { Review } from "../../utils/types";
import { AppDispatch } from "../../store";
import { fetchProductBySlug } from "../../slices/productSlice";

interface formData {
  comment: string;
  rating: number;
  productId?: string;
}
const ReviewForm = ({ productId, id }: { productId: string; id: string }) => {
  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState<formData>({
    comment: "",
    rating: 0,
    productId,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.comment || !formData.rating) {
      toast.error("All fields are required, including rating!");
      return;
    }

    try {
      await dispatch(addReview(formData as Review)).unwrap();
      toast.success("Review submitted successfully!");
      setFormData({ comment: "", rating: 0 });
      await dispatch(fetchProductBySlug(id));
    } catch (error) {
      toast.error("Failed to submit the review. Please try again.");
    }
  };

  return (
    <div className="ec-ratting-content">
      <h3>Add a Review</h3>
      <div className="ec-ratting-form">
        <form onSubmit={handleSubmit}>
          <div className="ec-ratting-star">
            <span>Your rating:</span>
            <div className="ec-t-review-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`ecicon eci-star ${
                    formData.rating >= star ? "fill" : "eci-star-o"
                  }`}
                  onClick={() => handleRatingChange(star)}
                  style={{
                    cursor: "pointer",
                    color: formData.rating >= star ? "#FFD700" : "#ccc",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="ec-ratting-input form-submit">
            <textarea
              name="comment"
              placeholder="Enter Your Comment"
              value={formData.comment}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
