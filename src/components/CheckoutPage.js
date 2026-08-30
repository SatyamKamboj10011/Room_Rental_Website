import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form
} from 'react-bootstrap';

import {
  FaCreditCard,
  FaCalendarAlt,
  FaUser,
  FaLock,
  FaHome,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaShieldAlt,
  FaChevronRight
} from 'react-icons/fa';

import BookingDataService from '../services/BookingDataService';
import { getFallbackImage } from '../utils/fallbackImage';


function CheckoutPage() {

  // ============================================================
  // EXISTING BOOKING DATA
  // ============================================================

  const { state } = useLocation();

  const {
    bookingData,
    listingId
  } = state || {};

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [listingDetails, setListingDetails] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [cardDetails, setCardDetails] =
    useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: '',
    });

  const [paymentMethod, setPaymentMethod] =
    useState('credit');

  const navigate =
    useNavigate();


  // ============================================================
  // FETCH LISTING
  // ============================================================

  useEffect(() => {

    if (!listingId || !bookingData) {

      setError(
        'Listing ID or booking data is missing. Cannot proceed.'
      );

      setLoading(false);

      return;

    }


    const fetchListingDetails =
      async () => {

        try {

          const data =
            await BookingDataService
              .getListingById(listingId);

          setListingDetails(data);

        } catch (error) {

          setError(
            'Error fetching listing details. Please try again later.'
          );

          console.error(
            'Error fetching listing details:',
            error
          );

        } finally {

          setLoading(false);

        }

      };


    fetchListingDetails();

  }, [listingId]);


  // ============================================================
  // INPUT HANDLING
  // ============================================================

  const handleInputChange =
    (e) => {

      const {
        name,
        value
      } = e.target;


      // Format card number
      if (name === 'cardNumber') {

        const formattedValue =
          value
            .replace(/\s/g, '')
            .replace(
              /(\d{4})/g,
              '$1 '
            )
            .trim();

        setCardDetails(
          prev => ({
            ...prev,
            [name]:
              formattedValue
                .slice(0, 19)
          })
        );

        return;

      }


      setCardDetails(
        prev => ({
          ...prev,
          [name]: value
        })
      );

    };


  // ============================================================
  // CONFIRM PAYMENT
  // EXISTING FUNCTIONALITY PRESERVED
  // ============================================================

  const handleConfirmPayment =
    async () => {

      setIsSubmitting(true);

      setError(null);


      // Basic validation
      if (
        !cardDetails.cardNumber ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv ||
        !cardDetails.cardHolderName
      ) {

        setError(
          'Please fill in all card details.'
        );

        setIsSubmitting(false);

        return;

      }


      try {

        const bookingId =
          await BookingDataService
            .createBooking(
              bookingData,
              listingId
            );


        navigate(
          `/invoice/${bookingId}`
        );


      } catch (error) {

        console.error(
          'Error confirming payment:',
          error
        );

        setError(
          'There was an error confirming your booking. Please try again.'
        );

      } finally {

        setIsSubmitting(false);

      }

    };


  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (loading) {

    return (

      <div className="checkout-loading">

        <div className="loading-content">

          <div className="loading-icon">

            <Spinner animation="border" />

          </div>

          <h3>
            Preparing checkout
          </h3>

          <p>
            We're getting your booking details ready.
          </p>

        </div>

      </div>

    );

  }


  // ============================================================
  // MISSING DATA
  // ============================================================

  if (!bookingData || !listingId) {

    return (

      <div className="checkout-error-page">

        <div className="checkout-error-box">

          <div className="checkout-error-icon">
            !
          </div>

          <h2>
            Unable to continue
          </h2>

          <p>
            Your booking information is missing.
            Please return to the property and
            start the booking again.
          </p>

          <button
            className="primary-checkout-button"
            onClick={() =>
              navigate('/listings')
            }
          >
            Browse properties
          </button>

        </div>

      </div>

    );

  }


  // ============================================================
  // PROPERTY IMAGE
  // ============================================================

  const propertyImage =
    listingDetails?.image ||
    listingDetails?.images?.[0] ||
    getFallbackImage(
      listingDetails?.id
    );


  // ============================================================
  // PRICE
  // ============================================================

  const calculatedSubtotal =
    bookingData?.price *
    Math.ceil(
      bookingData?.nights / 7
    );


  const totalPrice =
    bookingData?.totalPrice ??
    calculatedSubtotal;


  // ============================================================
  // PAGE
  // ============================================================

  return (

    <div className="checkout-page">


      {/* ========================================================
          CUSTOM CSS
          ======================================================== */}

      <style>{`

        /* ======================================================
           BASE
           ====================================================== */

        .checkout-page {

          min-height:
            100vh;

          background:
            #F7F3EC;

          color:
            #1E3A2E;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          padding:
            0 0 70px;

        }


        /* ======================================================
           TOP NAV
           ====================================================== */

        .checkout-topbar {

          background:
            #ffffff;

          border-bottom:
            1px solid #e2e8f0;

          padding:
            17px 0;

        }


        .checkout-topbar-inner {

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

        }


        .checkout-back {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            8px;

          border:
            none;

          background:
            transparent;

          color:
            #475569;

          padding:
            0;

          font-size:
            14px;

          font-weight:
            750;

          cursor:
            pointer;

          transition:
            color 0.2s ease;

        }


        .checkout-back:hover {

          color:
            #C1622D;

        }


        .checkout-back svg {

          font-size:
            13px;

        }


        .secure-checkout {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          color:
            #1E3A2E;

          font-size:
            13px;

          font-weight:
            750;

        }


        .secure-checkout svg {

          font-size:
            16px;

        }


        /* ======================================================
           MAIN
           ====================================================== */

        .checkout-main {

          padding:
            38px 0 70px;

        }


        /* ======================================================
           HEADER
           ====================================================== */

        .checkout-eyebrow {

          color:
            #C1622D;

          font-size:
            12px;

          font-weight:
            850;

          letter-spacing:
            1.8px;

          margin-bottom:
            9px;

        }


        .checkout-title {

          margin:
            0 0 9px;

          font-size:
            clamp(35px, 4vw, 50px);

          line-height:
            1.05;

          letter-spacing:
            -1.8px;

          font-weight:
            850;

          color:
            #1E3A2E;

        }


        .checkout-subtitle {

          margin:
            0;

          color:
            #64748b;

          font-size:
            16px;

        }


        /* ======================================================
           STEPS
           ====================================================== */

        .checkout-steps {

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          margin:
            25px 0 30px;

        }


        .checkout-step {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          color:
            #94a3b8;

          font-size:
            12px;

          font-weight:
            750;

          white-space:
            nowrap;

        }


        .checkout-step-number {

          width:
            26px;

          height:
            26px;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            #e2e8f0;

          color:
            #64748b;

          font-size:
            12px;

          font-weight:
            800;

        }


        .checkout-step.completed,
        .checkout-step.active {

          color:
            #C1622D;

        }


        .checkout-step.completed
        .checkout-step-number {

          background:
            #C1622D;

          color:
            #ffffff;

        }


        .checkout-step.active
        .checkout-step-number {

          background:
            #C1622D;

          color:
            #ffffff;

          box-shadow:
            0 0 0 4px
            rgba(193, 98, 45,0.08);

        }


        .checkout-step-line {

          width:
            38px;

          height:
            1px;

          background:
            #dbe3ee;

        }


        /* ======================================================
           PAYMENT CARD
           ====================================================== */

        .payment-card {

          background:
            #ffffff;

          border:
            1px solid #e2e8f0;

          border-radius:
            17px;

          padding:
            28px;

          box-shadow:
            0 4px 18px
            rgba(15,23,42,0.035);

        }


        .payment-heading {

          display:
            flex;

          align-items:
            flex-start;

          gap:
            13px;

          margin-bottom:
            25px;

        }


        .payment-heading-icon {

          width:
            43px;

          height:
            43px;

          flex-shrink:
            0;

          border-radius:
            10px;

          background:
            #fbf1ea;

          color:
            #C1622D;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

        }


        .payment-heading-icon svg {

          font-size:
            20px;

        }


        .payment-heading h2 {

          margin:
            0 0 4px;

          font-size:
            23px;

          font-weight:
            800;

          letter-spacing:
            -0.5px;

        }


        .payment-heading p {

          margin:
            0;

          color:
            #64748b;

          font-size:
            13px;

        }


        /* ======================================================
           ALERT
           ====================================================== */

        .checkout-alert {

          border:
            1px solid #fecaca;

          border-radius:
            9px;

          background:
            #fef2f2;

          color:
            #b91c1c;

          padding:
            11px 13px;

          font-size:
            13px;

          margin-bottom:
            20px;

        }


        /* ======================================================
           PAYMENT METHODS
           ====================================================== */

        .method-title {

          margin:
            0 0 11px;

          color:
            #1E3A2E;

          font-size:
            13px;

          font-weight:
            800;

        }


        .payment-methods {

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            10px;

          margin-bottom:
            25px;

        }


        .payment-method {

          position:
            relative;

          min-height:
            80px;

          padding:
            14px;

          border:
            1px solid #e2e8f0;

          border-radius:
            11px;

          background:
            #ffffff;

          cursor:
            pointer;

          transition:
            all 0.2s ease;

        }


        .payment-method:hover {

          border-color:
            #dd925a;

          background:
            #f8fbff;

        }


        .payment-method.active {

          border-color:
            #C1622D;

          background:
            #fbf1ea;

          box-shadow:
            0 0 0 2px
            rgba(193, 98, 45,0.06);

        }


        .payment-method-check {

          position:
            absolute;

          top:
            9px;

          right:
            9px;

          width:
            17px;

          height:
            17px;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            #C1622D;

          color:
            white;

          font-size:
            10px;

        }


        .payment-method-icon {

          color:
            #C1622D;

          font-size:
            20px;

          margin-bottom:
            7px;

        }


        .paypal-wordmark {

          font-size:
            18px;

          font-weight:
            850;

          color:
            #C1622D;

          margin-bottom:
            7px;

        }


        .payment-method-name {

          color:
            #1E3A2E;

          font-size:
            13px;

          font-weight:
            750;

        }


        /* ======================================================
           FORM
           ====================================================== */

        .form-section {

          margin-top:
            5px;

        }


        .form-section-title {

          margin:
            0 0 14px;

          color:
            #1E3A2E;

          font-size:
            14px;

          font-weight:
            800;

        }


        .form-group-modern {

          margin-bottom:
            17px;

        }


        .form-label-modern {

          display:
            flex;

          align-items:
            center;

          gap:
            6px;

          margin-bottom:
            7px;

          color:
            #334155;

          font-size:
            13px;

          font-weight:
            750;

        }


        .form-label-modern svg {

          color:
            #C1622D;

          font-size:
            12px;

        }


        .modern-input {

          width:
            100%;

          min-height:
            45px;

          border:
            1px solid #e2e8f0;

          border-radius:
            9px;

          padding:
            10px 12px;

          background:
            #ffffff;

          color:
            #1E3A2E;

          font-size:
            14px;

          outline:
            none;

          transition:
            border 0.2s ease,
            box-shadow 0.2s ease;

        }


        .modern-input:focus {

          border-color:
            #dd925a;

          box-shadow:
            0 0 0 3px
            rgba(193, 98, 45,0.08);

        }


        .modern-input::placeholder {

          color:
            #94a3b8;

        }


        .input-with-icon {

          position:
            relative;

        }


        .input-with-icon svg {

          position:
            absolute;

          left:
            13px;

          top:
            50%;

          transform:
            translateY(-50%);

          color:
            #94a3b8;

          font-size:
            14px;

          pointer-events:
            none;

        }


        .input-with-icon .modern-input {

          padding-left:
            37px;

        }


        /* ======================================================
           SECURITY
           ====================================================== */

        .security-box {

          display:
            flex;

          align-items:
            flex-start;

          gap:
            10px;

          margin-top:
            22px;

          padding:
            13px;

          border:
            1px solid #d3e0d8;

          border-radius:
            10px;

          background:
            #eef3f0;

          color:
            #166534;

        }


        .security-icon {

          width:
            25px;

          height:
            25px;

          flex-shrink:
            0;

          border-radius:
            7px;

          background:
            #d3e0d8;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

        }


        .security-icon svg {

          font-size:
            13px;

        }


        .security-box strong {

          display:
            block;

          margin-bottom:
            2px;

          font-size:
            13px;

        }


        .security-box span {

          display:
            block;

          color:
            #4d7c5a;

          font-size:
            12px;

          line-height:
            1.4;

        }


        /* ======================================================
           PAYPAL
           ====================================================== */

        .paypal-panel {

          text-align:
            center;

          padding:
            25px 10px;

          border:
            1px solid #e2e8f0;

          border-radius:
            11px;

          background:
            #F7F3EC;

        }


        .paypal-large {

          color:
            #C1622D;

          font-size:
            30px;

          font-weight:
            900;

          margin-bottom:
            10px;

        }


        .paypal-panel p {

          max-width:
            390px;

          margin:
            0 auto 17px;

          color:
            #64748b;

          font-size:
            13px;

          line-height:
            1.5;

        }


        .paypal-button {

          border:
            none;

          border-radius:
            8px;

          background:
            #C1622D;

          color:
            white;

          padding:
            10px 18px;

          font-size:
            13px;

          font-weight:
            750;

        }


        /* ======================================================
           TRUST STRIP
           ====================================================== */

        .trust-strip {

          display:
            flex;

          flex-wrap:
            wrap;

          align-items:
            center;

          gap:
            18px;

          margin-top:
            22px;

          padding:
            14px 18px;

          border:
            1px solid #d3e0d8;

          border-radius:
            12px;

          background:
            #eef3f0;

        }

        .trust-item {

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          color:
            #1E3A2E;

          font-size:
            13px;

          font-weight:
            700;

        }

        .trust-item svg {

          color:
            #2f6849;

        }

        .trust-divider {

          width:
            1px;

          height:
            14px;

          background:
            #d3e0d8;

        }


        /* ======================================================
           SUMMARY CARD
           ====================================================== */

        .summary-card {

          position:
            sticky;

          top:
            20px;

          background:
            #ffffff;

          border:
            1px solid #e2e8f0;

          border-radius:
            17px;

          overflow:
            hidden;

          box-shadow:
            0 4px 18px
            rgba(15,23,42,0.035);

        }


        /* ======================================================
           SUMMARY IMAGE
           ====================================================== */

        .summary-image-wrapper {

          position:
            relative;

        }


        .summary-image {

          width:
            100%;

          height:
            205px;

          object-fit:
            cover;

          display:
            block;

        }


        .summary-image-overlay {

          position:
            absolute;

          left:
            0;

          right:
            0;

          bottom:
            0;

          height:
            65px;

          background:
            linear-gradient(
              transparent,
              rgba(0,0,0,0.35)
            );

        }


        .property-label {

          position:
            absolute;

          left:
            15px;

          bottom:
            13px;

          padding:
            5px 8px;

          border-radius:
            6px;

          background:
            rgba(15,23,42,0.72);

          color:
            #ffffff;

          font-size:
            10px;

          font-weight:
            800;

          letter-spacing:
            0.7px;

        }


        /* ======================================================
           SUMMARY CONTENT
           ====================================================== */

        .summary-content {

          padding:
            22px;

        }


        .summary-eyebrow {

          color:
            #C1622D;

          font-size:
            10px;

          font-weight:
            850;

          letter-spacing:
            1.5px;

          margin-bottom:
            7px;

        }


        .summary-title {

          margin:
            0 0 7px;

          color:
            #1E3A2E;

          font-size:
            22px;

          font-weight:
            800;

          line-height:
            1.2;

          letter-spacing:
            -0.5px;

        }


        .summary-location {

          display:
            flex;

          align-items:
            center;

          gap:
            6px;

          color:
            #64748b;

          font-size:
            13px;

        }


        .summary-location svg {

          color:
            #C1622D;

          font-size:
            12px;

        }


        /* ======================================================
           BOOKING DETAILS
           ====================================================== */

        .details-divider {

          height:
            1px;

          background:
            #e2e8f0;

          margin:
            19px 0;

        }


        .details-title {

          margin:
            0 0 12px;

          color:
            #1E3A2E;

          font-size:
            13px;

          font-weight:
            800;

        }


        .summary-detail {

          display:
            flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          gap:
            15px;

          margin-bottom:
            12px;

          font-size:
            13px;

        }


        .summary-detail-label {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          color:
            #64748b;

        }


        .summary-detail-label svg {

          color:
            #C1622D;

          font-size:
            13px;

        }


        .summary-detail-value {

          color:
            #1E3A2E;

          font-weight:
            700;

          text-align:
            right;

        }


        /* ======================================================
           PRICE BREAKDOWN
           ====================================================== */

        .price-section {

          padding:
            16px;

          border-radius:
            10px;

          background:
            #F7F3EC;

          border:
            1px solid #edf2f7;

        }


        .price-row {

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          margin-bottom:
            9px;

          color:
            #64748b;

          font-size:
            13px;

        }


        .price-row strong {

          color:
            #1E3A2E;

          font-weight:
            700;

        }


        .price-total-row {

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          padding-top:
            13px;

          margin-top:
            12px;

          border-top:
            1px solid #e2e8f0;

        }


        .price-total-row span {

          color:
            #1E3A2E;

          font-size:
            14px;

          font-weight:
            800;

        }


        .price-total-row strong {

          color:
            #C1622D;

          font-size:
            26px;

          font-weight:
            850;

          letter-spacing:
            -0.7px;

        }


        /* ======================================================
           CONFIRM BUTTON
           ====================================================== */

        .confirm-button {

          width:
            100%;

          min-height:
            51px;

          margin-top:
            17px;

          border:
            none;

          border-radius:
            9px;

          background:
            #C1622D;

          color:
            #ffffff;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            8px;

          font-size:
            14px;

          font-weight:
            750;

          cursor:
            pointer;

          transition:
            all 0.2s ease;

        }


        .confirm-button:hover:not(:disabled) {

          background:
            #a04f24;

          transform:
            translateY(-1px);

          box-shadow:
            0 9px 22px
            rgba(193, 98, 45,0.18);

        }


        .confirm-button:disabled {

          opacity:
            0.7;

          cursor:
            not-allowed;

        }


        .terms {

          margin:
            11px 0 0;

          text-align:
            center;

          color:
            #94a3b8;

          font-size:
            10px;

          line-height:
            1.5;

        }


        .terms a {

          color:
            #64748b;

          text-decoration:
            underline;

        }


        /* ======================================================
           LOADING
           ====================================================== */

        .checkout-loading {

          min-height:
            100vh;

          background:
            #F7F3EC;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          text-align:
            center;

        }


        .loading-content {

          padding:
            30px;

        }


        .loading-icon {

          color:
            #C1622D;

          margin-bottom:
            17px;

        }


        .loading-content h3 {

          margin:
            0 0 7px;

          font-size:
            20px;

          font-weight:
            800;

        }


        .loading-content p {

          margin:
            0;

          color:
            #64748b;

          font-size:
            13px;

        }


        /* ======================================================
           ERROR PAGE
           ====================================================== */

        .checkout-error-page {

          min-height:
            100vh;

          background:
            #F7F3EC;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            20px;

        }


        .checkout-error-box {

          width:
            100%;

          max-width:
            430px;

          padding:
            35px;

          text-align:
            center;

          background:
            #ffffff;

          border:
            1px solid #e2e8f0;

          border-radius:
            16px;

        }


        .checkout-error-icon {

          width:
            44px;

          height:
            44px;

          margin:
            0 auto 15px;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            #fef2f2;

          color:
            #dc2626;

          font-size:
            24px;

          font-weight:
            800;

        }


        .checkout-error-box h2 {

          margin:
            0 0 8px;

          font-size:
            24px;

          font-weight:
            800;

        }


        .checkout-error-box p {

          margin:
            0 0 20px;

          color:
            #64748b;

          font-size:
            14px;

          line-height:
            1.6;

        }


        .primary-checkout-button {

          border:
            none;

          border-radius:
            8px;

          padding:
            11px 20px;

          background:
            #C1622D;

          color:
            white;

          font-size:
            13px;

          font-weight:
            750;

        }


        /* ======================================================
           MOBILE
           ====================================================== */

        @media (max-width: 991px) {

          .summary-card {

            position:
              relative;

            top:
              auto;

            margin-top:
              20px;

          }

        }


        @media (max-width: 767px) {

          .checkout-main {

            padding:
              28px 0 45px;

          }


          .checkout-title {

            font-size:
              37px;

          }


          .checkout-steps {

            overflow-x:
              auto;

            padding-bottom:
              4px;

          }


          .checkout-step {

            flex-shrink:
              0;

          }


          .checkout-step-line {

            width:
              20px;

            flex-shrink:
              0;

          }


          .payment-card {

            padding:
              20px;

            border-radius:
              14px;

          }


          .payment-methods {

            grid-template-columns:
              1fr;

          }


          .summary-image {

            height:
              190px;

          }


          .summary-content {

            padding:
              20px;

          }

        }


        @media (max-width: 480px) {

          .checkout-page {

            padding-bottom:
              30px;

          }


          .checkout-topbar {

            padding:
              14px 0;

          }


          .secure-checkout {

            font-size:
              10px;

          }


          .checkout-title {

            font-size:
              32px;

          }


          .checkout-subtitle {

            font-size:
              13px;

          }


          .payment-card {

            padding:
              17px;

          }

        }

      `}</style>



      {/* ========================================================
          TOP BAR
          ======================================================== */}

      <div className="checkout-topbar">

        <Container>

          <div className="checkout-topbar-inner">

            <button
              className="checkout-back"
              type="button"
              onClick={() =>
                navigate(-1)
              }
            >

              <FaArrowLeft />

              Back to booking

            </button>


            <div className="secure-checkout">

              <FaShieldAlt />

              Secure checkout

            </div>

          </div>

        </Container>

      </div>



      {/* ========================================================
          MAIN
          ======================================================== */}

      <main className="checkout-main">

        <Container>


          {/* ====================================================
              HEADER
              ==================================================== */}

          <div className="checkout-eyebrow">
            FINAL STEP
          </div>


          <h1 className="checkout-title">
            Complete your booking
          </h1>


          <p className="checkout-subtitle">
            Review your reservation and securely
            complete your booking.
          </p>



          {/* ====================================================
              STEPS
              ==================================================== */}

          <div className="checkout-steps">


            <div className="checkout-step completed">

              <div className="checkout-step-number">

                <FaCheckCircle />

              </div>

              Booking details

            </div>


            <div className="checkout-step-line"></div>


            <div className="checkout-step active">

              <div className="checkout-step-number">
                2
              </div>

              Payment

            </div>


            <div className="checkout-step-line"></div>


            <div className="checkout-step">

              <div className="checkout-step-number">
                3
              </div>

              Confirmation

            </div>

          </div>



          {/* ====================================================
              ERROR
              ==================================================== */}

          {error && (

            <div className="checkout-alert">

              {error}

            </div>

          )}



          {/* ====================================================
              MAIN GRID
              ==================================================== */}

          <Row className="g-4">


            {/* ==================================================
                PAYMENT
                ================================================== */}

            <Col
              lg={7}
              xl={8}
            >

              <div className="payment-card">


                {/* PAYMENT HEADING */}

                <div className="payment-heading">

                  <div className="payment-heading-icon">

                    <FaCreditCard />

                  </div>

                  <div>

                    <h2>
                      Payment method
                    </h2>

                    <p>
                      Choose how you'd like to
                      complete your reservation.
                    </p>

                  </div>

                </div>



                {/* ==================================================
                    METHOD SELECTOR
                    ================================================== */}

                <div className="method-title">
                  Select payment method
                </div>


                <div className="payment-methods">


                  {/* CREDIT CARD */}

                  <div
                    className={
                      `payment-method ${
                        paymentMethod === 'credit'
                          ? 'active'
                          : ''
                      }`
                    }
                    onClick={() =>
                      setPaymentMethod(
                        'credit'
                      )
                    }
                  >

                    {paymentMethod ===
                      'credit' && (

                      <div className="payment-method-check">

                        <FaCheckCircle />

                      </div>

                    )}


                    <FaCreditCard
                      className="payment-method-icon"
                    />


                    <div className="payment-method-name">

                      Credit / Debit Card

                    </div>

                  </div>



                  {/* PAYPAL */}

                  <div
                    className={
                      `payment-method ${
                        paymentMethod === 'paypal'
                          ? 'active'
                          : ''
                      }`
                    }
                    onClick={() =>
                      setPaymentMethod(
                        'paypal'
                      )
                    }
                  >

                    {paymentMethod ===
                      'paypal' && (

                      <div className="payment-method-check">

                        <FaCheckCircle />

                      </div>

                    )}


                    <div className="paypal-wordmark">
                      PayPal
                    </div>


                    <div className="payment-method-name">

                      Pay securely with PayPal

                    </div>

                  </div>

                </div>



                {/* ==================================================
                    CREDIT CARD FORM
                    ================================================== */}

                {paymentMethod === 'credit' && (

                  <div className="form-section">

                    <h3 className="form-section-title">

                      Card information

                    </h3>


                    <Form>


                      {/* CARD HOLDER */}

                      <div className="form-group-modern">

                        <label className="form-label-modern">

                          <FaUser />

                          Cardholder name

                        </label>


                        <div className="input-with-icon">

                          <FaUser />

                          <input
                            type="text"
                            name="cardHolderName"
                            className="modern-input"
                            placeholder="Enter the name on your card"
                            value={
                              cardDetails.cardHolderName
                            }
                            onChange={
                              handleInputChange
                            }
                            required
                          />

                        </div>

                      </div>



                      {/* CARD NUMBER */}

                      <div className="form-group-modern">

                        <label className="form-label-modern">

                          <FaCreditCard />

                          Card number

                        </label>


                        <div className="input-with-icon">

                          <FaCreditCard />

                          <input
                            type="text"
                            name="cardNumber"
                            className="modern-input"
                            placeholder="1234 5678 9012 3456"
                            value={
                              cardDetails.cardNumber
                            }
                            onChange={
                              handleInputChange
                            }
                            maxLength={19}
                            inputMode="numeric"
                            required
                          />

                        </div>

                      </div>



                      {/* EXPIRY + CVV */}

                      <Row>


                        <Col md={6}>

                          <div className="form-group-modern">

                            <label className="form-label-modern">

                              <FaCalendarAlt />

                              Expiry date

                            </label>


                            <div className="input-with-icon">

                              <FaCalendarAlt />

                              <input
                                type="month"
                                name="expiryDate"
                                className="modern-input"
                                value={
                                  cardDetails.expiryDate
                                }
                                onChange={
                                  handleInputChange
                                }
                                required
                              />

                            </div>

                          </div>

                        </Col>



                        <Col md={6}>

                          <div className="form-group-modern">

                            <label className="form-label-modern">

                              <FaLock />

                              CVV

                            </label>


                            <div className="input-with-icon">

                              <FaLock />

                              <input
                                type="password"
                                name="cvv"
                                className="modern-input"
                                placeholder="123"
                                value={
                                  cardDetails.cvv
                                }
                                onChange={
                                  handleInputChange
                                }
                                maxLength={4}
                                inputMode="numeric"
                                required
                              />

                            </div>

                          </div>

                        </Col>

                      </Row>

                    </Form>


                    {/* SECURITY */}

                    <div className="security-box">

                      <div className="security-icon">

                        <FaLock />

                      </div>

                      <div>

                        <strong>
                          Your payment is secure
                        </strong>

                        <span>
                          Your card information is
                          protected during checkout.
                        </span>

                      </div>

                    </div>

                  </div>

                )}



                {/* ==================================================
                    PAYPAL
                    ================================================== */}

                {paymentMethod === 'paypal' && (

                  <div className="paypal-panel">

                    <div className="paypal-large">
                      PayPal
                    </div>

                    <p>
                      You'll be redirected to PayPal
                      to complete your payment securely.
                    </p>

                    <button
                      type="button"
                      className="paypal-button"
                    >
                      Continue with PayPal
                    </button>

                  </div>

                )}


              </div>


              {/* TRUST STRIP */}

              <div className="trust-strip">

                <div className="trust-item">
                  <FaShieldAlt />
                  OtagoRentals guarantee
                </div>

                <div className="trust-divider"></div>

                <div className="trust-item">
                  24/7 support
                </div>

                <div className="trust-divider"></div>

                <div className="trust-item">
                  100% secure payments
                </div>

              </div>

            </Col>



            {/* ==================================================
                SUMMARY
                ================================================== */}

            <Col
              lg={5}
              xl={4}
            >

              <div className="summary-card">


                {/* PROPERTY IMAGE */}

                <div className="summary-image-wrapper">

                  <img
                    src={propertyImage}
                    alt={
                      listingDetails?.title ||
                      'Rental property'
                    }
                    className="summary-image"
                  />

                  <div className="summary-image-overlay"></div>

                  <div className="property-label">

                    RENTAL PROPERTY

                  </div>

                </div>



                {/* SUMMARY CONTENT */}

                <div className="summary-content">


                  <div className="summary-eyebrow">
                    YOUR RESERVATION
                  </div>


                  <h2 className="summary-title">

                    {listingDetails?.title}

                  </h2>


                  <div className="summary-location">

                    <FaMapMarkerAlt />

                    {listingDetails?.location ||
                      'Location unavailable'}

                  </div>



                  {/* DETAILS */}

                  <div className="details-divider"></div>


                  <h3 className="details-title">

                    Booking details

                  </h3>


                  {/* GUEST */}

                  <div className="summary-detail">

                    <div className="summary-detail-label">

                      <FaUser />

                      Guest

                    </div>

                    <div className="summary-detail-value">

                      {bookingData?.guestName}

                    </div>

                  </div>



                  {/* CHECK IN */}

                  <div className="summary-detail">

                    <div className="summary-detail-label">

                      <FaCalendarAlt />

                      Check-in

                    </div>

                    <div className="summary-detail-value">

                      {bookingData?.checkInDate
                        ? new Date(
                            bookingData.checkInDate
                          ).toLocaleDateString(
                            'en-NZ',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }
                          )
                        : '-'}

                    </div>

                  </div>



                  {/* CHECK OUT */}

                  <div className="summary-detail">

                    <div className="summary-detail-label">

                      <FaCalendarAlt />

                      Check-out

                    </div>

                    <div className="summary-detail-value">

                      {bookingData?.checkOutDate
                        ? new Date(
                            bookingData.checkOutDate
                          ).toLocaleDateString(
                            'en-NZ',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }
                          )
                        : '-'}

                    </div>

                  </div>



                  {/* NIGHTS */}

                  <div className="summary-detail">

                    <div className="summary-detail-label">

                      <FaHome />

                      Stay duration

                    </div>

                    <div className="summary-detail-value">

                      {bookingData?.nights}
                      {' '}
                      {bookingData?.nights === 1
                        ? 'night'
                        : 'nights'}

                    </div>

                  </div>



                  {/* PRICE */}

                  <div className="details-divider"></div>


                  <div className="price-section">


                    <div className="price-row">

                      <span>
                        Weekly rate
                      </span>

                      <strong>
                        ${bookingData?.price}
                      </strong>

                    </div>


                    <div className="price-row">

                      <span>
                        {Math.ceil(
                          bookingData?.nights / 7
                        )}
                        {' '}
                        {Math.ceil(
                          bookingData?.nights / 7
                        ) === 1
                          ? 'week'
                          : 'weeks'}
                      </span>

                      <strong>
                        ${calculatedSubtotal}
                      </strong>

                    </div>


                    <div className="price-row">

                      <span>
                        Service fee
                      </span>

                      <strong>
                        $0
                      </strong>

                    </div>


                    <div className="price-row">

                      <span>
                        Taxes
                      </span>

                      <strong>
                        $0
                      </strong>

                    </div>


                    <div className="price-total-row">

                      <span>
                        Total
                      </span>

                      <strong>
                        ${totalPrice}
                      </strong>

                    </div>

                  </div>


                  {/* CONFIRM */}

                  <button
                    type="button"
                    className="confirm-button"
                    onClick={
                      handleConfirmPayment
                    }
                    disabled={
                      isSubmitting
                    }
                  >

                    {isSubmitting ? (

                      <>

                        <Spinner
                          animation="border"
                          size="sm"
                        />

                        Processing...

                      </>

                    ) : (

                      <>

                        <FaCheckCircle />

                        Confirm booking

                        <FaChevronRight />

                      </>

                    )}

                  </button>


                  {/* TERMS */}

                  <p className="terms">

                    By completing this booking,
                    you agree to our{' '}

                    <Link to="/terms">
                      Terms of Service
                    </Link>

                    {' '}and{' '}

                    <Link to="/privacy">
                      Privacy Policy
                    </Link>

                  </p>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </main>

    </div>

  );

}


export default CheckoutPage;