import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ListingsDataService from "../services/ListingsDataService";
import { Button, Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { FaMapMarkerAlt, FaBed, FaBath, FaStar, FaArrowLeft } from "react-icons/fa";
import { getFallbackImage } from "../utils/fallbackImage";

function AddListings() {
  const { id } = useParams(); // Get the listing ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [available, setAvailable] = useState(true);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [guests, setGuests] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);  // State to hold the uploaded images
  const [imageURLs, setImageURLs] = useState([]);  // State to store URLs of uploaded images
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { user } = useUserAuth();

  useEffect(() => {
    if (id) fetchListingData();
  }, [id]);

  const fetchListingData = async () => {
    try {
      const listing = await ListingsDataService.getListingById(id);
      if (listing) {
        setTitle(listing.title || "");
        setDescription(listing.description || "");
        setPrice(listing.price || "");
        setLocation(listing.location || "");
        setRoomType(listing.roomType || "");
        setAvailable(listing.available ?? true);
        setBedrooms(listing.bedrooms || "");
        setBathrooms(listing.bathrooms || "");
        setGuests(listing.guests || "");
        setAmenities(listing.amenities || []);
        setImageURLs(listing.images || []); // Set the existing image URLs if available
      } else {
        setMessage({ error: true, msg: "Listing not found." });
      }
    } catch (error) {
      setMessage({ error: true, msg: "Error fetching listing data." });
    }
  };

  const AMENITY_OPTIONS = ["WiFi", "Parking", "Kitchen", "Air Conditioning", "Washer", "Heating"];

  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAvailabilityToggle = async () => {
    const updatedAvailability = !available;
    setAvailable(updatedAvailability);
    try {
      await ListingsDataService.updateListing(id, { available: updatedAvailability });
      setMessage({ error: false, msg: "Availability updated successfully!" });
    } catch (error) {
      setMessage({ error: true, msg: "Error updating availability." });
    }
  };
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);  // Convert FileList to an array
    if (files.length === 0) return;

    // Check if user tries to upload more than 3 images
    if (files.length + imageURLs.length > 3) {
      setMessage({ error: true, msg: "You can upload a maximum of 3 images." });
      return;
    }

    const uploadedImageURLs = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Use fetch to upload the image to ImgBB
        const response = await fetch(`https://api.imgbb.com/1/upload?key=cb1698e63775c38d0af63afaf7bb61b7`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();  // Parse the JSON response

        if (data.success) {
          uploadedImageURLs.push(data.data.url);  // Store the uploaded image URL
        } else {
          setMessage({ error: true, msg: "Error uploading image to ImgBB." });
          return;
        }
      } catch (error) {
        setMessage({ error: true, msg: "Error uploading image." });
        return;
      }
    }

    // Update state with newly uploaded URLs, without exceeding max of 3 images
    setImageURLs(prevURLs => [...prevURLs, ...uploadedImageURLs]);  // Add new URLs to existing URLs
    setImages(prevImages => [...prevImages, ...files]);  // Store the files for future use (if needed)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !description || !price || !location || !roomType) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }


    const newListing = {
      title,
      description,
      price,
      location,
      roomType,
      Type: roomType.charAt(0).toUpperCase() + roomType.slice(1),
      hostId: user?.uid,
      available,
      bedrooms: bedrooms || null,
      bathrooms: bathrooms || null,
      guests: guests || null,
      amenities,
      image: imageURLs[0] || null,
      images: imageURLs,  // Store the image URLs
    };

    try {
      if (id) {
        await ListingsDataService.updateListing(id, newListing);
        setMessage({ error: false, msg: "Listing updated successfully!" });
      } else {
        await ListingsDataService.addListing(newListing);
        setMessage({ error: false, msg: "Listing added successfully!" });

        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setRoomType("");
        setAvailable(true);
        setBedrooms("");
        setBathrooms("");
        setGuests("");
        setAmenities([]);
        setImageURLs([]);  // Reset image URLs after adding a new listing
      }
    } catch (error) {
      console.error("Error saving listing: ", error);
      setMessage({ error: true, msg: error.message });
    }
  };

  return (
    <div className="listing-editor-page">
      <style>{`
        .listing-editor-page {
          --primary: #C1622D;
          --primary-dark: #a04f24;
          --dark: #1E3A2E;
          --text: #334155;
          --muted: #6b6459;
          --border: #e6ddcf;
          --field-bg: #F4F1EA;

          min-height: 100vh;
          background: #F7F3EC;
          padding: 2rem 1.5rem 4rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--dark);
        }

        .editor-shell {
          max-width: 1180px;
          margin: 0 auto;
        }

        .editor-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .editor-header h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 2rem;
          margin: 0 0 0.35rem;
        }

        .editor-breadcrumb {
          color: var(--muted);
          font-size: 0.9rem;
        }

        .editor-breadcrumb a {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
        }

        .editor-header-actions {
          display: flex;
          gap: 0.6rem;
        }

        .editor-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.1rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: white;
          color: var(--dark);
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          cursor: pointer;
        }

        .editor-back-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .editor-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 1.5rem;
          margin-top: 1.75rem;
          align-items: start;
        }

        .editor-section {
          background: white;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.75rem;
          margin-bottom: 1.5rem;
        }

        .editor-section h2 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 1.35rem;
        }

        .editor-field {
          margin-bottom: 1.15rem;
        }

        .editor-field label {
          display: block;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 0.4rem;
          color: var(--dark);
        }

        .editor-field .form-control,
        .editor-field .form-select {
          border: 1px solid var(--border);
          background: var(--field-bg);
          border-radius: 10px;
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
        }

        .editor-field .form-control:focus,
        .editor-field .form-select:focus {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(193, 98, 45, 0.12);
        }

        .editor-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .amenity-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .amenity-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.9rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          background: var(--field-bg);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
        }

        .amenity-chip input {
          accent-color: var(--primary);
        }

        .image-uploads {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .image-uploads img {
          width: 96px;
          height: 72px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid var(--border);
        }

        .availability-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: var(--field-bg);
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .availability-row .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }

        .submit-btn {
          width: 100%;
          padding: 0.95rem;
          border: none;
          border-radius: 12px;
          background: var(--dark);
          color: white;
          font-weight: 700;
          font-size: 1rem;
        }

        .submit-btn:hover {
          background: #12241c;
        }

        /* PREVIEW CARD */

        .preview-card {
          position: sticky;
          top: 1.5rem;
          background: white;
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
        }

        .preview-label {
          padding: 1rem 1.25rem 0;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .preview-image-wrap {
          position: relative;
          margin: 0.75rem 1.25rem 0;
          border-radius: 12px;
          overflow: hidden;
          height: 170px;
          background: var(--field-bg);
        }

        .preview-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-badge {
          position: absolute;
          left: 10px;
          top: 10px;
          background: rgba(18, 36, 28, 0.82);
          color: white;
          padding: 5px 10px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .preview-body {
          padding: 1rem 1.25rem 1.25rem;
        }

        .preview-body h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
        }

        .preview-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .preview-location svg { color: var(--primary); }

        .preview-meta {
          display: flex;
          gap: 14px;
          padding: 0.75rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          color: var(--text);
          font-size: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .preview-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .preview-meta svg { color: var(--muted); }

        .preview-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 0.5rem;
        }

        .preview-price strong {
          font-size: 1.4rem;
          font-weight: 800;
        }

        .preview-price span {
          color: var(--muted);
          font-size: 0.8rem;
        }

        .preview-note {
          margin: 0 1.25rem 1.25rem;
          padding: 0.75rem 1rem;
          border: 1px solid #d3e0d8;
          background: #eef3f0;
          color: #1E3A2E;
          border-radius: 10px;
          font-size: 0.8rem;
        }

        @media (max-width: 991px) {
          .editor-grid {
            grid-template-columns: 1fr;
          }

          .preview-card {
            position: static;
          }
        }

        @media (max-width: 576px) {
          .editor-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="editor-shell">
        <div className="editor-header">
          <div>
            <div className="editor-breadcrumb">
              <Link to="/hostdashboard">Listings</Link> / {id ? "Edit listing" : "Add new listing"}
            </div>
            <h1>{id ? "Update your listing" : "Configure your listing"}</h1>
          </div>

          <div className="editor-header-actions">
            <button type="button" className="editor-back-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Cancel
            </button>
          </div>
        </div>

        {message.msg && (
          <Alert
            variant={message.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <div className="editor-grid">
            <div>
              {/* GENERAL INFORMATION */}
              <div className="editor-section">
                <h2>General information</h2>

                <div className="editor-field">
                  <label>Title</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="editor-field">
                  <label>Description</label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="editor-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="editor-field">
                    <label>Location</label>
                    <Form.Control
                      type="text"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="editor-field">
                    <label>Room type</label>
                    <Form.Select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                    >
                      <option value="">Select room type</option>
                      <option value="single">Single Room</option>
                      <option value="double">Double Room</option>
                      <option value="suite">Suite</option>
                      <option value="apartment">Apartment</option>
                      <option value="studio">Studio</option>
                    </Form.Select>
                  </div>
                </div>

                <div className="editor-field">
                  <label>Price per week ($)</label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                  />
                </div>
              </div>

              {/* CAPACITY */}
              <div className="editor-section">
                <h2>Rooms & capacity</h2>

                <div className="editor-row">
                  <div className="editor-field">
                    <label>Bedrooms</label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="0"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    />
                  </div>
                  <div className="editor-field">
                    <label>Bathrooms</label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="0"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                    />
                  </div>
                  <div className="editor-field">
                    <label>Guests</label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="0"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    />
                  </div>
                </div>

                <div className="editor-field" style={{ marginTop: '0.5rem' }}>
                  <label>Amenities</label>
                  <div className="amenity-grid">
                    {AMENITY_OPTIONS.map((amenity) => (
                      <label key={amenity} className="amenity-chip">
                        <input
                          type="checkbox"
                          checked={amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* PHOTOS */}
              <div className="editor-section">
                <h2>Photos</h2>

                <div className="editor-field">
                  <label>Upload images (max 3)</label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <div className="image-uploads">
                    {imageURLs.map((url, index) => (
                      <img key={index} src={url} alt={`Uploaded Preview ${index + 1}`} />
                    ))}
                  </div>
                </div>
              </div>

              {id && (
                <div className="availability-row">
                  <div>
                    <strong>Availability:</strong>{" "}
                    <span
                      className="status-dot"
                      style={{ background: available ? "#4e8363" : "#b3261e" }}
                    ></span>
                    {available ? "Available" : "Unavailable"}
                  </div>
                  <Button
                    variant={available ? "outline-danger" : "outline-success"}
                    size="sm"
                    onClick={handleAvailabilityToggle}
                  >
                    {available ? "Set unavailable" : "Set available"}
                  </Button>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {id ? "Update listing" : "Publish listing"}
              </button>
            </div>

            {/* LIVE PREVIEW */}
            <div className="preview-card">
              <div className="preview-label">Live preview</div>

              <div className="preview-image-wrap">
                <span className="preview-badge">
                  {available ? "Available" : "Unavailable"}
                </span>
                <img
                  src={imageURLs[0] || getFallbackImage(title || "preview")}
                  alt={title || "Listing preview"}
                />
              </div>

              <div className="preview-body">
                <h3>{title || "Your listing title"}</h3>
                <div className="preview-location">
                  <FaMapMarkerAlt />
                  <span>{location || "Location"}</span>
                </div>

                <div className="preview-meta">
                  <span><FaBed /> {bedrooms || "0"} beds</span>
                  <span><FaBath /> {bathrooms || "0"} bath</span>
                  <span><FaStar /> 4.8</span>
                </div>

                <div className="preview-price">
                  <strong>${price || "0"}</strong>
                  <span>/ week</span>
                </div>
              </div>

              <div className="preview-note">
                This is a preview of how your listing will appear to renters.
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddListings;
