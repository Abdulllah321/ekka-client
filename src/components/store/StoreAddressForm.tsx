import React from "react";
import { useForm } from "react-hook-form";

interface StoreAddressFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onSkip?: () => void;
}

const StoreAddressForm: React.FC<StoreAddressFormProps> = ({
  onNext,
  onBack,
  onSkip,
}) => {
  const { register, handleSubmit, formState } = useForm();
  const { isDirty, isValid } = formState;

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-light ">
      <div className="mb-4">
        <label htmlFor="address" className="">
          Address
        </label>
        <input
          id="address"
          {...register("address")}
          className="form-control"
          placeholder="Enter your store's address"
        />
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

export default StoreAddressForm;
