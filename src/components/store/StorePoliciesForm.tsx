import React from "react";
import { useForm } from "react-hook-form";

interface StorePoliciesFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onSkip?: () => void;
  formData: any;
}

const StorePoliciesForm: React.FC<StorePoliciesFormProps> = ({
  onNext,
  onBack,
  onSkip,
  formData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-light ">
      <h4>Step 4: Store Policies</h4>
      <div className="mb-3">
        <label className="form-label">Shipping Policies</label>
        <textarea
          className="form-control"
          {...register("shippingPolicies")}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Return Policies</label>
        <textarea
          className="form-control"
          {...register("returnPolicies")}
        ></textarea>
      </div>

      <div className="d-flex w-100">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary px-5 py-2 w-100"
        >
          <i className="bi bi-arrow-left-circle"></i> Back
        </button>
        {onSkip && (
          <button type="button" className="btn-warning px-3" onClick={onSkip}>
            Skip
          </button>
        )}
        <button
          type="submit"
          className={"btn-primary px-5 py-2 w-100"}
          style={{
            opacity: !isValid || !isDirty ? 0.7 : 1,
          }}
          disabled={!isDirty || !isValid} // Disable if form is not dirty or not valid
        >
          Next <i className="bi bi-arrow-right-circle"></i>
        </button>
      </div>
    </form>
  );
};

export default StorePoliciesForm;
