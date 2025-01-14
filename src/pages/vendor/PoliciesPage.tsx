import { useState, useEffect } from "react";
import VendorLayout from "../../components/common/VendorLayout";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import the styles for the editor
import { useAppDispatch, useAppSelector } from "../../store";
import { updateStore } from "../../slices/storeSlice";
import parse from "html-react-parser";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import FontAwesome icons
import Modal from "../../components/common/Modal"; // Import the modal component
import { AnimatePresence } from "framer-motion";

const PoliciesPage = () => {
  const { userStore } = useAppSelector((state) => state.store);
  const [isEditingReturn, setIsEditingReturn] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [returnPolicyContent, setReturnPolicyContent] = useState<string>("");
  const [shippingPolicyContent, setShippingPolicyContent] =
    useState<string>("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalActionType, setModalActionType] = useState<
    "edit" | "delete" | null
  >(null); // Action type for modal
  const [policyToDelete, setPolicyToDelete] = useState<
    "return" | "shipping" | null
  >(null); // Which policy to delete
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userStore) {
      setReturnPolicyContent(userStore.returnPolicies || "");
      setShippingPolicyContent(userStore.shippingPolicies || "");
    }
  }, [userStore]);

  const handleSaveChanges = (type: "return" | "shipping") => {
    const updatedPolicies =
      type === "return"
        ? { returnPolicies: returnPolicyContent }
        : { shippingPolicies: shippingPolicyContent };

    dispatch(
      updateStore({
        id: userStore?.id!,
        storeData: { ...userStore, ...updatedPolicies },
      })
    );
    if (type === "return") {
      setIsEditingReturn(false);
    } else {
      setIsEditingShipping(false);
    }
  };

  const handleDiscardChanges = (type: "return" | "shipping") => {
    if (type === "return") {
      setReturnPolicyContent(userStore?.returnPolicies || "");
      setIsEditingReturn(false);
    } else {
      setShippingPolicyContent(userStore?.shippingPolicies || "");
      setIsEditingShipping(false);
    }
  };

  const handleChange = (type: "return" | "shipping", value: string) => {
    if (type === "return") {
      setReturnPolicyContent(value);
    } else {
      setShippingPolicyContent(value);
    }
  };

  const handleDeletePolicy = (type: "return" | "shipping") => {
    if (type === "return") {
      setReturnPolicyContent("");
      dispatch(
        updateStore({
          id: userStore?.id!,
          storeData: { ...userStore, returnPolicies: "" },
        })
      );
    } else {
      setShippingPolicyContent("");
      dispatch(
        updateStore({
          id: userStore?.id!,
          storeData: { ...userStore, shippingPolicies: "" },
        })
      );
    }
    setShowModal(false); // Close modal after action
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPolicyToDelete(null);
    setModalActionType(null);
  };

  const handleModalAction = () => {
    if (modalActionType === "delete" && policyToDelete) {
      handleDeletePolicy(policyToDelete);
    }
    setShowModal(false); // Close modal after action
  };

  return (
    <VendorLayout>
      {userStore && (
        <div className="ec-vendor-dashboard-card ec-vendor-policy-card">
          <div className="ec-vendor-card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="ec-vendor-block-policy">
                  <h3
                    className="policy-title font-bold"
                    style={{ fontWeight: "bold", marginBottom: "20px" }}
                  >
                    Store Policies
                  </h3>

                  <hr />

                  {/* Return Policy Section */}
                  <div
                    className="policy-section"
                    style={{ marginBottom: "40px" }}
                  >
                    <div
                      className="policy-header"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5
                        style={{
                          marginBottom: "15px",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                        }}
                      >
                        Return Policies
                      </h5>
                      {returnPolicyContent && (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <FaEdit
                            onClick={() => setIsEditingReturn(true)}
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              color: "#007bff",
                            }}
                          />
                          <FaTrashAlt
                            onClick={() => {
                              setPolicyToDelete("return");
                              setModalActionType("delete");
                              setShowModal(true);
                            }}
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              color: "#dc3545",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {isEditingReturn ? (
                      <ReactQuill
                        value={returnPolicyContent}
                        onChange={(value) => handleChange("return", value)}
                        theme="snow"
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            [{ align: [] }],
                            ["link"],
                            ["blockquote"],
                          ],
                        }}
                      />
                    ) : returnPolicyContent ? (
                      <div
                        className="policy-content"
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        {parse(returnPolicyContent)}
                      </div>
                    ) : (
                      <p>
                        No return policy found.{" "}
                        <button
                          onClick={() => setIsEditingReturn(true)}
                          style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Add Return Policy
                        </button>
                      </p>
                    )}
                    {isEditingReturn && (
                      <div className="text-center mt-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSaveChanges("return")}
                          style={{ marginRight: "10px" }}
                        >
                          Save Changes
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDiscardChanges("return")}
                        >
                          Discard Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Shipping Policy Section */}
                  <div
                    className="policy-section"
                    style={{ marginBottom: "40px" }}
                  >
                    <div
                      className="policy-header"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5
                        style={{
                          marginBottom: "15px",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                        }}
                      >
                        Shipping Policies
                      </h5>
                      {shippingPolicyContent && (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <FaEdit
                            onClick={() => setIsEditingShipping(true)}
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              color: "#007bff",
                            }}
                          />
                          <FaTrashAlt
                            onClick={() => {
                              setPolicyToDelete("shipping");
                              setModalActionType("delete");
                              setShowModal(true);
                            }}
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              color: "#dc3545",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {isEditingShipping ? (
                      <ReactQuill
                        value={shippingPolicyContent}
                        onChange={(value) => handleChange("shipping", value)}
                        theme="snow"
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            [{ align: [] }],
                            ["link"],
                            ["blockquote"],
                          ],
                        }}
                      />
                    ) : shippingPolicyContent ? (
                      <div
                        className="policy-content"
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        {parse(shippingPolicyContent)}
                      </div>
                    ) : (
                      <p>
                        No shipping policy found.{" "}
                        <button
                          onClick={() => setIsEditingShipping(true)}
                          style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Add Shipping Policy
                        </button>
                      </p>
                    )}
                    {isEditingShipping && (
                      <div className="text-center mt-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSaveChanges("shipping")}
                          style={{ marginRight: "10px" }}
                        >
                          Save Changes
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDiscardChanges("shipping")}
                        >
                          Discard Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {/* Confirmation Modal */}
        <Modal
          title="Confirm Action"
          show={showModal}
          onClose={handleModalClose}
          onSave={handleModalAction}
          saveButtonText="Confirm"
          closeButtonText="Cancel"
        >
          <p>Are you sure you want to {modalActionType} this policy?</p>
        </Modal>
      </AnimatePresence>
    </VendorLayout>
  );
};

export default PoliciesPage;
