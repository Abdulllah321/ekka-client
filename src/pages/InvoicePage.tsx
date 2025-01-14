import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { getOrderById } from "../slices/orderSlice";
import NoDataFound from "../components/common/NoDataFound";
import Loader from "../components/common/Loader";
import { ProfileSidebar } from "./ProfilePage";
import { CURRENCY } from "../constants";
import Layout from "../components/common/Layout";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { toPng } from "html-to-image";
import generatePDF from "react-to-pdf";

const Invoice = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { currentOrder, loading } = useAppSelector((state) => state.order);
  const invoiceRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = () => {
    window.print();
  };

  const exportPDF = () => {
    generatePDF(invoiceRef, { filename: "invoice.pdf" });
  };

  const exportImage = async () => {
    if (invoiceRef.current) {
      // Use html2canvas to capture the invoice content as an image
      const canvas = await html2canvas(invoiceRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "invoice.png"; // Change to desired image format
      link.click();
    }
  };

  const exportExcel = () => {
    const orderDetails = [
      { Label: "Order ID", Value: currentOrder.id },
      {
        Label: "User Name",
        Value: `${currentOrder?.user?.firstName} ${currentOrder?.user?.lastName}`,
      },
      { Label: "User Email", Value: currentOrder.user?.email || "" },
      { Label: "User Phone", Value: currentOrder.user?.phoneNumber ?? "N/A" },
      {
        Label: "Shipping Address",
        Value: `${currentOrder.selectedAddress?.street ?? "N/A"}, ${
          currentOrder.selectedAddress?.city ?? "N/A"
        }, ${currentOrder.selectedAddress?.state ?? "N/A"}, ${
          currentOrder.selectedAddress?.country ?? "N/A"
        }`,
      },
      { Label: "Total Amount", Value: currentOrder.totalAmount },
      { Label: "Payment Method", Value: currentOrder.selectedPaymentMethod },
      {
        Label: "Expected Delivery Date",
        Value: new Date(
          currentOrder.expectedDeliveryDate ?? Date.now()
        ).toLocaleDateString(),
      },
      { Label: "Status", Value: currentOrder.status },
    ];

    const orderItems = currentOrder?.orderItems?.map((item) => ({
      "Product ID": item.productId,
      "Product Name": item.product?.name,
      Quantity: item.quantity,
      Price: item.price,
      Amount: (item.quantity * item.price).toFixed(2),
    }));

    const worksheet1 = XLSX.utils.json_to_sheet(orderDetails, {
      header: ["Label", "Value"],
    });
    const worksheet2 = XLSX.utils.json_to_sheet(orderItems || [], {
      header: ["Product ID", "Product Name", "Quantity", "Price", "Amount"],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Order Details");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Order Items");

    XLSX.writeFile(workbook, "order_invoice.xlsx");
  };

  const handleExport = (type: string) => {
    switch (type) {
      case "pdf":
        exportPDF();
        break;
      case "image":
        exportImage(); // Call exportImage instead of exportPNG
        break;

      case "excel":
        exportExcel();
        break;
      default:
        break;
    }
  };

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
                  <div
                    id="ec-header-btn"
                    className="ec-header-btn"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <button
                      className="btn btn-secondary "
                      type="button"
                      onClick={handlePrint}
                    >
                      Print
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="exportDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Export Options
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="exportDropdown"
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleExport("pdf")}
                          >
                            Export PDF
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleExport("excel")}
                          >
                            Export Excel
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleExport("image")}
                          >
                            Export Image
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="ec-vendor-card-body padding-b-0"
                  ref={invoiceRef}
                >
                  <div className="page-content">
                    <div className="page-header text-blue-d2">
                      <img src="/assets/images/logo/logo.png" alt="Site Logo" />
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
