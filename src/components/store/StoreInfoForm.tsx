import React from "react";
import { useForm } from "react-hook-form";

interface StoreInfoFormProps {
  onNext: (data: any) => void;
  formData: any;
}

const StoreInfoForm: React.FC<StoreInfoFormProps> = ({ onNext, formData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-light ">
      <h4
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #D8D8D8",
          paddingBottom: 5,
        }}
      >
        Step 1: Store Information
      </h4>

      <div className="mb-3">
        <label className="form-label">Store Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...register("name", { required: "Store name is required" })}
        />
        {errors.name && (
          <div className="invalid-feedback">
            {errors.name?.message as string}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input
          type="text"
          className={`form-control ${errors.slug ? "is-invalid" : ""}`}
          {...register("slug", { required: "Slug is required" })}
        />
        {errors.slug && (
          <div className="invalid-feedback">
            {errors.slug.message as string}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Contact Email</label>
        <input
          type="email"
          className={`form-control ${errors.contactEmail ? "is-invalid" : ""}`}
          {...register("contactEmail", {
            required: "Contact email is required",
          })}
        />
        {errors.contactEmail && (
          <div className="invalid-feedback">
            {errors.contactEmail.message as string}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Contact Phone No.</label>
        <input
          type="tel"
          className={`form-control ${errors.contactPhone ? "is-invalid" : ""}`}
          {...register("contactPhone", {
            required: "Phone number is required",
          })}
        />
        {errors.contactPhone && (
          <div className="invalid-feedback">
            {errors.contactPhone.message as string}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button type="submit" className="btn-primary px-4 py-2">
          Next <i className="bi bi-arrow-right-circle"></i>
        </button>
      </div>
    </form>
  );
};

export default StoreInfoForm;
