import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../common/ImageUpload";
import { getImageUrl } from "../../constants";

interface StoreAssetsFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onSkip?: () => void;
  formData: any;
  setFormData?: Dispatch<any> | SetStateAction<string>;
}

const StoreAssetsForm: React.FC<StoreAssetsFormProps> = ({
  onNext,
  onBack,
  onSkip,
  formData,
  setFormData,
}) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: formData,
  });
const isFormValid = formData.logo && formData.bannerImage;
const isFormDirty = Boolean(
  formData.logo !== null || formData.bannerImage !== null
);

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    onNext(data);
  };
  console.log(formData);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-light">
      <h4
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #D8D8D8",
          paddingBottom: 5,
        }}
      >
        Step 2: Store Assets
      </h4>
      <div className="mb-3">
        <label className="form-label">Logo</label>
        <ImageUpload
          onSuccess={(data) =>
            setFormData &&
            typeof setFormData === "function" &&
            setFormData({ ...formData, logo: data })
          }
          clearImage={() =>
            setFormData &&
            typeof setFormData === "function" &&
            setFormData({ ...formData, logo: null })
          }
          value={formData.logo}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Banner Image</label>

        <ImageUpload
          onSuccess={(data) =>
            setFormData &&
            typeof setFormData === "function" &&
            setFormData({ ...formData, bannerImage: data })
          }
          clearImage={() =>
            setFormData &&
            typeof setFormData === "function" &&
            setFormData({ ...formData, bannerImage: null })
          }
          value={formData.bannerImage}
        />
      </div>
      <div className="d-flex w-100 gap-2">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary px-5 py-2 flex-grow-1"
        >
          <i className="bi bi-arrow-left-circle"></i> Back
        </button>
        {onSkip && (
          <button
            type="button"
            className="btn-warning px-5 py-2 flex-grow-1"
            onClick={onSkip}
          >
            Skip
          </button>
        )}
        <button
          type="submit"
          className="btn-primary px-5 py-2 flex-grow-1"
          style={{
            opacity: !isFormValid || !isFormDirty ? 0.7 : 1,
          }}
          disabled={!isFormDirty || !isFormValid}
        >
          Next <i className="bi bi-arrow-right-circle"></i>
        </button>
      </div>
    </form>
  );
};

export default StoreAssetsForm;
