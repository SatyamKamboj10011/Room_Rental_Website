import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import BookingDataService from "../services/BookingDataService";
import { format, differenceInCalendarDays } from "date-fns";
import { FaDownload, FaCheckCircle } from "react-icons/fa";

const BRAND = "OtagoRentals";
const ACCENT = [193, 98, 45]; // #C1622D (clay)
const PINE = [30, 58, 46]; // #1E3A2E
const DARK = [30, 58, 46];
const MUTED = [107, 100, 89];

function InvoicePage() {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const data = await BookingDataService.getBookingDetailsById(bookingId);
      if (!data || !data.guestName || !data.checkInDate) {
        throw new Error("No booking found or data is incomplete");
      }
      setBookingDetails(data);
    } catch (err) {
      setError(err.message || "Error fetching booking details");
    } finally {
      setLoading(false);
    }
  };

  const getNights = () => {
    const nights = differenceInCalendarDays(
      new Date(bookingDetails.checkOutDate),
      new Date(bookingDetails.checkInDate)
    );
    return nights > 0 ? nights : 1;
  };

  const downloadInvoice = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF();
      const nights = getNights();
      const total =
        parseFloat(bookingDetails.totalPrice ?? bookingDetails.price) || 0;
      const rate = total / nights;
      const invoiceNo = `INV-${bookingId.slice(0, 8).toUpperCase()}`;
      const issuedDate = format(new Date(), "PPP");
      const formattedCheckIn = format(new Date(bookingDetails.checkInDate), "PPP");
      const formattedCheckOut = format(new Date(bookingDetails.checkOutDate), "PPP");

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 16;
      const tableLeft = marginX;
      const tableRight = pageWidth - marginX;
      const paidDate = format(new Date(), "dd/MM/yyyy");

      // ================= HEADER =================
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("OTAGORENTALS", marginX, 20);

      doc.setTextColor(...PINE);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("INVOICE", marginX, 32);

      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("INVOICE AMOUNT", tableRight, 18, { align: "right" });
      doc.setTextColor(...PINE);
      doc.setFontSize(20);
      doc.text(`$${total.toFixed(2)}`, tableRight, 30, { align: "right" });

      doc.setDrawColor(...PINE);
      doc.setLineWidth(0.6);
      doc.line(marginX, 38, tableRight, 38);

      // ================= 3-COLUMN INFO BLOCK =================
      const colWidth = (tableRight - tableLeft) / 3;
      const col1 = tableLeft;
      const col2 = tableLeft + colWidth;
      const col3 = tableLeft + colWidth * 2;

      let y = 48;
      doc.setTextColor(...PINE);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("INVOICE DETAILS", col1, y);
      doc.text("PROPERTY", col2, y);
      doc.text("GUEST", col3, y);

      const infoRows = [
        [`No. ${invoiceNo}`, bookingDetails.roomTitle || "—", bookingDetails.guestName || "—"],
        [`Issued: ${issuedDate}`, bookingDetails.roomLocation || "—", bookingDetails.guestEmail || "—"],
        [`Booking Ref: ${bookingId.slice(0, 10).toUpperCase()}`, `Check-in: ${formattedCheckIn}`, "Payment: Credit card"],
        [`Amount: $${total.toFixed(2)} NZD`, `Check-out: ${formattedCheckOut}`, "Status: Paid"],
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.8);
      infoRows.forEach((row, i) => {
        const rowY = y + 6 + i * 5.5;
        doc.setTextColor(...MUTED);
        row.forEach((cell, colIdx) => {
          const x = [col1, col2, col3][colIdx];
          const text = cell.length > 34 ? cell.slice(0, 31) + "..." : cell;
          doc.text(text, x, rowY);
        });
      });

      // ================= LINE ITEMS TABLE =================
      y = 82;
      const colDesc = tableLeft + 3;
      const colDates = tableLeft + 60;
      const colNights = pageWidth - 76;
      const colRate = pageWidth - 55;
      const rowH = 9;

      doc.setFillColor(...PINE);
      doc.rect(tableLeft, y, tableRight - tableLeft, rowH, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("DESCRIPTION", colDesc, y + 6);
      doc.text("DATES", colDates, y + 6);
      doc.text("NIGHTS", colNights, y + 6, { align: "right" });
      doc.text("RATE", colRate, y + 6, { align: "right" });
      doc.text("AMOUNT", tableRight - 3, y + 6, { align: "right" });

      y += rowH;
      doc.setDrawColor(220, 214, 201);
      doc.setLineWidth(0.2);
      doc.rect(tableLeft, y, tableRight - tableLeft, rowH, "S");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...DARK);
      const descLine = bookingDetails.roomTitle || "Room booking";
      doc.text(descLine.length > 22 ? descLine.slice(0, 19) + "..." : descLine, colDesc, y + 6);
      doc.text(
        `${format(new Date(bookingDetails.checkInDate), "dd MMM")} - ${format(new Date(bookingDetails.checkOutDate), "dd MMM")}`,
        colDates,
        y + 6
      );
      doc.text(String(nights), colNights, y + 6, { align: "right" });
      doc.text(`$${rate.toFixed(2)}`, colRate, y + 6, { align: "right" });
      doc.text(`$${total.toFixed(2)}`, tableRight - 3, y + 6, { align: "right" });

      // a couple of empty rows for a genuine ledger feel
      for (let i = 0; i < 2; i++) {
        y += rowH;
        doc.rect(tableLeft, y, tableRight - tableLeft, rowH, "S");
      }

      y += rowH + 12;

      // ================= TOTALS BLOCK (right) =================
      const totalsLabelX = pageWidth - 78;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...MUTED);
      doc.text("Subtotal", totalsLabelX, y);
      doc.setTextColor(...DARK);
      doc.text(`$${total.toFixed(2)}`, tableRight - 3, y, { align: "right" });

      y += 6;
      doc.setTextColor(...MUTED);
      doc.text("Service fee", totalsLabelX, y);
      doc.setTextColor(...DARK);
      doc.text("$0.00", tableRight - 3, y, { align: "right" });

      y += 6;
      doc.setTextColor(...MUTED);
      doc.text("Taxes", totalsLabelX, y);
      doc.setTextColor(...DARK);
      doc.text("$0.00", tableRight - 3, y, { align: "right" });

      y += 4;
      doc.setDrawColor(200, 200, 200);
      doc.line(totalsLabelX - 3, y, tableRight, y);

      const totalsBlockTopY = y - 6 * 3 - 4;

      y += 9;
      doc.setFillColor(...PINE);
      doc.rect(totalsLabelX - 3, y - 7, tableRight - (totalsLabelX - 3), 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("TOTAL PAID", totalsLabelX, y + 1);
      doc.text(`$${total.toFixed(2)} NZD`, tableRight - 3, y + 1, { align: "right" });

      // ================= TERMS & PAYMENT INFO (left) =================
      let leftY = totalsBlockTopY;
      doc.setTextColor(...PINE);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text("Terms & Conditions", marginX, leftY);
      leftY += 5;
      doc.setTextColor(...MUTED);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.3);
      doc.text("Payment is due on the invoice date shown above.", marginX, leftY);
      leftY += 4.2;
      doc.text("Late payments may be subject to a late fee.", marginX, leftY);

      leftY += 8;
      doc.setTextColor(...PINE);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text("Payment Information", marginX, leftY);
      leftY += 5;
      doc.setTextColor(...MUTED);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.3);
      doc.text("We accept Visa and Mastercard, and secure online payments.", marginX, leftY);

      // PAID stamp — bordered, rotated, like a real receipt stamp
      doc.setDrawColor(...ACCENT);
      doc.setLineWidth(0.8);
      doc.saveGraphicsState && doc.saveGraphicsState();
      doc.setTextColor(...ACCENT);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("PAID", marginX + 10, leftY + 22, { angle: 12 });
      doc.rect(marginX, leftY + 15, 26, 12);
      doc.restoreGraphicsState && doc.restoreGraphicsState();

      // ================= SIGNATURE =================
      const signatureY = pageHeight - 34;
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.3);
      doc.line(tableRight - 60, signatureY, tableRight, signatureY);
      doc.setTextColor(...MUTED);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Acceptance Signature", tableRight, signatureY + 5, { align: "right" });

      // ================= FOOTER =================
      const footerY = pageHeight - 16;
      doc.setDrawColor(224, 224, 224);
      doc.setLineWidth(0.2);
      doc.line(marginX, footerY - 6, pageWidth - marginX, footerY - 6);
      doc.setTextColor(...MUTED);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Payment received on ${paidDate}. Thank you for booking with OtagoRentals!`, marginX, footerY);
      doc.text("Page 1 of 1", pageWidth - marginX, footerY, { align: "right" });

      doc.save(`${invoiceNo}.pdf`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <div className="alert alert-danger d-inline-block">{error}</div>
        <div>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </Container>
    );
  }

  const nights = getNights();
  const total =
    parseFloat(bookingDetails.totalPrice ?? bookingDetails.price) || 0;
  const rate = total / nights;
  const formattedCheckIn = format(new Date(bookingDetails.checkInDate), "PPP");
  const formattedCheckOut = format(new Date(bookingDetails.checkOutDate), "PPP");

  const serviceFee = 0;
  const taxes = 0;
  const grandTotal = total + serviceFee + taxes;

  return (
    <div className="invoice-page">
      <style>{`
        .invoice-page {
          background: #F7F3EC;
          min-height: 100vh;
          padding: 3rem 1.25rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1E3A2E;
        }

        .invoice-shell {
          max-width: 760px;
          margin: 0 auto;
        }

        .invoice-breadcrumb {
          color: #6b6459;
          font-size: 0.85rem;
          margin-bottom: 0.35rem;
        }

        .invoice-breadcrumb span {
          color: #C1622D;
          font-weight: 600;
        }

        .invoice-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .invoice-top h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 1.9rem;
          margin: 0 0 0.25rem;
        }

        .invoice-top p {
          color: #6b6459;
          font-size: 0.92rem;
          margin: 0;
        }

        .invoice-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #eef3f0;
          border: 1px solid #d3e0d8;
          color: #1E3A2E;
          padding: 0.5rem 0.9rem;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .invoice-status svg {
          color: #2f6849;
        }

        .invoice-section {
          background: white;
          border: 1px solid #e6ddcf;
          border-radius: 16px;
          margin-bottom: 1.25rem;
          overflow: hidden;
        }

        .invoice-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.35rem;
          border-bottom: 1px solid #e6ddcf;
        }

        .invoice-section-head h2 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
        }

        .invoice-section-head .ref {
          color: #6b6459;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .bill-stay-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          padding: 1.35rem;
        }

        .bill-stay-grid .label {
          text-transform: uppercase;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #6b6459;
          margin-bottom: 0.35rem;
        }

        .bill-stay-grid .name {
          font-weight: 700;
          margin-bottom: 0.15rem;
        }

        .bill-stay-grid .sub {
          color: #6b6459;
          font-size: 0.85rem;
        }

        .invoice-table {
          width: 100%;
          border-collapse: collapse;
        }

        .invoice-table th {
          text-align: left;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          color: #6b6459;
          background: #F7F3EC;
          padding: 0.75rem 1.35rem;
          font-weight: 700;
        }

        .invoice-table th:last-child,
        .invoice-table td:last-child {
          text-align: right;
        }

        .invoice-table td {
          padding: 0.9rem 1.35rem;
          border-top: 1px solid #e6ddcf;
          font-size: 0.92rem;
        }

        .invoice-summary-tiles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .invoice-summary-tiles > div {
          padding: 1.1rem 1.35rem;
          border-right: 1px solid #e6ddcf;
        }

        .invoice-summary-tiles > div:last-child {
          border-right: 0;
        }

        .invoice-summary-tiles .tile-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #6b6459;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .invoice-summary-tiles .tile-value {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .invoice-summary-tiles .grand .tile-value {
          color: #C1622D;
        }

        .payment-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.35rem;
        }

        .payment-summary-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .payment-summary-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #fbf1ea;
          color: #C1622D;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .payment-summary-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #2f6849;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .payment-summary-status .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2f6849;
        }

        .invoice-download-btn {
          background: #1E3A2E;
          border: none;
          border-radius: 10px;
          padding: 0.8rem 1.75rem;
          font-weight: 700;
        }

        .invoice-download-btn:hover {
          background: #12241c;
        }

        @media (max-width: 620px) {
          .bill-stay-grid {
            grid-template-columns: 1fr;
          }

          .invoice-summary-tiles {
            grid-template-columns: 1fr;
          }

          .invoice-summary-tiles > div {
            border-right: 0;
            border-bottom: 1px solid #e6ddcf;
          }

          .invoice-summary-tiles > div:last-child {
            border-bottom: 0;
          }

          .invoice-table {
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="invoice-shell">
        <div className="invoice-breadcrumb">
          Bookings / <span>INV-{bookingId.slice(0, 8).toUpperCase()}</span>
        </div>

        <div className="invoice-top">
          <div>
            <h1>Invoice</h1>
            <p>Track your order breakdown and payment status for this booking.</p>
          </div>
          <div className="invoice-status">
            <FaCheckCircle />
            Payment confirmed
          </div>
        </div>

        {/* ORDER BREAKDOWN */}
        <div className="invoice-section">
          <div className="invoice-section-head">
            <h2>Order breakdown</h2>
            <span className="ref">#{bookingId.slice(0, 10).toUpperCase()}</span>
          </div>

          <div className="bill-stay-grid">
            <div>
              <div className="label">Bill to</div>
              <div className="name">{bookingDetails.guestName}</div>
              <div className="sub">{bookingDetails.guestEmail}</div>
            </div>
            <div>
              <div className="label">Stay details</div>
              <div className="name">{bookingDetails.roomTitle}</div>
              <div className="sub">{bookingDetails.roomLocation}</div>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nights</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bookingDetails.roomTitle || "Room booking"}</td>
                <td>{formattedCheckIn}</td>
                <td>{formattedCheckOut}</td>
                <td>{nights}</td>
                <td>${rate.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="invoice-summary-tiles">
            <div>
              <div className="tile-label">Subtotal</div>
              <div className="tile-value">${total.toFixed(2)}</div>
            </div>
            <div>
              <div className="tile-label">Taxes & fees</div>
              <div className="tile-value">${(serviceFee + taxes).toFixed(2)}</div>
            </div>
            <div className="grand">
              <div className="tile-label">Grand total</div>
              <div className="tile-value">${grandTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="invoice-section">
          <div className="invoice-section-head">
            <h2>Payment summary</h2>
          </div>

          <div className="payment-summary-row">
            <div className="payment-summary-left">
              <div className="payment-summary-icon">
                <FaCheckCircle />
              </div>
              <div>
                <div className="name" style={{ fontWeight: 700 }}>Credit / debit card</div>
                <div className="sub" style={{ color: "#6b6459", fontSize: "0.85rem" }}>Charged on {format(new Date(), "PPP")}</div>
              </div>
            </div>
            <div className="payment-summary-status">
              <span className="dot"></span>
              Paid
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Button
            className="invoice-download-btn"
            onClick={downloadInvoice}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <FaDownload className="me-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
