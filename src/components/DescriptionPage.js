import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner
} from 'react-bootstrap';

import {
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';

import ListingsDataService from '../services/ListingsDataService';

import {
  FaStar,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaWifi,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaTv,
  FaCoffee,
  FaHeart,
  FaShareAlt,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaCar,
  FaTree,
  FaUsers
} from 'react-icons/fa';

import { IoIosPeople } from 'react-icons/io';

import FBDataService from '../services/fbServices';


// ============================================================
// AMENITY ICONS
// ============================================================

const AMENITY_ICONS = {
  WiFi: <FaWifi />,
  Parking: <FaParking />,
  Kitchen: <FaUtensils />,
  'Air Conditioning': <FaSnowflake />,
  Washer: <FaTv />,
  Heating: <FaCoffee />
};


// ============================================================
// DESCRIPTION PAGE
// ============================================================

const PageStyles = () => (
  <style>{`

        /* ======================================================
           VARIABLES
        ====================================================== */

        .property-page,
        .description-loading,
        .not-found-page {

          --primary: #C1622D;
          --primary-dark: #a04f24;
          --primary-soft: #fbf1ea;

          --dark: #1E3A2E;
          --text: #334155;
          --muted: #64748b;

          --border: #e2e8f0;

          --background: #F7F3EC;

          min-height: 100vh;

          background:
            #E4D9C7;

          padding: 28px 20px 60px;

          color:
            var(--dark);

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

        }


        .property-shell {

          max-width: 1180px;

          margin: 0 auto;

          background: white;

          border-radius: 28px;

          overflow: hidden;

          box-shadow: 0 30px 80px rgba(30, 58, 46, 0.14);

        }


        /* ======================================================
           TOP NAV
        ====================================================== */

        .property-topbar {

          background:
            white;

          border-bottom:
            1px solid var(--border);

          padding:
            17px 0;

        }


        .topbar-inner {

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

        }


        .back-link {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            8px;

          color:
            var(--text);

          text-decoration:
            none;

          font-size:
            16px;

          font-weight:
            700;

          transition:
            0.2s ease;

        }


        .back-link:hover {

          color:
            var(--primary);

        }


        .back-link svg {

          font-size:
            13px;

        }


        .top-actions {

          display:
            flex;

          gap:
            8px;

        }


        .top-action {

          width:
            38px;

          height:
            38px;

          border:
            1px solid var(--border);

          background:
            white;

          color:
            var(--text);

          border-radius:
            9px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          cursor:
            pointer;

          transition:
            0.2s ease;

        }


        .top-action:hover {

          border-color:
            #e9b691;

          color:
            var(--primary);

          background:
            var(--primary-soft);

        }


        .top-action.saved {

          color:
            #ef4444;

          background:
            #fff1f2;

          border-color:
            #fecdd3;

        }


        /* ======================================================
           MAIN
        ====================================================== */

        .property-main {

          padding:
            32px 0 80px;

        }


        /* ======================================================
           PROPERTY HEADER
        ====================================================== */

        .property-eyebrow {

          color:
            var(--primary);

          font-size:
            13px;

          font-weight:
            800;

          letter-spacing:
            1.7px;

          margin-bottom:
            10px;

        }


        .property-title {

          font-size:
            clamp(35px, 4vw, 54px);

          line-height:
            1.05;

          letter-spacing:
            -2px;

          font-weight:
            800;

          margin:
            0 0 13px;

        }


        .property-subline {

          display:
            flex;

          align-items:
            center;

          flex-wrap:
            wrap;

          gap:
            14px;

          color:
            var(--muted);

          font-size:
            16px;

        }


        .location-info {

          display:
            flex;

          align-items:
            center;

          gap:
            6px;

        }


        .location-info svg {

          color:
            var(--primary);

        }


        .rating-info {

          display:
            flex;

          align-items:
            center;

          gap:
            5px;

        }


        .rating-info svg {

          color:
            #f59e0b;

        }


        .rating-info strong {

          color:
            var(--dark);

        }


        .separator {

          color:
            #cbd5e1;

        }


        /* ======================================================
           GALLERY
        ====================================================== */

        .gallery-wrapper {

          margin-top:
            28px;

        }


        .main-image {

          width:
            100%;

          height:
            500px;

          object-fit:
            cover;

          border-radius:
            18px;

          display:
            block;

          background:
            #e2e8f0;

        }


        .gallery-main {

          position:
            relative;

        }


        .gallery-counter {

          position:
            absolute;

          right:
            16px;

          bottom:
            16px;

          padding:
            7px 11px;

          border-radius:
            7px;

          background:
            rgba(15,23,42,0.8);

          color:
            white;

          font-size:
            13px;

          font-weight:
            700;

          backdrop-filter:
            blur(8px);

        }


        .gallery-arrow {

          position:
            absolute;

          top:
            50%;

          transform:
            translateY(-50%);

          width:
            42px;

          height:
            42px;

          border:
            0;

          border-radius:
            50%;

          background:
            rgba(255,255,255,0.94);

          color:
            var(--dark);

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          box-shadow:
            0 6px 20px
            rgba(15,23,42,0.16);

          cursor:
            pointer;

          z-index:
            3;

          transition:
            0.2s ease;

        }


        .gallery-arrow:hover {

          background:
            white;

          color:
            var(--primary);

          transform:
            translateY(-50%) scale(1.05);

        }


        .gallery-arrow.left {

          left:
            16px;

        }


        .gallery-arrow.right {

          right:
            16px;

        }


        .thumbnail-row {

          display:
            flex;

          gap:
            9px;

          overflow-x:
            auto;

          padding:
            11px 2px 3px;

        }


        .thumbnail-button {

          flex:
            0 0 auto;

          width:
            88px;

          height:
            66px;

          border:
            2px solid transparent;

          padding:
            0;

          border-radius:
            9px;

          overflow:
            hidden;

          cursor:
            pointer;

          background:
            #e2e8f0;

          transition:
            0.2s ease;

        }


        .thumbnail-button img {

          width:
            100%;

          height:
            100%;

          object-fit:
            cover;

        }


        .thumbnail-button:hover {

          border-color:
            #dd925a;

        }


        .thumbnail-button.active {

          border-color:
            var(--primary);

        }


        /* ======================================================
           MAIN GRID
        ====================================================== */

        .property-grid {

          margin-top:
            34px;

        }


        .content-column {

          padding-right:
            15px;

        }


        .booking-column {

          padding-left:
            15px;

        }


        /* ======================================================
           FEATURE BADGES
        ====================================================== */

        .feature-badges {

          display: flex;

          flex-wrap: wrap;

          gap: 10px;

          margin-top: 18px;

        }


        .feature-badge {

          display: flex;

          align-items: center;

          gap: 8px;

          padding: 9px 15px;

          border: 1px solid var(--border);

          border-radius: 100px;

          background: white;

          color: var(--text);

          font-size: 13px;

          font-weight: 650;

        }


        .feature-badge svg {

          color: var(--primary);

        }


        /* ======================================================
           CONTENT CARDS
        ====================================================== */

        .content-card {

          background:
            white;

          border:
            1px solid var(--border);

          border-radius:
            15px;

          padding:
            27px;

          margin-bottom:
            22px;

        }


        .section-heading {

          font-size:
            24px;

          font-weight:
            800;

          letter-spacing:
            -0.7px;

          margin:
            0 0 18px;

        }


        .property-description {

          color:
            #475569;

          font-size:
            16px;

          line-height:
            1.8;

          margin:
            0;

        }


        /* ======================================================
           AMENITIES
        ====================================================== */

        .amenities-grid {

          display:
            grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap:
            10px;

        }


        .amenity-item {

          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          padding:
            13px;

          border:
            1px solid #edf0f4;

          border-radius:
            10px;

          color:
            var(--text);

          font-size:
            16px;

          font-weight:
            650;

        }


        .amenity-item-icon {

          width:
            32px;

          height:
            32px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            8px;

          background:
            var(--primary-soft);

          color:
            var(--primary);

        }


        /* ======================================================
           HIGHLIGHTS
        ====================================================== */

        .highlight-grid {

          display:
            grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap:
            10px;

        }


        .highlight {

          padding:
            18px;

          border-radius:
            11px;

          background:
            #F7F3EC;

          border:
            1px solid #eef2f7;

        }


        .highlight-icon {

          color:
            var(--primary);

          margin-bottom:
            10px;

        }


        .highlight strong {

          display:
            block;

          font-size:
            16px;

          margin-bottom:
            3px;

        }


        .highlight span {

          color:
            var(--muted);

          font-size:
            13px;

        }


        /* ======================================================
           ATTRACTIONS
        ====================================================== */

        .attraction-list {

          display:
            grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap:
            8px;

        }


        .attraction {

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          padding:
            11px 13px;

          background:
            #F7F3EC;

          border-radius:
            8px;

          font-size:
            14px;

          color:
            var(--text);

        }


        .attraction svg {

          color:
            var(--primary);

        }


        /* ======================================================
           BOOKING CARD
        ====================================================== */

        .booking-card {

          position:
            sticky;

          top:
            20px;

          background:
            white;

          border:
            1px solid var(--border);

          border-radius:
            16px;

          padding:
            24px;

          box-shadow:
            0 15px 40px
            rgba(15,23,42,0.07);

        }


        .booking-label {

          color:
            var(--muted);

          font-size:
            13px;

          font-weight:
            650;

          margin-bottom:
            4px;

        }


        .booking-price {

          display:
            flex;

          align-items:
            baseline;

          gap:
            4px;

          margin-bottom:
            16px;

        }


        .booking-price strong {

          font-size:
            35px;

          letter-spacing:
            -1.2px;

          font-weight:
            850;

        }


        .booking-price span {

          color:
            var(--muted);

          font-size:
            14px;

        }


        .availability {

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          padding:
            11px 13px;

          background:
            #eef3f0;

          border:
            1px solid #d3e0d8;

          border-radius:
            9px;

          color:
            #1E3A2E;

          font-size:
            14px;

          font-weight:
            700;

          margin-bottom:
            18px;

        }


        .availability-dot {

          width:
            7px;

          height:
            7px;

          border-radius:
            50%;

          background:
            #4e8363;

        }


        .book-button {

          width:
            100%;

          min-height:
            48px;

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


        .book-button:hover {

          background:
            var(--primary-dark);

          color:
            white;

          transform:
            translateY(-1px);

          box-shadow:
            0 8px 20px
            rgba(193, 98, 45,0.2);

        }


        .booking-note {

          text-align:
            center;

          color:
            #94a3b8;

          font-size:
            12px;

          margin:
            12px 0 20px;

        }


        .booking-divider {

          height:
            1px;

          background:
            var(--border);

          margin:
            18px 0;

        }


        .booking-feature {

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          margin-bottom:
            12px;

          color:
            var(--text);

          font-size:
            14px;

        }


        .booking-feature svg {

          color:
            var(--primary);

          font-size:
            16px;

        }


        /* ======================================================
           REVIEWS
        ====================================================== */

        .reviews-header {

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            15px;

          margin-bottom:
            20px;

        }


        .reviews-summary {

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          padding:
            8px 11px;

          background:
            #fffbeb;

          border:
            1px solid #fef3c7;

          border-radius:
            8px;

          font-size:
            14px;

        }


        .reviews-summary svg {

          color:
            #f59e0b;

        }


        .review-grid {

          display:
            grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap:
            12px;

        }


        .review-card {

          border:
            1px solid #edf0f4;

          border-radius:
            12px;

          padding:
            17px;

          background:
            #fafbfc;

        }


        .review-user {

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          margin-bottom:
            12px;

        }


        .review-avatar {

          width:
            34px;

          height:
            34px;

          border-radius:
            50%;

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

          font-size:
            16px;

          font-weight:
            800;

        }


        .review-name {

          font-size:
            14px;

          font-weight:
            750;

        }


        .review-date {

          color:
            #94a3b8;

          font-size:
            12px;

          margin-top:
            2px;

        }


        .review-stars {

          display:
            flex;

          gap:
            2px;

          margin-bottom:
            9px;

        }


        .review-stars svg {

          color:
            #f59e0b;

          font-size:
            12px;

        }


        .review-text {

          color:
            #475569;

          font-size:
            14px;

          line-height:
            1.65;

          margin:
            0;

        }


        .review-button {

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            7px;

          border:
            1px solid var(--border);

          border-radius:
            8px;

          background:
            white;

          color:
            var(--dark);

          padding:
            9px 13px;

          font-size:
            13px;

          font-weight:
            700;

          text-decoration:
            none;

          transition:
            0.2s ease;

        }


        .review-button:hover {

          color:
            var(--primary);

          border-color:
            #e9b691;

          background:
            var(--primary-soft);

        }


        .no-reviews {

          text-align:
            center;

          padding:
            35px 15px;

          background:
            #F7F3EC;

          border-radius:
            11px;

          border:
            1px dashed #cbd5e1;

        }


        .no-reviews p {

          color:
            var(--muted);

          font-size:
            16px;

          margin:
            0 0 15px;

        }


        /* ======================================================
           MOBILE BOOK BUTTON
        ====================================================== */

        .mobile-book-bar {

          display:
            none;

        }


        /* ======================================================
           LOADING
        ====================================================== */

        .description-loading {

          min-height:
            100vh;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            var(--background);

        }


        .loading-inner {

          text-align:
            center;

        }


        .loading-inner .spinner-border {

          width:
            2.7rem;

          height:
            2.7rem;

          color:
            var(--primary);

        }


        .loading-inner p {

          color:
            var(--muted);

          font-size:
            16px;

          margin-top:
            14px;

        }


        /* ======================================================
           NOT FOUND
        ====================================================== */

        .not-found-page {

          min-height:
            100vh;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          text-align:
            center;

          background:
            var(--background);

        }


        .not-found-icon {

          width:
            60px;

          height:
            60px;

          border-radius:
            15px;

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

          margin:
            0 auto 18px;

          font-size:
            30px;

          font-weight:
            800;

        }


        .not-found-page h2 {

          font-size:
            29px;

          font-weight:
            800;

        }


        .not-found-page p {

          color:
            var(--muted);

          font-size:
            16px;

          margin-bottom:
            22px;

        }


        .back-listings-btn {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            8px;

          padding:
            11px 17px;

          background:
            var(--primary);

          color:
            white;

          border-radius:
            8px;

          text-decoration:
            none;

          font-size:
            14px;

          font-weight:
            700;

        }


        .back-listings-btn:hover {

          color:
            white;

          background:
            var(--primary-dark);

        }


        /* ======================================================
           RESPONSIVE
        ====================================================== */

        @media (max-width: 991px) {

          .main-image {

            height:
              430px;

          }

          .content-column {

            padding-right:
              0;

          }

          .booking-column {

            padding-left:
              0;

            margin-top:
              20px;

          }

          .booking-card {

            position:
              relative;

            top:
              auto;

          }

          .review-grid {

            grid-template-columns:
              1fr 1fr;

          }

        }


        @media (max-width: 767px) {

          .property-page {

            padding: 0 0 60px;

          }

          .property-shell {

            border-radius: 0;

            box-shadow: none;

          }

          .property-topbar {

            padding:
              13px 0;

          }

          .property-main {

            padding:
              24px 0 90px;

          }

          .property-title {

            font-size:
              38px;

            letter-spacing:
              -1.5px;

          }

          .main-image {

            height:
              300px;

            border-radius:
              12px;

          }

          .gallery-wrapper {

            margin-top:
              20px;

          }

          .thumbnail-button {

            width:
              72px;

            height:
              55px;

          }

          .content-card {

            padding:
              20px;

          }

          .amenities-grid {

            grid-template-columns:
              1fr;

          }

          .highlight-grid {

            grid-template-columns:
              1fr 1fr;

          }

          .attraction-list {

            grid-template-columns:
              1fr;

          }

          .review-grid {

            grid-template-columns:
              1fr;

          }

          .reviews-header {

            align-items:
              flex-start;

            flex-direction:
              column;

          }

          .booking-column {

            display:
              none;

          }

          .mobile-book-bar {

            position:
              fixed;

            left:
              0;

            right:
              0;

            bottom:
              0;

            z-index:
              100;

            display:
              flex;

            align-items:
              center;

            justify-content:
              space-between;

            gap:
              15px;

            padding:
              11px 15px;

            background:
              white;

            border-top:
              1px solid var(--border);

            box-shadow:
              0 -8px 25px
              rgba(15,23,42,0.08);

          }

          .mobile-price strong {

            display:
              block;

            font-size:
              22px;

            font-weight:
              850;

          }

          .mobile-price span {

            color:
              var(--muted);

            font-size:
              12px;

          }

          .mobile-book-button {

            flex:
              1;

            max-width:
              190px;

            min-height:
              43px;

            border:
              0;

            border-radius:
              8px;

            background:
              var(--primary);

            color:
              white;

            font-size:
              14px;

            font-weight:
              750;

          }

        }


`}</style>
);

function DescriptionPage() {

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();


  // ============================================================
  // LOAD DATA
  // ============================================================

  useEffect(() => {

    getListingById(id);
    getFeedbackData(id);

  }, [id]);


  const getFeedbackData = async () => {

    try {

      const feedbackData =
        await FBDataService.getAllData();

      if (
        !feedbackData ||
        feedbackData.length === 0
      ) {

        setFeedback([]);

        return;

      }

      const filteredFeedback =
        feedbackData.filter(
          (fb) => fb.listingId === id
        );

      setFeedback(filteredFeedback);

    } catch (error) {

      console.error(
        'Error fetching feedback data:',
        error
      );

    }

  };


  const getListingById = async (listingId) => {

    try {

      const data =
        await ListingsDataService.getListingById(
          listingId
        );

      if (!data) {

        setListing(null);

        navigate('/listings');

        return;

      }

      setListing(data);

    } catch (error) {

      console.error(
        'Error fetching listing:',
        error
      );

      setListing(null);

    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // GALLERY
  // ============================================================

  const galleryImages = listing

    ? [
        listing.image,
        ...(listing.images || []),
        listing.image2,
        listing.image3
      ].filter(
        (img, index, arr) =>
          img &&
          arr.indexOf(img) === index
      )

    : [];


  // ============================================================
  // BOOKING
  // ============================================================

  const handleBookNow = () => {

    navigate(`/booking/${listing.id}`, {

      state: {

        listingData: listing,

        listingId: listing.id,

        images: galleryImages

      }

    });

  };


  // ============================================================
  // FAVORITE
  // ============================================================

  const toggleSaved = () => {

    setSaved(!saved);

  };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <div className="description-loading">

        <PageStyles />

        <div className="loading-inner">

          <Spinner animation="border" />

          <p>
            Loading property...
          </p>

        </div>

      </div>

    );

  }


  // ============================================================
  // NOT FOUND
  // ============================================================

  if (!listing) {

    return (

      <div className="not-found-page">

        <PageStyles />

        <div>

          <div className="not-found-icon">
            ?
          </div>

          <h2>
            Listing not found
          </h2>

          <p>
            This property may no longer be
            available.
          </p>

          <Link
            to="/listings"
            className="back-listings-btn"
          >
            <FaArrowLeft />
            Browse available listings
          </Link>

        </div>

      </div>

    );

  }


  const rating =
    listing.rating || '4.8';

  const reviewCount =
    listing.reviewCount ??
    feedback.length;


  return (

    <div className="property-page">


      {/* ========================================================
          CUSTOM STYLES
      ======================================================== */}

      <PageStyles />


      <div className="property-shell">

      {/* ========================================================
          TOP BAR
      ======================================================== */}

      <div className="property-topbar">

        <Container>

          <div className="topbar-inner">

            <button
              type="button"
              className="back-link"
              onClick={() =>
                navigate('/listings')
              }
            >

              <FaArrowLeft />

              Back to listings

            </button>


            <div className="top-actions">

              <button
                type="button"
                className={
                  `top-action ${
                    saved ? 'saved' : ''
                  }`
                }
                onClick={toggleSaved}
                aria-label="Save property"
              >

                <FaHeart />

              </button>


              <button
                type="button"
                className="top-action"
                onClick={() => {

                  if (
                    navigator.share
                  ) {

                    navigator.share({
                      title:
                        listing.title,
                      text:
                        `Check out ${listing.title}`
                    });

                  }

                }}
                aria-label="Share property"
              >

                <FaShareAlt />

              </button>

            </div>

          </div>

        </Container>

      </div>



      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <main className="property-main">

        <Container>


          {/* PROPERTY TITLE */}

          <div>

            <div className="property-eyebrow">
              PROPERTY DETAILS
            </div>

            <h1 className="property-title">
              {listing.title}
            </h1>


            <div className="property-subline">

              <div className="location-info">

                <FaMapMarkerAlt />

                <span>
                  {listing.location}
                </span>

              </div>


              <span className="separator">
                •
              </span>


              <div className="rating-info">

                <FaStar />

                <strong>
                  {rating}
                </strong>

                <span>
                  ({reviewCount} reviews)
                </span>

              </div>

            </div>

          </div>


          {/* FEATURE BADGES */}

          <div className="feature-badges">

            <div className="feature-badge">
              <FaBed />
              <span>{listing.bedrooms || 'N/A'} Beds</span>
            </div>

            <div className="feature-badge">
              <FaBath />
              <span>{listing.bathrooms || 'N/A'} Baths</span>
            </div>

            <div className="feature-badge">
              <FaRulerCombined />
              <span>{listing.area || 'N/A'} sq ft</span>
            </div>

            <div className="feature-badge">
              <FaUsers />
              <span>{listing.guests || 'N/A'} Guests</span>
            </div>

          </div>



          {/* ======================================================
              GALLERY
          ====================================================== */}

          <div className="gallery-wrapper">

            {galleryImages.length > 0 ? (

              <>

                <div className="gallery-main">

                  <img
                    src={
                      galleryImages[
                        activeIndex
                      ]
                    }
                    alt={
                      `${listing.title} ${
                        activeIndex + 1
                      }`
                    }
                    className="main-image"
                  />


                  {galleryImages.length > 1 && (

                    <>

                      <button
                        type="button"
                        className="gallery-arrow left"
                        onClick={() =>
                          setActiveIndex(
                            activeIndex === 0
                              ? galleryImages.length - 1
                              : activeIndex - 1
                          )
                        }
                        aria-label="Previous image"
                      >

                        <FaArrowLeft />

                      </button>


                      <button
                        type="button"
                        className="gallery-arrow right"
                        onClick={() =>
                          setActiveIndex(
                            activeIndex ===
                            galleryImages.length - 1
                              ? 0
                              : activeIndex + 1
                          )
                        }
                        aria-label="Next image"
                      >

                        <FaArrowRight />

                      </button>


                      <div className="gallery-counter">

                        {activeIndex + 1}
                        {' / '}
                        {galleryImages.length}

                      </div>

                    </>

                  )}

                </div>


                {galleryImages.length > 1 && (

                  <div className="thumbnail-row">

                    {galleryImages.map(
                      (img, index) => (

                        <button
                          type="button"
                          key={index}
                          className={
                            `thumbnail-button ${
                              activeIndex === index
                                ? 'active'
                                : ''
                            }`
                          }
                          onClick={() =>
                            setActiveIndex(index)
                          }
                        >

                          <img
                            src={img}
                            alt={`Thumbnail ${
                              index + 1
                            }`}
                          />

                        </button>

                      )
                    )}

                  </div>

                )}

              </>

            ) : (

              <div
                className="main-image"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >

                No image available

              </div>

            )}

          </div>



          {/* ======================================================
              PROPERTY GRID
          ====================================================== */}

          <Row className="property-grid">

            <Col
              lg={8}
              className="content-column"
            >


              {/* ABOUT */}

              <Card className="content-card">

                <h2 className="section-heading">
                  About this property
                </h2>

                <p className="property-description">
                  {listing.description}
                </p>

              </Card>



              {/* HIGHLIGHTS */}

              <Card className="content-card">

                <h2 className="section-heading">
                  Property highlights
                </h2>


                <div className="highlight-grid">


                  <div className="highlight">

                    <FaMapMarkerAlt
                      className="highlight-icon"
                    />

                    <strong>
                      Prime location
                    </strong>

                    <span>
                      {listing.location}
                    </span>

                  </div>


                  <div className="highlight">

                    <FaStar
                      className="highlight-icon"
                    />

                    <strong>
                      {rating} rating
                    </strong>

                    <span>
                      {reviewCount} reviews
                    </span>

                  </div>


                  <div className="highlight">

                    <FaCar
                      className="highlight-icon"
                    />

                    <strong>
                      Parking
                    </strong>

                    <span>
                      Convenient parking
                    </span>

                  </div>

                </div>

              </Card>



              {/* AMENITIES */}

              <Card className="content-card">

                <h2 className="section-heading">
                  Amenities
                </h2>


                {listing.amenities &&
                listing.amenities.length > 0 ? (

                  <div className="amenities-grid">

                    {listing.amenities.map(
                      (amenity, index) => (

                        <div
                          key={index}
                          className="amenity-item"
                        >

                          <div className="amenity-item-icon">

                            {
                              AMENITY_ICONS[
                                amenity
                              ] || <FaCheck />
                            }

                          </div>

                          <span>
                            {amenity}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <p
                    style={{
                      color: '#64748b',
                      fontSize: '12px',
                      margin: 0
                    }}
                  >
                    No amenities listed for
                    this property yet.
                  </p>

                )}

              </Card>



              {/* NEARBY */}

              <Card className="content-card">

                <h2 className="section-heading">
                  Nearby attractions
                </h2>


                {listing.attractions &&
                listing.attractions.length > 0 ? (

                  <div className="attraction-list">

                    {listing.attractions.map(
                      (attraction, index) => (

                        <div
                          key={index}
                          className="attraction"
                        >

                          <FaMapMarkerAlt />

                          <span>
                            {attraction}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <p
                    style={{
                      color: '#64748b',
                      fontSize: '12px',
                      margin: 0
                    }}
                  >
                    No nearby attractions
                    listed.
                  </p>

                )}

              </Card>

            </Col>



            {/* ====================================================
                BOOKING SIDEBAR
            ==================================================== */}

            <Col
              lg={4}
              className="booking-column"
            >

              <div className="booking-card">


                <div className="booking-label">
                  Starting from
                </div>


                <div className="booking-price">

                  <strong>
                    ${listing.price}
                  </strong>

                  <span>
                    / week
                  </span>

                </div>


                <div className="availability">

                  <span className="availability-dot"></span>

                  Property currently available

                </div>


                <button
                  type="button"
                  className="book-button"
                  onClick={handleBookNow}
                >

                  Check availability

                  <FaArrowRight />

                </button>


                <div className="booking-note">

                  No booking fees • Secure booking

                </div>


                <div className="booking-divider"></div>


                <div className="booking-feature">

                  <FaCheck />

                  <span>
                    Instant property enquiry
                  </span>

                </div>


                <div className="booking-feature">

                  <FaCheck />

                  <span>
                    Secure booking process
                  </span>

                </div>


                <div className="booking-feature">

                  <FaCheck />

                  <span>
                    Property details included
                  </span>

                </div>


                <div className="booking-divider"></div>


                <div
                  style={{
                    fontSize: '10px',
                    color: '#64748b',
                    lineHeight: 1.6
                  }}
                >

                  <strong
                    style={{
                      display: 'block',
                      color: '#1E3A2E',
                      marginBottom: '4px'
                    }}
                  >
                    Location
                  </strong>

                  {listing.location}

                </div>

              </div>

            </Col>

          </Row>



          {/* ======================================================
              REVIEWS
          ====================================================== */}

          <section
            style={{
              marginTop: '45px'
            }}
          >

            <div className="reviews-header">

              <div>

                <div className="property-eyebrow">
                  COMMUNITY
                </div>

                <h2
                  className="section-heading"
                  style={{
                    marginBottom: 0
                  }}
                >
                  Guest reviews
                </h2>

              </div>


              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >

                <div className="reviews-summary">

                  <FaStar />

                  <strong>
                    {rating}
                  </strong>

                  <span>
                    {reviewCount} reviews
                  </span>

                </div>


                <Link
                  to={`/feedback/${listing.id}`}
                  className="review-button"
                >

                  Write a review

                </Link>

              </div>

            </div>


            {feedback.length > 0 ? (

              <div className="review-grid">

                {feedback
                  .slice(0, 3)
                  .map((fb) => (

                    <div
                      key={fb.id}
                      className="review-card"
                    >

                      <div className="review-user">

                        <div className="review-avatar">

                          {fb.name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                        <div>

                          <div className="review-name">
                            {fb.name}
                          </div>

                          <div className="review-date">
                            {fb.date}
                          </div>

                        </div>

                      </div>


                      <div className="review-stars">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (

                            <FaStar
                              key={star}
                            />

                          )
                        )}

                      </div>


                      <p className="review-text">
                        "{fb.feedback}"
                      </p>

                    </div>

                  ))}

              </div>

            ) : (

              <div className="no-reviews">

                <p>
                  No reviews yet.
                  Be the first to share
                  your experience.
                </p>

                <Link
                  to={`/feedback/${listing.id}`}
                  className="review-button"
                >

                  Write the first review

                </Link>

              </div>

            )}


            {feedback.length > 3 && (

              <div
                style={{
                  textAlign: 'center',
                  marginTop: '18px'
                }}
              >

                <Link
                  to={`/feedback/${listing.id}`}
                  className="review-button"
                >

                  View all {feedback.length} reviews

                  <FaArrowRight />

                </Link>

              </div>

            )}

          </section>

        </Container>

      </main>

      </div>



      {/* ========================================================
          MOBILE BOOKING BAR
      ======================================================== */}

      <div className="mobile-book-bar">

        <div className="mobile-price">

          <strong>
            ${listing.price}
          </strong>

          <span>
            / week
          </span>

        </div>


        <button
          type="button"
          className="mobile-book-button"
          onClick={handleBookNow}
        >

          Check availability

        </button>

      </div>

    </div>

  );

}


export default DescriptionPage;