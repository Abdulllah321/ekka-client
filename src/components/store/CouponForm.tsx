import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AppDispatch, RootState, useAppSelector } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import SubmitBtn from "../common/SubmitBtn";
import { createCoupon, updateCoupon } from "../../slices/couponSlice";
import { Coupon, DiscountType } from "../../utils/types";
import Select from "react-select"; // Import react-select
import { fetchStoreProducts } from "../../slices/storeSlice";
import moment from "moment";

interface FormProps {
  isEditing?: boolean;
  onSubmit?: () => void;
  couponData?: Coupon;
}

const formatDate = (date: Date): string => {
  return moment(date).format("YYYY-MM-DD"); // Format as YYYY-MM-DD
};

const CouponForm: React.FC<FormProps> = ({
  isEditing = false,
  onSubmit,
  couponData,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.coupons);
  const { userStore } = useAppSelector((state) => state.store);
  const { products } = useAppSelector((state) => state.store);

  if (!userStore) return null;

  const [formData, setFormData] = useState<Coupon>({
    code: "",
    description: "",
    discountAmount: 0,
    discountType: DiscountType.Percentage,
    startDate: new Date(),
    endDate: new Date(),
    status: "active",
    storeId: userStore.id,
    products: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchStoreProducts(userStore.id));
  }, [dispatch]);

  useEffect(() => {
    if (isEditing && couponData) {
      setFormData({
        code: couponData.code,
        discountAmount: couponData.discountAmount,
        discountType: couponData.discountType,
        startDate: formatDate(new Date(couponData.startDate)),
        endDate: formatDate(new Date(couponData.endDate)),
        status: couponData.status,
        description: couponData.description,
        products:
          couponData?.products
            ?.map((product) =>
              typeof product === "string" ? product : product.id
            )
            .filter((id): id is string => id !== undefined) || [],
      });
    } else {
      setFormData({
        code: "",
        description: "",
        discountAmount: 0,
        discountType: DiscountType.Percentage,
        startDate: new Date(),
        endDate: new Date(),
        status: "active",
        products: [], // Initialize products as an empty array
      });
    }
    setErrors({});
  }, [isEditing, couponData]);
  console.log(formData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors for the current field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProductSelect = (selectedOptions: any) => {
    // If no products are selected, set the products field to all available products
    if (selectedOptions.length === 0) {
      setFormData((prev) => ({
        ...prev,
        products: products, // Set all products
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        products: selectedOptions.map((option: any) => option.value), // Set selected product IDs
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.code.trim()) {
      newErrors.code = "Code is required.";
    }

    if (!formData.discountAmount) {
      newErrors.discountAmount = "Discount amount is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const preparedData = {
        ...formData,
      };

      try {
        if (isEditing && couponData) {
          preparedData.id = couponData?.id;
          await dispatch(
            updateCoupon({
              id: couponData?.id as string,
              updatedData: preparedData as any,
            })
          );
          if (!error) {
            setFormData({
              code: "",
              description: "",
              discountAmount: 0,
              discountType: DiscountType.Percentage,
              startDate: new Date(),
              endDate: new Date(),
              status: "active",
              products: [], // Reset products
            });
            toast.success("Coupon updated successfully");
            if (onSubmit) {
              onSubmit();
            }
          }
        } else {
          await dispatch(createCoupon(preparedData as any));

          if (!error) {
            setFormData({
              code: "",
              description: "",
              discountAmount: 0,
              discountType: DiscountType.Percentage,
              startDate: new Date(),
              endDate: new Date(),
              status: "active",
              products: [], // Reset products
            });
            toast.success("Coupon added successfully");
          }
        }
      } catch (error) {
        toast.error(error as string);
      }
    }
  };

  return (
    <>
      <div className="ec-cat-list card card-default mb-24px">
        <div className="card-body">
          <div className="ec-cat-form">
            {isEditing ? null : <h4>Add New Coupon</h4>}
            <form onSubmit={handleSubmit}>
              {[
                { label: "Code", name: "code", type: "text" },
                {
                  label: "Discount Amount",
                  name: "discountAmount",
                  type: "number",
                },
                { label: "Start Date", name: "startDate", type: "date" },
                { label: "End Date", name: "endDate", type: "date" },
              ].map(({ label, name, type }) => (
                <div className="form-group row" key={name}>
                  <label htmlFor={name} className="col-12 col-form-label">
                    {label}
                  </label>
                  <div className="col-12">
                    <input
                      id={name}
                      name={name}
                      type={type}
                      className={`form-control ${
                        errors[name] ? "is-invalid" : ""
                      }`}
                      onChange={handleChange}
                      value={formData[name as keyof Coupon] as string}
                    />
                    {errors[name] && (
                      <div className="invalid-feedback">{errors[name]}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="form-group row">
                <label htmlFor="discountType" className="col-12 col-form-label">
                  Discount Type
                </label>
                <div className="col-12">
                  <select
                    name="discountType"
                    id="discountType"
                    onChange={handleChange}
                    value={formData.discountType}
                    className={`form-control ${
                      errors.discountType ? "is-invalid" : ""
                    }`}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                  </select>
                  {errors.discountType && (
                    <div className="invalid-feedback">
                      {errors.discountType}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="description" className="col-12 col-form-label">
                  Description
                </label>
                <div className="col-12">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                    value={formData.description || ""}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
              </div>

              {/* Add searchable product select box */}
              <div className="form-group row">
                <label htmlFor="products" className="col-12 col-form-label">
                  Products
                </label>
                <div className="col-12">
                  <Select
                    isMulti
                    name="products"
                    options={products
                      .filter((product) => product.id !== undefined)
                      .map((product) => ({
                        label: product.name,
                        value: product.id as string,
                      }))}
                    onChange={handleProductSelect}
                    value={formData.products
                      ?.map((productId) => {
                        const product = products.find(
                          (product) => product.id === productId
                        );
                        return product
                          ? { label: product.name, value: productId }
                          : null;
                      })
                      .filter(Boolean)}
                    className={`form-control ${
                      errors.products ? "is-invalid" : ""
                    }`}
                    placeholder="Select products"
                  />
                  {errors.products && (
                    <div className="invalid-feedback">{errors.products}</div>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-12">
                  <SubmitBtn
                    btnText={isEditing ? "Update Coupon" : "Create Coupon"}
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponForm;
