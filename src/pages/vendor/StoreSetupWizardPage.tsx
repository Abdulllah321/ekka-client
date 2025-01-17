import React, { useEffect, useState } from "react";
import StoreInfoForm from "../../components/store/StoreInfoForm";
import StoreAssetsForm from "../../components/store/StoreAssetsForm";
import StoreAddressForm from "../../components/store/StoreAddressForm";
import StorePoliciesForm from "../../components/store/StorePoliciesForm";
import StoreConfirmation from "../../components/store/StoreConfirmation";
import Layout from "../../components/common/Layout";
import Breadcrumbs from "../../components/common/BreadCrumbs";
import { motion } from "framer-motion"; // Import Framer Motion
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store";
import { createNewStore } from "../../slices/storeSlice";
import { useNavigate } from "react-router-dom";

const StoreSetupWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userStore } = useAppSelector((state) => state.store);
  const steps = [
    { component: StoreInfoForm, skippable: false, label: "Store Info" },
    { component: StoreAssetsForm, skippable: true, label: "Store Assets" },
    { component: StoreAddressForm, skippable: true, label: "Store Address" },
    { component: StorePoliciesForm, skippable: true, label: "Store Policies" },
    { component: StoreConfirmation, skippable: false, label: "Confirmation" },
  ];

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setCompletedSteps([
      ...completedSteps.slice(0, step),
      true,
      ...completedSteps.slice(step),
    ]);
    setStep(step + 1);
  };

  const handleSkip = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createNewStore(formData));
      toast.success("Store registered successfully! You can now add products.");
      navigate("/vendor/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to register the store");
    }
  };

  const CurrentStep = steps[step - 1].component;

  useEffect(() => {
    if (userStore) {
      toast.error(
        "You already have a store registered. Please contact support for further assistance."
      );
      navigate("/vendor/dashboard");
    }
  }, [userStore]);

  return (
    <Layout>
      <Breadcrumbs />
      <div className="d-flex align-items-center justify-content-center pt-24px pb-24px">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header bg-primary-1">
                <div className="ec-brand" style={{ textAlign: "center" }}>
                  <h2 style={{ fontWeight: "bold" }}>Store Setup</h2>
                </div>
              </div>

              {/* Stepper */}
              <div className="stepper-container mb-4">
                <div className="text-center mt-2">
                  <p>
                    Step {step} of {steps.length}
                  </p>
                </div>
              </div>

              <div className="card-body" style={{ transition: "all .5s" }}>
                {/* Animated Step Content */}
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    minWidth: "100%",
                    width: "100%", // Ensures full width
                    maxWidth: "600px", // Maximum width for consistency
                    margin: "0 auto", // Centers the content
                  }}
                >
                  <CurrentStep
                    onNext={handleNext}
                    onBack={handleBack}
                    onSkip={steps[step - 1].skippable ? handleSkip : undefined}
                    onSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoreSetupWizard;
