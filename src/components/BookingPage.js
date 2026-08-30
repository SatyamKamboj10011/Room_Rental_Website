import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert
} from 'react-bootstrap';

import {
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom';

import BookingDataService from '../services/BookingDataService';

import {
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaStar,
  FaHome,
  FaClock
} from 'react-icons/fa';

import { IoIosArrowForward } from 'react-icons/io';


function BookingPage() {

  // ============================================================
  // EXISTING STATE — PRESERVED
  // ============================================================

  const {
    listingId: paramListingId
  } = useParams();

  const {
    state
  } = useLocation();

  const [
    bookingDetails,
    setBookingDetails
  ] = useState(
    state?.listingData || null
  );

  const [
    images,
    setImages
  ] = useState(
    state?.images || []
  );

  const [
    checkInDate,
    setCheckInDate
  ] = useState('');

  const [
    checkOutDate,
    setCheckOutDate
  ] = useState('');

  const [
    guestName,
    setGuestName
  ] = useState('');

  const [
    guestEmail,
    setGuestEmail
  ] = useState('');

  const [
    error,
    setError
  ] = useState('');

  const [
    loading,
    setLoading
  ] = useState(
    !state?.listingData
  );

  const [
    nights,
    setNights
  ] = useState(0);

  const [
    totalPrice,
    setTotalPrice
  ] = useState(0);

  const navigate =
    useNavigate();

  const listingId =
    paramListingId ||
    state?.listingId;


  // ============================================================
  // CALCULATE PRICE — EXISTING LOGIC PRESERVED
  // ============================================================

  useEffect(() => {

    if (
      checkInDate &&
      checkOutDate &&
      bookingDetails
    ) {

      const diffTime =
        Math.abs(
          new Date(checkOutDate) -
          new Date(checkInDate)
        );

      const diffDays =
        Math.ceil(
          diffTime /
          (1000 * 60 * 60 * 24)
        );

      const weeks =
        Math.ceil(
          diffDays / 7
        );

      setNights(diffDays);

      setTotalPrice(
        weeks *
        bookingDetails.price
      );

    }

  }, [
    checkInDate,
    checkOutDate,
    bookingDetails
  ]);


  // ============================================================
  // FETCH LISTING — EXISTING LOGIC PRESERVED
  // ============================================================

  useEffect(() => {

    const currentListingId =
      listingId ||
      state?.listingId;

    if (!currentListingId) {

      setError(
        'Listing ID is missing'
      );

      setLoading(false);

      return;

    }


    const fetchData =
      async () => {

        try {

          const data =
            await BookingDataService
              .getListingById(
                currentListingId
              );

          setBookingDetails(data);


          if (!images.length) {

            setImages(
              [
                data.image,
                ...(data.images || [])
              ].filter(
                (
                  img,
                  idx,
                  arr
                ) =>
                  img &&
                  arr.indexOf(img) === idx
              )
            );

          }

        } catch (error) {

          setError(
            'Error fetching listing details'
          );

          console.error(
            'Error fetching booking details:',
            error
          );

        } finally {

          setLoading(false);

        }

      };


    if (!state?.listingData) {

      fetchData();

    }

  }, [
    listingId,
    state
  ]);


  // ============================================================
  // SUBMIT BOOKING — EXISTING LOGIC PRESERVED
  // ============================================================

  const handleBookingSubmit =
    async () => {

      setError('');

      if (
        !checkInDate ||
        !checkOutDate ||
        !guestName ||
        !guestEmail
      ) {

        setError(
          'Please fill in all fields!'
        );

        return;

      }


      if (
        new Date(checkInDate) >=
        new Date(checkOutDate)
      ) {

        setError(
          'Check-out date must be after check-in date.'
        );

        return;

      }


      const bookingData = {

        guestName,

        guestEmail,

        checkInDate,

        checkOutDate,

        price:
          bookingDetails.price,

        totalPrice,

        nights,

        weeks:
          Math.ceil(
            nights / 7
          ),

        listingId,

        listingTitle:
          bookingDetails.title,

        listingImage:
          images[0] || ''

      };


      if (!listingId) {

        setError(
          'Listing ID is missing!'
        );

        return;

      }


      navigate(
        `/CheckoutPage/${listingId}`,
        {
          state: {
            bookingData,
            listingId
          }
        }
      );

    };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <div className="booking-loading">

        <div>

          <div className="loading-spinner">

            <Spinner animation="border" />

          </div>

          <p>
            Preparing your booking...
          </p>

        </div>

      </div>

    );

  }


  // ============================================================
  // ERROR
  // ============================================================

  if (error && !bookingDetails) {

    return (

      <div className="booking-error-page">

        <div className="error-box">

          <div className="error-symbol">
            !
          </div>

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <Button
            onClick={() =>
              navigate('/')
            }
            className="primary-action"
          >
            Return home
          </Button>

        </div>

      </div>

    );

  }


  // ============================================================
  // LISTING NOT FOUND
  // ============================================================

  if (!bookingDetails) {

    return (

      <div className="booking-error-page">

        <div className="error-box">

          <div className="error-symbol">
            ?
          </div>

          <h2>
            Listing not found
          </h2>

          <p>
            We couldn't find the property
            you're trying to book.
          </p>

          <Button
            onClick={() =>
              navigate('/listings')
            }
            className="primary-action"
          >
            Browse listings
          </Button>

        </div>

      </div>

    );

  }


  // ============================================================
  // DATE HELPERS
  // ============================================================

  const today =
    new Date()
      .toISOString()
      .split('T')[0];


  // ============================================================
  // PAGE
  // ============================================================

  return (

    <div className="booking-page">


      {/* ========================================================
          CUSTOM DESIGN
      ======================================================== */}

      <style>{`

        /* ======================================================
           BASE
        ====================================================== */

        .booking-page {

          --primary: #C1622D;
          --primary-dark: #a04f24;
          --primary-soft: #fbf1ea;

          --dark: #1E3A2E;
          --text: #334155;
          --muted: #64748b;

          --border: #e2e8f0;

          background:
            #F7F3EC;

          min-height:
            100vh;

          color:
            var(--dark);

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
           HEADER
        ====================================================== */

        .booking-header {

          background:
            white;

          border-bottom:
            1px solid var(--border);

          padding:
            18px 0;

        }


        .header-inner {

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

        }


        .back-button {

          border:
            0;

          background:
            transparent;

          padding:
            0;

          color:
            var(--text);

          font-size:
            16px;

          font-weight:
            700;

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          cursor:
            pointer;

          transition:
            0.2s ease;

        }


        .back-button:hover {

          color:
            var(--primary);

        }


        .back-button svg {

          font-size:
            13px;

        }


        .secure-label {

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
            700;

        }


        .secure-label svg {

          font-size:
            16px;

        }


        /* ======================================================
           PAGE INTRO
        ====================================================== */

        .booking-main {

          padding:
            35px 0 80px;

        }


        .eyebrow {

          color:
            var(--primary);

          font-size:
            13px;

          font-weight:
            800;

          letter-spacing:
            1.7px;

          margin-bottom:
            9px;

        }


        .page-title {

          font-size:
            clamp(35px, 4vw, 50px);

          line-height:
            1.05;

          letter-spacing:
            -1.8px;

          font-weight:
            850;

          margin:
            0 0 10px;

        }


        .page-subtitle {

          color:
            var(--muted);

          font-size:
            16px;

          margin:
            0;

        }


        /* ======================================================
           STEPS
        ====================================================== */

        .booking-steps {

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          margin-top:
            24px;

          margin-bottom:
            28px;

        }


        .step {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          color:
            #94a3b8;

          font-size:
            13px;

          font-weight:
            700;

        }


        .step-number {

          width:
            25px;

          height:
            25px;

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


        .step.active {

          color:
            var(--primary);

        }


        .step.active .step-number {

          background:
            var(--primary);

          color:
            white;

        }


        .step-line {

          height:
            1px;

          width:
            35px;

          background:
            #e2e8f0;

        }


        /* ======================================================
           MAIN GRID
        ====================================================== */

        .booking-grid {

          align-items:
            flex-start;

        }


        /* ======================================================
           FORM CARD
        ====================================================== */

        .form-card {

          background:
            white;

          border:
            1px solid var(--border);

          border-radius:
            16px;

          padding:
            28px;

        }


        .form-heading {

          display:
            flex;

          align-items:
            flex-start;

          gap:
            13px;

          margin-bottom:
            25px;

        }


        .form-heading-icon {

          width:
            42px;

          height:
            42px;

          border-radius:
            10px;

          background:
            var(--primary-soft);

          color:
            var(--primary);

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          flex-shrink:
            0;

        }


        .form-heading h2 {

          font-size:
            23px;

          font-weight:
            800;

          letter-spacing:
            -0.6px;

          margin:
            0 0 4px;

        }


        .form-heading p {

          color:
            var(--muted);

          font-size:
            13px;

          margin:
            0;

        }


        /* ======================================================
           ERROR
        ====================================================== */

        .booking-alert {

          border:
            1px solid #fecaca;

          background:
            #fef2f2;

          color:
            #b91c1c;

          border-radius:
            9px;

          padding:
            11px 13px;

          font-size:
            14px;

          margin-bottom:
            20px;

        }


        /* ======================================================
           FORM
        ====================================================== */

        .form-section-label {

          color:
            var(--dark);

          font-size:
            14px;

          font-weight:
            800;

          margin:
            0 0 12px;

        }


        .date-grid {

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            12px;

        }


        .field-group {

          margin-bottom:
            19px;

        }


        .field-label {

          display:
            flex;

          align-items:
            center;

          gap:
            6px;

          color:
            #334155;

          font-size:
            13px;

          font-weight:
            750;

          margin-bottom:
            7px;

        }


        .field-label svg {

          color:
            var(--primary);

          font-size:
            13px;

        }


        .field-input {

          width:
            100%;

          min-height:
            45px;

          border:
            1px solid var(--border);

          border-radius:
            9px;

          background:
            white;

          padding:
            10px 13px;

          color:
            var(--dark);

          font-size:
            14px;

          outline:
            none;

          transition:
            0.2s ease;

        }


        .field-input:focus {

          border-color:
            #dd925a;

          box-shadow:
            0 0 0 3px
            rgba(193, 98, 45,0.08);

        }


        .field-input::placeholder {

          color:
            #94a3b8;

        }


        input[type="date"] {

          color:
            var(--dark);

        }


        /* ======================================================
           DATE HELP
        ====================================================== */

        .date-help {

          color:
            #94a3b8;

          font-size:
            12px;

          margin-top:
            5px;

        }


        /* ======================================================
           PRICE BREAKDOWN
        ====================================================== */

        .price-breakdown {

          background:
            #F7F3EC;

          border:
            1px solid #edf0f4;

          border-radius:
            11px;

          padding:
            17px;

          margin:
            4px 0 23px;

        }


        .price-breakdown-header {

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          margin-bottom:
            12px;

        }


        .price-breakdown-title {

          font-size:
            14px;

          font-weight:
            800;

        }


        .price-breakdown-header svg {

          color:
            var(--primary);

          font-size:
            16px;

        }


        .price-row {

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          color:
            #64748b;

          font-size:
            13px;

          margin-bottom:
            8px;

        }


        .price-row strong {

          color:
            var(--dark);

          font-weight:
            700;

        }


        .price-total {

          border-top:
            1px solid var(--border);

          margin-top:
            12px;

          padding-top:
            12px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

        }


        .price-total span {

          font-size:
            14px;

          font-weight:
            800;

        }


        .price-total strong {

          color:
            var(--primary);

          font-size:
            22px;

          font-weight:
            850;

        }


        .nights-note {

          text-align:
            right;

          color:
            #94a3b8;

          font-size:
            12px;

          margin-top:
            3px;

        }


        /* ======================================================
           SUBMIT
        ====================================================== */

        .reserve-button {

          width:
            100%;

          min-height:
            49px;

          border:
            0;

          border-radius:
            9px;

          background:
            var(--primary);

          color:
            white;

          font-size:
            16px;

          font-weight:
            750;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            8px;

          transition:
            0.2s ease;

        }


        .reserve-button:hover {

          background:
            var(--primary-dark);

          color:
            white;

          transform:
            translateY(-1px);

          box-shadow:
            0 8px 22px
            rgba(193, 98, 45,0.18);

        }


        .reserve-note {

          text-align:
            center;

          color:
            #94a3b8;

          font-size:
            12px;

          margin:
            12px 0 0;

        }


        /* ======================================================
           SUMMARY
        ====================================================== */

        .summary-card {

          background:
            white;

          border:
            1px solid var(--border);

          border-radius:
            16px;

          overflow:
            hidden;

          position:
            sticky;

          top:
            20px;

        }


        .summary-image {

          width:
            100%;

          height:
            220px;

          object-fit:
            cover;

          display:
            block;

          background:
            #e2e8f0;

        }


        .summary-content {

          padding:
            23px;

        }


        .summary-eyebrow {

          color:
            var(--primary);

          font-size:
            12px;

          font-weight:
            800;

          letter-spacing:
            1.4px;

          margin-bottom:
            7px;

        }


        .summary-title {

          font-size:
            23px;

          line-height:
            1.2;

          font-weight:
            800;

          letter-spacing:
            -0.6px;

          margin:
            0 0 8px;

        }


        .summary-location {

          display:
            flex;

          align-items:
            center;

          gap:
            6px;

          color:
            var(--muted);

          font-size:
            13px;

          margin-bottom:
            13px;

        }


        .summary-location svg {

          color:
            var(--primary);

        }


        .summary-rating {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            5px;

          padding:
            6px 9px;

          border:
            1px solid #fef3c7;

          background:
            #fffbeb;

          border-radius:
            7px;

          font-size:
            12px;

          margin-bottom:
            19px;

        }


        .summary-rating svg {

          color:
            #f59e0b;

        }


        .summary-divider {

          height:
            1px;

          background:
            var(--border);

          margin:
            18px 0;

        }


        .summary-price-row {

          display:
            flex;

          align-items:
            baseline;

          justify-content:
            space-between;

        }


        .summary-price-label {

          color:
            var(--muted);

          font-size:
            13px;

        }


        .summary-price {

          font-size:
            30px;

          font-weight:
            850;

          letter-spacing:
            -1px;

        }


        .summary-price span {

          font-size:
            12px;

          color:
            var(--muted);

          font-weight:
            500;

        }


        /* ======================================================
           TRUST FEATURES
        ====================================================== */

        .trust-title {

          font-size:
            14px;

          font-weight:
            800;

          margin-bottom:
            13px;

        }


        .trust-item {

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          color:
            var(--text);

          font-size:
            13px;

          margin-bottom:
            11px;

        }


        .trust-icon {

          width:
            25px;

          height:
            25px;

          border-radius:
            7px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            #eef3f0;

          color:
            #2f6849;

          flex-shrink:
            0;

        }


        .trust-icon svg {

          font-size:
            12px;

        }


        /* ======================================================
           PROPERTY META
        ====================================================== */

        .property-meta {

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            9px;

          margin-top:
            15px;

        }


        .meta-item {

          background:
            #F7F3EC;

          border-radius:
            8px;

          padding:
            11px;

        }


        .meta-item span {

          display:
            block;

          color:
            #94a3b8;

          font-size:
            10px;

          margin-bottom:
            3px;

        }


        .meta-item strong {

          display:
            block;

          color:
            var(--dark);

          font-size:
            13px;

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

          }

        }


        @media (max-width: 767px) {

          .booking-page {

            padding-bottom:
              30px;

          }


          .booking-main {

            padding:
              25px 0 50px;

          }


          .page-title {

            font-size:
              37px;

          }


          .booking-steps {

            overflow-x:
              auto;

            padding-bottom:
              3px;

          }


          .step {

            white-space:
              nowrap;

          }


          .step-line {

            width:
              20px;

            flex-shrink:
              0;

          }


          .form-card {

            padding:
              20px;

          }


          .date-grid {

            grid-template-columns:
              1fr;

            gap:
              0;

          }


          .summary-card {

            margin-top:
              20px;

          }


          .summary-image {

            height:
              190px;

          }


          .header-inner {

            gap:
              15px;

          }


          .secure-label {

            font-size:
              12px;

          }

        }

      `}</style>



      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="booking-header">

        <Container>

          <div className="header-inner">

            <button
              type="button"
              className="back-button"
              onClick={() =>
                navigate(-1)
              }
            >

              <FaArrowLeft />

              Back to property

            </button>


            <div className="secure-label">

              <FaShieldAlt />

              Secure booking

            </div>

          </div>

        </Container>

      </header>



      {/* ========================================================
          MAIN
      ======================================================== */}

      <main className="booking-main">

        <Container>


          {/* ====================================================
              INTRO
          ==================================================== */}

          <div className="eyebrow">
            RESERVATION
          </div>

          <h1 className="page-title">
            Complete your booking
          </h1>

          <p className="page-subtitle">
            Enter your details below to
            continue to secure checkout.
          </p>


          {/* ====================================================
              STEPS
          ==================================================== */}

          <div className="booking-steps">

            <div className="step active">

              <div className="step-number">
                1
              </div>

              Your details

            </div>


            <div className="step-line"></div>


            <div className="step">

              <div className="step-number">
                2
              </div>

              Checkout

            </div>


            <div className="step-line"></div>


            <div className="step">

              <div className="step-number">
                3
              </div>

              Confirmation

            </div>

          </div>



          {/* ====================================================
              GRID
          ==================================================== */}

          <Row className="booking-grid g-4">


            {/* ==================================================
                LEFT — FORM
            ================================================== */}

            <Col
              lg={7}
              xl={8}
            >

              <div className="form-card">


                {/* FORM HEADING */}

                <div className="form-heading">

                  <div className="form-heading-icon">

                    <FaCalendarAlt />

                  </div>

                  <div>

                    <h2>
                      Your stay
                    </h2>

                    <p>
                      Choose your dates and
                      provide your contact details.
                    </p>

                  </div>

                </div>


                {/* ERROR */}

                {error && (

                  <div className="booking-alert">

                    {error}

                  </div>

                )}


                <Form>


                  {/* ==================================================
                      DATES
                  ================================================== */}

                  <p className="form-section-label">
                    Select your dates
                  </p>


                  <div className="date-grid">


                    {/* CHECK IN */}

                    <div className="field-group">

                      <label
                        className="field-label"
                        htmlFor="checkIn"
                      >

                        <FaCalendarAlt />

                        Check-in date

                      </label>


                      <input
                        id="checkIn"
                        type="date"
                        className="field-input"
                        value={checkInDate}
                        onChange={(e) =>
                          setCheckInDate(
                            e.target.value
                          )
                        }
                        min={today}
                      />


                      <div className="date-help">

                        Select your arrival date

                      </div>

                    </div>



                    {/* CHECK OUT */}

                    <div className="field-group">

                      <label
                        className="field-label"
                        htmlFor="checkOut"
                      >

                        <FaCalendarAlt />

                        Check-out date

                      </label>


                      <input
                        id="checkOut"
                        type="date"
                        className="field-input"
                        value={checkOutDate}
                        onChange={(e) =>
                          setCheckOutDate(
                            e.target.value
                          )
                        }
                        min={
                          checkInDate ||
                          today
                        }
                      />


                      <div className="date-help">

                        Select your departure date

                      </div>

                    </div>

                  </div>



                  {/* ==================================================
                      PRICE BREAKDOWN
                  ================================================== */}

                  {nights > 0 && (

                    <div className="price-breakdown">

                      <div className="price-breakdown-header">

                        <span className="price-breakdown-title">
                          Booking summary
                        </span>

                        <FaClock />

                      </div>


                      <div className="price-row">

                        <span>
                          ${bookingDetails.price}
                          {' '}
                          ×
                          {' '}
                          {Math.ceil(
                            nights / 7
                          )}
                          {' '}
                          {Math.ceil(
                            nights / 7
                          ) === 1
                            ? 'week'
                            : 'weeks'}
                        </span>

                        <strong>
                          ${totalPrice}
                        </strong>

                      </div>


                      <div className="price-row">

                        <span>
                          Stay duration
                        </span>

                        <strong>
                          {nights}
                          {' '}
                          {nights === 1
                            ? 'night'
                            : 'nights'}
                        </strong>

                      </div>


                      <div className="price-total">

                        <span>
                          Total
                        </span>

                        <strong>
                          ${totalPrice}
                        </strong>

                      </div>


                      <div className="nights-note">

                        Weekly pricing applies

                      </div>

                    </div>

                  )}



                  {/* ==================================================
                      GUEST DETAILS
                  ================================================== */}

                  <p className="form-section-label">

                    Guest details

                  </p>


                  {/* NAME */}

                  <div className="field-group">

                    <label
                      className="field-label"
                      htmlFor="guestName"
                    >

                      <FaUser />

                      Full name

                    </label>


                    <input
                      id="guestName"
                      type="text"
                      className="field-input"
                      placeholder="Enter your full name"
                      value={guestName}
                      onChange={(e) =>
                        setGuestName(
                          e.target.value
                        )
                      }
                    />

                  </div>



                  {/* EMAIL */}

                  <div className="field-group">

                    <label
                      className="field-label"
                      htmlFor="guestEmail"
                    >

                      <FaEnvelope />

                      Email address

                    </label>


                    <input
                      id="guestEmail"
                      type="email"
                      className="field-input"
                      placeholder="you@example.com"
                      value={guestEmail}
                      onChange={(e) =>
                        setGuestEmail(
                          e.target.value
                        )
                      }
                    />


                    <div className="date-help">

                      We'll use this email for
                      your booking confirmation.

                    </div>

                  </div>



                  {/* SUBMIT */}

                  <button
                    type="button"
                    className="reserve-button"
                    onClick={
                      handleBookingSubmit
                    }
                  >

                    Continue to checkout

                    <FaArrowRight />

                  </button>


                  <p className="reserve-note">

                    You won't be charged yet.
                    Review your booking before
                    completing payment.

                  </p>

                </Form>

              </div>

            </Col>



            {/* ==================================================
                RIGHT — PROPERTY SUMMARY
            ================================================== */}

            <Col
              lg={5}
              xl={4}
            >

              <div className="summary-card">


                {/* IMAGE */}

                {images.length > 0 ? (

                  <img
                    src={images[0]}
                    alt={
                      bookingDetails.title
                    }
                    className="summary-image"
                  />

                ) : (

                  <div
                    className="summary-image"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#94a3b8'
                    }}
                  >

                    No image available

                  </div>

                )}



                {/* CONTENT */}

                <div className="summary-content">


                  <div className="summary-eyebrow">
                    YOUR PROPERTY
                  </div>


                  <h2 className="summary-title">

                    {bookingDetails.title}

                  </h2>


                  <div className="summary-location">

                    <FaMapMarkerAlt />

                    {bookingDetails.location ||
                      'Premium location'}

                  </div>


                  <div className="summary-rating">

                    <FaStar />

                    <strong>
                      {bookingDetails.rating ||
                        '4.8'}
                    </strong>

                    <span>
                      ·
                      {' '}
                      {bookingDetails.reviews ||
                        '24'}
                      {' '}
                      reviews
                    </span>

                  </div>


                  {/* PRICE */}

                  <div className="summary-divider"></div>


                  <div className="summary-price-row">

                    <span className="summary-price-label">
                      Property price
                    </span>

                    <div className="summary-price">

                      ${bookingDetails.price}

                      <span>
                        {' '}
                        / week
                      </span>

                    </div>

                  </div>



                  {/* SELECTED DATES */}

                  {checkInDate &&
                    checkOutDate && (

                    <>

                      <div className="summary-divider"></div>

                      <div
                        style={{
                          fontSize: '13px',
                          color: '#64748b'
                        }}
                      >

                        <strong
                          style={{
                            display: 'block',
                            color: '#1E3A2E',
                            marginBottom: '7px'
                          }}
                        >
                          Selected dates
                        </strong>


                        <div
                          style={{
                            display: 'flex',
                            justifyContent:
                              'space-between',
                            marginBottom: '5px'
                          }}
                        >

                          <span>
                            Check-in
                          </span>

                          <strong>
                            {checkInDate}
                          </strong>

                        </div>


                        <div
                          style={{
                            display: 'flex',
                            justifyContent:
                              'space-between'
                          }}
                        >

                          <span>
                            Check-out
                          </span>

                          <strong>
                            {checkOutDate}
                          </strong>

                        </div>

                      </div>

                    </>

                  )}



                  {/* PROPERTY META */}

                  <div className="property-meta">


                    <div className="meta-item">

                      <span>
                        Type
                      </span>

                      <strong>
                        {bookingDetails.type ||
                          'Accommodation'}
                      </strong>

                    </div>


                    <div className="meta-item">

                      <span>
                        Status
                      </span>

                      <strong>
                        {bookingDetails.available
                          ? 'Available'
                          : 'Booked'}
                      </strong>

                    </div>

                  </div>



                  {/* TRUST */}

                  <div className="summary-divider"></div>


                  <div className="trust-title">

                    Booking protection

                  </div>


                  <div className="trust-item">

                    <div className="trust-icon">

                      <FaCheck />

                    </div>

                    Secure checkout

                  </div>


                  <div className="trust-item">

                    <div className="trust-icon">

                      <FaCheck />

                    </div>

                    Review before payment

                  </div>


                  <div className="trust-item">

                    <div className="trust-icon">

                      <FaCheck />

                    </div>

                    Booking confirmation by email

                  </div>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </main>

    </div>

  );

}


export default BookingPage;