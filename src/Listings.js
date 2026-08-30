import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  Form,
  Pagination,
  Badge,
  Spinner,
  Modal
} from 'react-bootstrap';

import {
  FaSearch,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaFilter,
  FaSignInAlt,
  FaSlidersH,
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';

import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { useUserAuth } from './context/UserAuthContext';
import ListingsDataService from './services/ListingsDataService';
import CategoryButtons from './ButtonGroup';
import { getFallbackImage } from './utils/fallbackImage';


const PageStyles = () => (
  <style>{`

        /* ======================================================
           BASE
        ====================================================== */

        .modern-listings-page,
        .listing-auth-page {

          --blue: #C1622D;
          --blue-dark: #a04f24;
          --blue-light: #fbf1ea;

          --dark: #1E3A2E;
          --text: #334155;
          --muted: #64748b;

          --background: #F7F3EC;

          --border: #e2e8f0;

          color: var(--dark);

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

        }


        .modern-listings-page {

          background: var(--background);

          min-height: 100vh;

        }


        /* ======================================================
           HEADER
        ====================================================== */

        .listings-header {

          background: white;

          padding: 65px 0 45px;

          border-bottom:
            1px solid #edf0f4;

        }


        .header-content {

          display: flex;

          justify-content: space-between;

          align-items: flex-end;

        }


        .page-eyebrow {

          color: var(--blue);

          font-size: 13px;

          font-weight: 800;

          letter-spacing: 1.6px;

          margin-bottom: 13px;

        }


        .header-content h1 {

          font-size: clamp(42px, 4vw, 61px);

          line-height: 1;

          letter-spacing: -2.5px;

          font-weight: 800;

          margin: 0 0 15px;

        }


        .header-content p {

          margin: 0;

          color: var(--muted);

          font-size: 18px;

          line-height: 1.6;

        }


        .header-count {

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 15px 20px;

          border:
            1px solid var(--border);

          border-radius: 12px;

          background: #FBF8F1;

        }


        .header-count strong {

          font-size: 32px;

          letter-spacing: -1px;

        }


        .header-count span {

          color: var(--muted);

          font-size: 14px;

          line-height: 1.3;

        }


        /* ======================================================
           SEARCH
        ====================================================== */

        .search-section {

          background: white;

          padding: 25px 0 27px;

          border-bottom:
            1px solid var(--border);

          position: sticky;

          top: 0;

          z-index: 50;

        }


        .filter-bar {

          display: flex;

          align-items: center;

          gap: 4px;

          background: white;

          border: 1px solid var(--border);

          border-radius: 16px;

          padding: 6px 10px;

          box-shadow: 0 1px 2px rgba(30, 58, 46, 0.04);

        }


        .filter-divider {

          width: 1px;

          align-self: stretch;

          margin: 8px 2px;

          background: var(--border);

          flex-shrink: 0;

        }


        .filter-segment {

          display: flex;

          align-items: center;

          gap: 10px;

          padding: 0 8px;

          flex: 1;

          min-width: 0;

        }


        .filter-segment-icon {

          color: var(--muted);

          flex-shrink: 0;

        }


        .main-search {

          flex: 1.4;

          height: 46px;

          display: flex;

          align-items: center;

          background: transparent;

          border: 0;

          border-radius: 10px;

          padding: 0 10px;

          transition: 0.2s ease;

        }


        .main-search:focus-within {

          border-color: #dd925a;

          box-shadow:
            0 0 0 3px
            rgba(193, 98, 45,0.08);

          background: white;

        }


        .main-search-icon {

          color: #94a3b8;

          margin-right: 12px;

          font-size: 18px;

        }


        .main-search .form-control {

          border: 0;

          background: transparent;

          box-shadow: none;

          font-size: 16px;

          padding: 0;

          height: 100%;

        }


        .main-search .form-control:focus {

          box-shadow: none;

        }


        .clear-search {

          border: 0;

          background: transparent;

          color: #94a3b8;

          cursor: pointer;

        }


        .sort-control {

          width: 210px;

          height: 46px;

          border: 0;

          border-radius: 10px;

          display: flex;

          align-items: center;

          padding: 0 10px;

          background: transparent;

          flex-shrink: 0;

        }


        .sort-control span {

          color: #94a3b8;

          font-size: 13px;

          white-space: nowrap;

          margin-right: 8px;

        }


        .sort-control .form-select {

          border: 0;

          box-shadow: none;

          font-size: 16px;

          font-weight: 650;

          color: var(--dark);

          padding-left: 0;

          background-color: transparent;

        }


        /* ======================================================
           CATEGORIES
        ====================================================== */

        .category-buttons {

          display: flex;

          align-items: center;

          gap: 6px;

          flex-wrap: wrap;

        }


        .category-pill {

          border:
            1px solid var(--border);

          background: transparent;

          color: #475569;

          border-radius: 100px;

          padding: 6px 12px;

          font-size: 13px;

          font-weight: 650;

          cursor: pointer;

          transition: 0.2s ease;

          white-space: nowrap;

        }


        .category-pill:hover {

          border-color: #dd925a;

          color: var(--blue);

        }


        .category-pill.active {

          color: white;

          background: var(--blue);

          border-color: var(--blue);

        }


        /* ======================================================
           CONTENT
        ====================================================== */

        .listings-content {

          padding: 38px 0 80px;

        }


        .results-bar {

          display: flex;

          justify-content: space-between;

          align-items: center;

          margin-bottom: 22px;

        }


        .results-number {

          font-size: 18px;

          font-weight: 800;

        }


        .results-text {

          color: var(--muted);

          font-size: 16px;

        }


        .clear-filter {

          border: 0;

          background: transparent;

          color: var(--blue);

          font-size: 14px;

          font-weight: 700;

          cursor: pointer;

          display: flex;

          align-items: center;

          gap: 6px;

        }


        /* ======================================================
           CARDS
        ====================================================== */

        .listing-grid {

          row-gap: 24px;

        }


        .listing-column {

          display: flex;

        }


        .modern-listing-card {

          width: 100%;

          border:
            1px solid var(--border);

          border-radius: 20px;

          overflow: hidden;

          background: white;

          padding: 10px 10px 0;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;

        }


        .modern-listing-card:hover {

          transform:
            translateY(-5px);

          border-color:
            #dd925a;

          box-shadow:
            0 18px 45px
            rgba(30, 58, 46, 0.1);

        }


        .modern-card-image {

          height: 210px;

          position: relative;

          overflow: hidden;

          background: #e2e8f0;

          border-radius: 14px;

        }


        .listing-photo {

          width: 100%;

          height: 100%;

          object-fit: cover;

          transition:
            transform 0.5s ease;

        }


        .modern-listing-card:hover
        .listing-photo {

          transform: scale(1.045);

        }


        .image-gradient {

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to bottom,
              rgba(15,23,42,0.25),
              transparent 40%,
              rgba(15,23,42,0.45)
            );

          pointer-events: none;

        }


        /* ======================================================
           FAVORITE
        ====================================================== */

        .modern-favorite {

          position: absolute;

          top: 13px;

          right: 13px;

          width: 38px;

          height: 38px;

          border: 0;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.94);

          color: #475569;

          display: flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          z-index: 5;

          transition: 0.2s ease;

          box-shadow:
            0 3px 10px
            rgba(15,23,42,0.12);

        }


        .modern-favorite:hover {

          transform: scale(1.07);

          color: #ef4444;

        }


        .modern-favorite.saved {

          color: white;

          background: #ef4444;

        }


        /* ======================================================
           AVAILABILITY
        ====================================================== */

        .availability-badge {

          position: absolute;

          left: 13px;

          top: 13px;

          background:
            rgba(15,23,42,0.82);

          color: white;

          border-radius: 100px;

          padding: 6px 9px;

          font-size: 13px;

          font-weight: 700;

          display: flex;

          align-items: center;

          gap: 6px;

          backdrop-filter: blur(6px);

        }


        .availability-badge span {

          width: 6px;

          height: 6px;

          border-radius: 50%;

          background: #4e8363;

        }


        /* ======================================================
           QUICK VIEW
        ====================================================== */

        .quick-view-button {

          position: absolute;

          bottom: 14px;

          left: 50%;

          transform:
            translateX(-50%);

          background: white;

          color: var(--dark);

          text-decoration: none;

          border-radius: 8px;

          padding: 9px 13px;

          font-size: 14px;

          font-weight: 750;

          display: flex;

          align-items: center;

          gap: 7px;

          box-shadow:
            0 8px 20px
            rgba(15,23,42,0.18);

          white-space: nowrap;

          animation:
            quickViewIn
            0.18s ease;

        }


        @keyframes quickViewIn {

          from {

            opacity: 0;

            transform:
              translate(-50%, 7px);

          }

          to {

            opacity: 1;

            transform:
              translate(-50%, 0);

          }

        }


        .quick-view-button:hover {

          color: var(--blue);

        }


        /* ======================================================
           CARD BODY
        ====================================================== */

        .modern-card-body {

          padding: 18px;

        }


        .card-heading {

          display: flex;

          justify-content: space-between;

          align-items: flex-start;

          gap: 10px;

          margin-bottom: 15px;

        }


        .card-heading h2 {

          font-size: 17px;

          line-height: 1.4;

          letter-spacing: -0.2px;

          font-weight: 750;

          margin: 0 0 6px;

        }


        .card-location {

          display: flex;

          align-items: center;

          gap: 5px;

          color: var(--muted);

          font-size: 13px;

        }


        .card-location svg {

          color: var(--blue);

          font-size: 13px;

        }


        .card-rating {

          display: flex;

          align-items: center;

          gap: 4px;

          font-size: 14px;

          white-space: nowrap;

        }


        .card-rating svg {

          color: #f59e0b;

          font-size: 13px;

        }


        .card-rating strong {

          font-weight: 750;

        }


        /* ======================================================
           PROPERTY META
        ====================================================== */

        .property-meta {

          display: flex;

          gap: 13px;

          padding: 12px 0;

          border-top:
            1px solid #eef1f5;

          border-bottom:
            1px solid #eef1f5;

          color: #64748b;

          font-size: 13px;

        }


        .property-meta span {

          display: flex;

          align-items: center;

          gap: 5px;

        }


        .property-meta svg {

          color: #94a3b8;

        }


        /* ======================================================
           PRICE
        ====================================================== */

        .card-footer-info {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 15px;

        }


        .price-block {

          display: flex;

          align-items: baseline;

          gap: 3px;

        }


        .price-block strong {

          font-size: 23px;

          letter-spacing: -0.7px;

          font-weight: 800;

        }


        .price-block span {

          color: var(--muted);

          font-size: 13px;

        }


        .card-arrow {

          height: 38px;

          padding: 0 14px;

          border-radius: 100px;

          background: var(--blue);

          color: white;

          display: flex;

          align-items: center;

          gap: 7px;

          font-size: 12px;

          font-weight: 700;

          white-space: nowrap;

          text-decoration: none;

          transition: 0.2s ease;

        }


        .card-arrow:hover {

          color: white;

          background: var(--blue-dark);

          transform: translateY(-1px);

        }


        .card-arrow svg {

          font-size: 11px;

        }


        /* ======================================================
           LOADING
        ====================================================== */

        .loading-state {

          text-align: center;

          padding: 110px 20px;

        }


        .loading-spinner {

          margin-bottom: 20px;

        }


        .loading-spinner .spinner-border {

          color: var(--blue);

        }


        .loading-state h3 {

          font-size: 22px;

          font-weight: 750;

          margin-bottom: 6px;

        }


        .loading-state p {

          color: var(--muted);

          font-size: 16px;

          margin: 0;

        }


        /* ======================================================
           EMPTY
        ====================================================== */

        .empty-state {

          text-align: center;

          background: white;

          border:
            1px solid var(--border);

          border-radius: 16px;

          padding: 80px 20px;

        }


        .empty-icon {

          width: 60px;

          height: 60px;

          margin: 0 auto 20px;

          background: var(--blue-light);

          color: var(--blue);

          border-radius: 15px;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 24px;

        }


        .empty-state h2 {

          font-size: 26px;

          font-weight: 800;

          margin-bottom: 8px;

        }


        .empty-state p {

          color: var(--muted);

          font-size: 16px;

          margin-bottom: 25px;

        }


        .empty-state .btn {

          background: var(--blue);

          border: 0;

          border-radius: 8px;

          padding: 10px 18px;

          font-size: 16px;

          font-weight: 700;

        }


        /* ======================================================
           PAGINATION
        ====================================================== */

        .modern-pagination {

          display: flex;

          justify-content: center;

          margin-top: 50px;

        }


        .modern-pagination .pagination {

          gap: 5px;

        }


        .modern-pagination .page-link {

          width: 38px;

          height: 38px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 8px !important;

          border:
            1px solid var(--border);

          color: #475569;

          font-size: 14px;

          font-weight: 650;

          background: white;

        }


        .modern-pagination
        .page-item.active
        .page-link {

          background: var(--blue);

          border-color: var(--blue);

          color: white;

        }


        .modern-pagination
        .page-link:hover {

          color: var(--blue);

          background: var(--blue-light);

        }


        /* ======================================================
           LOGIN PAGE
        ====================================================== */

        .listing-auth-page {

          min-height: 100vh;

          background:
            linear-gradient(
              135deg,
              #F7F3EC,
              #fbf1ea
            );

          display: flex;

          align-items: center;

          justify-content: center;

          position: relative;

          overflow: hidden;

        }


        .auth-background-shape {

          position: absolute;

          width: 500px;

          height: 500px;

          border-radius: 50%;

          background:
            rgba(193, 98, 45,0.06);

          right: -150px;

          top: -150px;

        }


        .listing-auth-card {

          position: relative;

          z-index: 2;

          max-width: 560px;

          margin: 60px auto;

          padding: 55px;

          background: white;

          border:
            1px solid var(--border);

          border-radius: 22px;

          box-shadow:
            0 25px 70px
            rgba(15,23,42,0.08);

          text-align: center;

        }


        .auth-logo {

          width: 58px;

          height: 58px;

          background: var(--blue);

          color: white;

          border-radius: 16px;

          display: flex;

          align-items: center;

          justify-content: center;

          margin: 0 auto 22px;

          font-size: 26px;

          font-weight: 800;

        }


        .auth-eyebrow {

          color: var(--blue);

          font-size: 13px;

          font-weight: 800;

          letter-spacing: 1.5px;

          margin-bottom: 12px;

        }


        .listing-auth-card h1 {

          font-size: 47px;

          line-height: 1.05;

          letter-spacing: -2px;

          font-weight: 800;

          margin-bottom: 18px;

        }


        .listing-auth-card > p {

          color: var(--muted);

          font-size: 17px;

          line-height: 1.7;

          max-width: 430px;

          margin: 0 auto 30px;

        }


        .auth-actions {

          display: flex;

          justify-content: center;

          gap: 10px;

        }


        .primary-auth-button,
        .secondary-auth-button {

          min-height: 45px;

          border-radius: 8px;

          padding: 0 18px;

          font-size: 16px;

          font-weight: 700;

          display: flex;

          align-items: center;

          gap: 8px;

        }


        .primary-auth-button {

          background: var(--blue);

          border-color: var(--blue);

        }


        .secondary-auth-button {

          background: white;

          color: var(--dark);

          border-color: var(--border);

        }


        .secondary-auth-button:hover {

          background: #F7F3EC;

          color: var(--dark);

          border-color: #cbd5e1;

        }


        /* ======================================================
           MODAL
        ====================================================== */

        .modern-auth-modal
        .modal-content {

          border: 0;

          border-radius: 17px;

          overflow: hidden;

        }


        .modern-auth-modal
        .modal-header {

          border-bottom:
            1px solid var(--border);

          padding: 20px 24px;

        }


        .modern-auth-modal
        .modal-title {

          font-size: 19px;

          font-weight: 750;

        }


        .modern-auth-modal
        .modal-body {

          padding: 30px;

        }


        .modal-heart-icon {

          width: 48px;

          height: 48px;

          border-radius: 12px;

          background: #fff1f2;

          color: #ef4444;

          display: flex;

          align-items: center;

          justify-content: center;

          margin-bottom: 18px;

        }


        .modern-auth-modal h3 {

          font-size: 25px;

          letter-spacing: -0.6px;

          font-weight: 800;

          margin-bottom: 7px;

        }


        .modern-auth-modal p {

          color: var(--muted);

          font-size: 16px;

          line-height: 1.6;

        }


        .modal-buttons {

          display: grid;

          gap: 9px;

          margin-top: 24px;

        }


        .modal-buttons .btn {

          min-height: 44px;

          border-radius: 8px;

          font-size: 16px;

          font-weight: 700;

        }


        .modal-login {

          background: var(--blue);

          border-color: var(--blue);

        }


        .modal-register {

          background: white;

          border-color: var(--border);

          color: var(--dark);

        }


        /* ======================================================
           RESPONSIVE
        ====================================================== */

        @media (max-width: 991px) {

          .listings-header {

            padding: 50px 0 35px;

          }

          .header-content {

            align-items: flex-start;

            gap: 25px;

          }

          .header-count {

            display: none;

          }

          .filter-bar {

            align-items: stretch;

            flex-direction: column;

            gap: 10px;

            border-radius: 14px;

          }

          .filter-divider {

            display: none;

          }

          .sort-control {

            width: 100%;

          }

        }


        @media (max-width: 767px) {

          .listings-header {

            padding: 40px 0 30px;

          }

          .header-content h1 {

            font-size: 44px;

            letter-spacing: -1.8px;

          }

          .header-content p {

            font-size: 16px;

          }

          .search-section {

            position: relative;

          }

          .modern-card-image {

            height: 245px;

          }

          .listings-content {

            padding-top: 30px;

          }

          .listing-auth-card {

            margin: 25px 15px;

            padding: 38px 25px;

          }

          .listing-auth-card h1 {

            font-size: 38px;

          }

          .auth-actions {

            flex-direction: column;

          }

          .primary-auth-button,
          .secondary-auth-button {

            justify-content: center;

          }

          .results-bar {

            align-items: flex-start;

          }

        }

`}</style>
);

function Listings() {

  const { user } = useUserAuth();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('');

  const [favorites, setFavorites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [sortOption, setSortOption] = useState('recommended');

  const listingsPerPage = 8;


  // ============================================================
  // GET LISTINGS
  // ============================================================

  useEffect(() => {

    if (user) {

      getListings();

      const savedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || [];

      setFavorites(savedFavorites);

    }

  }, [user]);


  const getListings = async () => {

    setLoading(true);

    try {

      const data =
        await ListingsDataService.getAllListings();

      setListings(data || []);

    } catch (error) {

      console.error(
        'Error fetching listings: ',
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchChange = (event) => {

    setSearchTerm(event.target.value);

    setCurrentPage(1);

  };


  // ============================================================
  // CATEGORY
  // ============================================================

  const handleCategoryClick = (Type) => {

    setSelectedType(Type);

    setCurrentPage(1);

  };


  // ============================================================
  // FAVORITES
  // ============================================================

  const toggleFavorite = (id) => {

    if (!user) {

      setShowAuthModal(true);

      return;

    }


    const newFavorites =
      favorites.includes(id)

        ? favorites.filter(
            favId => favId !== id
          )

        : [...favorites, id];


    setFavorites(newFavorites);

    localStorage.setItem(
      'favorites',
      JSON.stringify(newFavorites)
    );

  };


  // ============================================================
  // FILTER
  // ============================================================

  const filteredListings = listings.filter(

    (listing) => {

      const search =
        searchTerm.toLowerCase().trim();


      const matchesSearch =
        !search ||

        listing.title
          ?.toLowerCase()
          .includes(search);


      const matchesType =
        selectedType

          ? (
              listing.Type ||
              listing.roomType ||
              ''
            )
              .toLowerCase()
              .includes(
                selectedType.toLowerCase()
              )

          : true;


      return (
        listing.available !== false &&
        matchesSearch &&
        matchesType
      );

    }

  );


  // ============================================================
  // SORT
  // ============================================================

  const sortedListings = [...filteredListings].sort(

    (a, b) => {

      if (sortOption === 'price-low') {

        return (
          Number(a.price || 0) -
          Number(b.price || 0)
        );

      }


      if (sortOption === 'price-high') {

        return (
          Number(b.price || 0) -
          Number(a.price || 0)
        );

      }


      if (sortOption === 'rating') {

        return (
          Number(b.rating || 0) -
          Number(a.rating || 0)
        );

      }


      return 0;

    }

  );


  // ============================================================
  // PAGINATION
  // ============================================================

  const indexOfLastListing =
    currentPage * listingsPerPage;

  const indexOfFirstListing =
    indexOfLastListing - listingsPerPage;

  const currentListings =
    sortedListings.slice(
      indexOfFirstListing,
      indexOfLastListing
    );


  const totalPages =
    Math.ceil(
      sortedListings.length /
      listingsPerPage
    );


  const paginate = (pageNumber) => {

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  };


  // ============================================================
  // LOGIN REQUIRED
  // ============================================================

  if (!user) {

    return (

      <div className="listing-auth-page">

        <PageStyles />

        <div className="auth-background-shape"></div>

        <Container>

          <div className="listing-auth-card">

            <div className="auth-logo">
              <span>O</span>
            </div>

            <div className="auth-eyebrow">
              OTAGORENTALS
            </div>

            <h1>
              Your next place
              <br />
              is waiting.
            </h1>

            <p>
              Sign in to browse available
              properties, save your favourites
              and explore your next home.
            </p>

            <div className="auth-actions">

              <Button
                as={Link}
                to="/login"
                className="primary-auth-button"
              >
                <FaSignInAlt />
                Sign in
              </Button>

              <Button
                as={Link}
                to="/register"
                className="secondary-auth-button"
              >
                Create an account
                <FaArrowRight />
              </Button>

            </div>

          </div>

        </Container>

      </div>

    );

  }


  return (

    <div className="modern-listings-page">


      {/* ========================================================
          PAGE HEADER
      ======================================================== */}

      <section className="listings-header">

        <Container>

          <div className="header-content">

            <div>

              <div className="page-eyebrow">
                EXPLORE OTAGORENTALS
              </div>

              <h1>
                Find your next place.
              </h1>

              <p>
                Browse available rooms, apartments
                and homes in great locations.
              </p>

            </div>


            <div className="header-count">

              <strong>
                {filteredListings.length}
              </strong>

              <span>
                available
                <br />
                properties
              </span>

            </div>

          </div>

        </Container>

      </section>



      {/* ========================================================
          SEARCH AREA
      ======================================================== */}

      <section className="search-section">

        <Container>

          <div className="filter-bar">

            {/* SEARCH */}

            <div className="main-search">

              <FaSearch className="main-search-icon" />

              <Form.Control
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={handleSearchChange}
              />

              {searchTerm && (

                <button
                  type="button"
                  className="clear-search"
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                >
                  <FaTimes />
                </button>

              )}

            </div>

            <div className="filter-divider" />

            {/* PROPERTY TYPE */}

            <div className="filter-segment">

              <FaSlidersH className="filter-segment-icon" />

              <div className="category-buttons">

                <button
                  type="button"
                  className={
                    `category-pill ${
                      !selectedType
                        ? 'active'
                        : ''
                    }`
                  }
                  onClick={() =>
                    handleCategoryClick('')
                  }
                >
                  All types
                </button>

                <CategoryButtons
                  selectedType={selectedType}
                  onCategoryClick={
                    handleCategoryClick
                  }
                />

              </div>

            </div>

            <div className="filter-divider" />

            {/* SORT */}

            <div className="sort-control">

              <span>
                Sort by
              </span>

              <Form.Select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
              >

                <option value="recommended">
                  Recommended
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>

              </Form.Select>

            </div>

          </div>

        </Container>

      </section>



      {/* ========================================================
          LISTINGS
      ======================================================== */}

      <main className="listings-content">

        <Container>


          {/* RESULT BAR */}

          <div className="results-bar">

            <div>

              <span className="results-number">
                {sortedListings.length}
              </span>

              <span className="results-text">
                {selectedType
                  ? ` ${selectedType.toLowerCase()} properties`
                  : ' properties found'}
              </span>

            </div>


            {selectedType && (

              <button
                type="button"
                className="clear-filter"
                onClick={() =>
                  handleCategoryClick('')
                }
              >
                Clear filter
                <FaTimes />
              </button>

            )}

          </div>



          {/* LOADING */}

          {loading ? (

            <div className="loading-state">

              <div className="loading-spinner">

                <Spinner animation="border" />

              </div>

              <h3>
                Finding properties
              </h3>

              <p>
                Just a moment...
              </p>

            </div>

          ) : sortedListings.length === 0 ? (

            /* EMPTY STATE */

            <div className="empty-state">

              <div className="empty-icon">
                <FaSearch />
              </div>

              <h2>
                No properties found
              </h2>

              <p>
                Try changing your search or
                removing some filters.
              </p>

              <Button
                type="button"
                onClick={() => {

                  setSearchTerm('');
                  setSelectedType('');
                  setCurrentPage(1);

                }}
              >
                Clear search
              </Button>

            </div>

          ) : (

            <>


              {/* PROPERTY GRID */}

              <Row className="listing-grid">

                {currentListings.map((listing) => (

                  <Col
                    key={listing.id}
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={3}
                    className="listing-column"
                  >

                    <Card
                      className="modern-listing-card"

                      onMouseEnter={() =>
                        setHoveredCard(
                          listing.id
                        )
                      }

                      onMouseLeave={() =>
                        setHoveredCard(null)
                      }
                    >


                      {/* IMAGE */}

                      <div className="modern-card-image">

                        <Card.Img

                          src={
                            listing.image ||
                            listing.images?.[0] ||
                            getFallbackImage(
                              listing.id
                            )
                          }

                          alt={listing.title}

                          className="listing-photo"

                        />


                        {/* GRADIENT */}

                        <div className="image-gradient"></div>


                        {/* FAVORITE */}

                        <button

                          type="button"

                          aria-label="Save property"

                          className={
                            `modern-favorite ${
                              favorites.includes(
                                listing.id
                              )
                                ? 'saved'
                                : ''
                            }`
                          }

                          onClick={(e) => {

                            e.preventDefault();

                            toggleFavorite(
                              listing.id
                            );

                          }}

                        >

                          {favorites.includes(
                            listing.id
                          )

                            ? <FaHeart />

                            : <FaRegHeart />

                          }

                        </button>


                        {/* AVAILABLE */}

                        <div className="availability-badge">

                          <span></span>

                          Available

                        </div>


                        {/* QUICK VIEW */}

                        {hoveredCard ===
                          listing.id && (

                          <Link

                            to={
                              `/DescriptionPage/${listing.id}`
                            }

                            className="quick-view-button"

                          >

                            View property

                            <IoIosArrowForward />

                          </Link>

                        )}

                      </div>



                      {/* CONTENT */}

                      <Card.Body
                        className="modern-card-body"
                      >


                        {/* TITLE / RATING */}

                        <div className="card-heading">

                          <div>

                            <h2>
                              {listing.title}
                            </h2>

                            <div className="card-location">

                              <FaMapMarkerAlt />

                              <span>
                                {listing.location}
                              </span>

                            </div>

                          </div>


                          <div className="card-rating">

                            <FaStar />

                            <strong>
                              {listing.rating ||
                                '4.8'}
                            </strong>

                          </div>

                        </div>



                        {/* PROPERTY DETAILS */}

                        <div className="property-meta">

                          <span>

                            <FaBed />

                            {listing.bedrooms ||
                              '2'} beds

                          </span>


                          <span>

                            <FaBath />

                            {listing.bathrooms ||
                              '1'} bath

                          </span>


                          <span>

                            <FaRulerCombined />

                            {listing.area ||
                              '850'} sqft

                          </span>

                        </div>



                        {/* PRICE */}

                        <div className="card-footer-info">

                          <div className="price-block">

                            <strong>
                              ${listing.price}
                            </strong>

                            <span>
                              / night
                            </span>

                          </div>


                          <Link
                            to={
                              `/DescriptionPage/${listing.id}`
                            }
                            className="card-arrow"
                          >
                            View
                            <FaArrowRight />
                          </Link>

                        </div>

                      </Card.Body>

                    </Card>

                  </Col>

                ))}

              </Row>



              {/* PAGINATION */}

              {totalPages > 1 && (

                <div className="modern-pagination">

                  <Pagination>


                    <Pagination.Prev

                      disabled={
                        currentPage === 1
                      }

                      onClick={() =>
                        paginate(
                          Math.max(
                            1,
                            currentPage - 1
                          )
                        )
                      }

                    />


                    {Array.from(
                      { length: totalPages },
                      (_, i) => (

                        <Pagination.Item

                          key={i + 1}

                          active={
                            i + 1 ===
                            currentPage
                          }

                          onClick={() =>
                            paginate(i + 1)
                          }

                        >

                          {i + 1}

                        </Pagination.Item>

                      )
                    )}


                    <Pagination.Next

                      disabled={
                        currentPage ===
                        totalPages
                      }

                      onClick={() =>
                        paginate(
                          Math.min(
                            totalPages,
                            currentPage + 1
                          )
                        )
                      }

                    />

                  </Pagination>

                </div>

              )}

            </>

          )}

        </Container>

      </main>



      {/* ========================================================
          AUTH MODAL
      ======================================================== */}

      <Modal
        show={showAuthModal}
        onHide={() =>
          setShowAuthModal(false)
        }
        centered
        className="modern-auth-modal"
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Save your favourite
          </Modal.Title>

        </Modal.Header>


        <Modal.Body>

          <div className="modal-heart-icon">
            <FaHeart />
          </div>

          <h3>
            Keep track of places you love.
          </h3>

          <p>
            Sign in to save properties and
            quickly find them again later.
          </p>


          <div className="modal-buttons">

            <Button
              as={Link}
              to="/login"
              onClick={() =>
                setShowAuthModal(false)
              }
              className="modal-login"
            >
              Sign in
            </Button>

            <Button
              as={Link}
              to="/register"
              onClick={() =>
                setShowAuthModal(false)
              }
              className="modal-register"
            >
              Create account
            </Button>

          </div>

        </Modal.Body>

      </Modal>



      {/* ========================================================
          CSS
      ======================================================== */}

      <PageStyles />

    </div>

  );

}


export default Listings;