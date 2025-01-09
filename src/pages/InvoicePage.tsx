import React, { useEffect } from "react";
import { useParams } from "react-router";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { getOrderById } from "../slices/orderSlice";
import NoDataFound from "../components/common/NoDataFound";
import Loader from "../components/common/Loader";
import { ProfileSidebar } from "./ProfilePage";
import { CURRENCY } from "../constants";
import Layout from "../components/common/Layout";

const generateInvoiceId = () => {
  // Get the current timestamp
  const timestamp = Date.now();
  // Generate a random number between 1000 and 9999 (4 digits)
  const randomNum = Math.floor(Math.random() * 9000) + 1000;

  // Combine the timestamp and random number for uniqueness
  const invoiceId = `${timestamp.toString().slice(-5)}${randomNum
    .toString()
    .slice(-3)}`;

  return invoiceId;
};

const Invoice = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { currentOrder, loading } = useAppSelector((state) => state.order);

  // Generate dynamic invoice ID
  const invoiceId = generateInvoiceId();

  useEffect(() => {
    dispatch(getOrderById(id!));
  }, [id]);

  if (!currentOrder)
    return (
      <NoDataFound
        title="Invalid Order"
        message="The order you requested does not exist or has been canceled."
        buttonLink="/shop"
        buttonText="Go back to Shop"
      />
    );

  if (loading) return <Loader />;

  return (
    <Layout>
      <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
        <div className="container">
          <div className="row">
            {/* Sidebar Area Start */}
            <ProfileSidebar />

            {/* Invoice Content */}
            <div className="ec-shop-rightside col-lg-9 col-md-12">
              <div className="ec-vendor-dashboard-card">
                <div className="ec-vendor-card-header">
                  <h5>Invoice</h5>
                  <div className="ec-header-btn">
                    <a className="btn btn-lg btn-secondary" href="#">
                      Print
                    </a>
                    <a className="btn btn-lg btn-primary" href="#">
                      Export
                    </a>
                  </div>
                </div>
                <div className="ec-vendor-card-body padding-b-0">
                  <div className="page-content">
                    <div className="page-header text-blue-d2">
                      <img src="assets/images/logo/logo.png" alt="Site Logo" />
                    </div>

                    <div className="container px-0">
                      <div className="row mt-4">
                        <div className="col-lg-12">
                          <hr className="row brc-default-l1 mx-n1 mb-4" />

                          <div className="row">
                            <div className="col-sm-6">
                              <div className="my-2">
                                <span className="text-sm text-grey-m2 align-middle">
                                  To :{" "}
                                </span>
                                <span className="text-600 text-110 text-blue align-middle">
                                  {currentOrder.selectedAddress?.firstName +
                                    " " +
                                    currentOrder.selectedAddress?.lastName}
                                </span>
                              </div>
                              <div className="text-grey-m2">
                                <div className="my-2">
                                  {currentOrder.selectedAddress?.street}
                                </div>
                                <div className="my-2">
                                  {currentOrder.selectedAddress?.city},{" "}
                                  {currentOrder.selectedAddress?.state},{" "}
                                  {currentOrder.selectedAddress?.country}
                                </div>

                                <div className="my-2">
                                  {currentOrder.selectedAddress?.postalCode}
                                </div>
                                {currentOrder.user?.phoneNumber && (
                                  <div className="my-2">
                                    <b className="text-600">Phone : </b>
                                    {currentOrder.user?.phoneNumber}
                                  </div>
                                )}
                                {currentOrder.user?.email && (
                                  <div className="my-2">
                                    <b className="text-600">Email : </b>
                                    {currentOrder.user?.email}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                              <hr className="d-sm-none" />
                              <div className="text-grey-m2">
                                <div className="my-2">
                                  <span className="text-600 text-90">
                                    Issue Date :{" "}
                                  </span>
                                  {new Date(Date.now()).toLocaleDateString()}
                                </div>
                                <div className="my-2">
                                  <span className="text-600 text-90">
                                    Invoice No :{" "}
                                  </span>
                                  {currentOrder?.id}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="text-95 text-secondary-d3">
                              <div className="ec-vendor-card-table">
                                <table className="table ec-table">
                                  <thead>
                                    <tr>
                                      <th scope="col">ID</th>
                                      <th scope="col">Name</th>
                                      <th scope="col">Qty</th>
                                      <th scope="col">Price</th>
                                      <th scope="col">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {currentOrder?.orderItems?.map((item) => (
                                      <tr key={item.productId}>
                                        <th>
                                          <span>{item.productId}</span>
                                        </th>
                                        <td>
                                          <span>{item.product?.name!}</span>
                                        </td>
                                        <td>
                                          <span>{item.quantity}</span>
                                        </td>
                                        <td>
                                          <span>
                                            {CURRENCY}
                                            {item.price}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {CURRENCY}
                                            {(
                                              item.quantity * item.price
                                            ).toFixed(2)}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td
                                        className="border-none m-m15"
                                        colSpan={3}
                                      >
                                        <span className="note-text-color">
                                          Extra note such as company or payment
                                        </span>
                                      </td>
                                      <td
                                        className="border-color m-m15"
                                        colSpan={1}
                                      >
                                        <span>
                                          <strong>Total</strong>
                                        </span>
                                      </td>
                                      <td className="border-color m-m15">
                                        <span>
                                          <b>
                                            {" "}
                                            {CURRENCY}
                                            {currentOrder.totalAmount.toFixed(
                                              2
                                            )}
                                          </b>
                                        </span>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Invoice;
