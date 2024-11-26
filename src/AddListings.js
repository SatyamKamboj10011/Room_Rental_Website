import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingsDataService from "./services/ListingsDataService";
import { Button, Container, Row, Col, Card, Form, Alert } from "react-bootstrap";
import { useUserAuth } from "./context/UserAuthContext";


function AddListings() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [available, setAvailable] = useState(true);
  const [images, setImages] = useState([]);  // State to hold the uploaded images
  const [imageURLs, setImageURLs] = useState([]);  // State to store URLs of uploaded images
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  
  const { user } = useUserAuth();

  useEffect(() => {
    if (id) fetchListingData();
  }, [id]);

  const fetchListingData = async () => {
    try {
      const listing = await ListingsDataService.getListingById(id); // Fetch listing data by ID
      if (listing) {
        console.log("Fetched Listing: ", listing); // Debug log
        setTitle(listing.title || "");
        setDescription(listing.description || "");
        setPrice(listing.price || "");
        setLocation(listing.location || "");
        setRoomType(listing.roomType || "");
        setAvailable(listing.available ?? true);
        setImageURLs(listing.images || []); // Set the existing image URLs if available
      } else {
        console.error("No listing found with the given ID.");
        setMessage({ error: true, msg: "Listing not found." });
      }
    } catch (error) {
      console.error("Error fetching listing data: ", error);
      setMessage({ error: true, msg: "Error fetching listing data." });
    }
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
      hostId: user?.uid,
      available,
      images: imageURLs,  // Store the image URLs
    };

    try {
      let listingId;

      if (id) {
        await ListingsDataService.updateListing(id, newListing);
        listingId = id;
        setMessage({ error: false, msg: "Listing updated successfully!" });
      } else {
        const docRef = await ListingsDataService.addListing(newListing);
        listingId = docRef.id;
        setMessage({ error: false, msg: "Listing added successfully!" });

        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setRoomType("");
        setAvailable(true);
        setImageURLs([]);  // Reset image URLs after adding a new listing
      }
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }

    resetForm(); // Reset the form after submitting
  };

  const handleImageUpload = async (listingId) => {
    setIsUploading(true);
    const imageUrls = [...existingImages];
    try {
      if (image) {
        const imageUrl = await uploadToFirebase(listingId, image, "image1");
        imageUrls.push(imageUrl);
      }
      if (image2) {
        const imageUrl2 = await uploadToFirebase(listingId, image2, "image2");
        imageUrls.push(imageUrl2);
      }
      if (image3) {
        const imageUrl3 = await uploadToFirebase(listingId, image3, "image3");
        imageUrls.push(imageUrl3);
      }
      await ListingsDataService.updateListingImages(listingId, imageUrls);
    } catch (error) {
      setMessage({ error: true, msg: "Error uploading images." });
    } finally {
      setIsUploading(false);
    }
  };

  const uploadToFirebase = async (listingId, file, imageName) => {
    const imageRef = ref(storage, `listings/${listingId}/${imageName}`);
    await uploadBytes(imageRef, file);
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  };

  const handleDeleteImage = async (index) => {
    const imageUrl = existingImages[index];
    try {
      await deleteImageFromFirebase(id, imageUrl); // Delete from Firebase storage
      const updatedImages = existingImages.filter((_, i) => i !== index);
      setExistingImages(updatedImages); // Update state to remove image from UI
    } catch (error) {
      setMessage({ error: true, msg: "Error deleting image from storage." });
    }
  };

  const deleteImageFromFirebase = async (listingId, imageUrl) => {
    const imageRef = ref(storage, `listings/${listingId}/${imageUrl}`);
    await deleteObject(imageRef);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setImage(null);
    setImage2(null);
    setImage3(null);
    setLocation("");
    setRoomType("");
    setExistingImages([]);
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_960_720.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src="https://th.bing.com/th/id/OIP.r-MyMkJd3UvU6rFpLbCatAAAAA?w=474&h=474&rs=1&pid=ImgDetMain"
                alt="Decorative"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                }}
              />
              <h3 style={{ color: "#007bff", fontWeight: "bold" }}>Your Perfect Space</h3>
              <p style={{ color: "#555" }}>
                Add or update your listings and manage your room's availability with ease.
              </p>
            </div>
          </Col>

          <Col md={7} lg={6}>
            <Card
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <Card.Header
                style={{
                  backgroundImage: "linear-gradient(to right, #007bff, #4caf50)",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.8rem",
                  padding: "20px 0",
                }}
              >
                {id ? "Update Listing" : "Add Listing"}
              </Card.Header>
              <Card.Body style={{ padding: "30px" }}>
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
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                        style={formControlStyle}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.valueAsNumber)}
                        placeholder="Enter the price per week"
                        style={formControlStyle}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the listing"
                    style={formControlStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter the location"
                    style={formControlStyle}
                  />
                </Form.Group>

                <Row>
                  {existingImages.map((url, index) => (
                    <Col key={index} md={4} className="position-relative">
                      <img src={url} alt={`Listing Image ${index + 1}`} className="img-fluid mb-3" />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteImage(index)}
                        className="position-absolute top-0 end-0"
                      >
                        &times;
                      </Button>
                    </Col>
                  ))}
                </Row>

                {/* Room Type Dropdown */}
                <Form.Group controlId="formRoomType" className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    style={formControlStyle}
                  >
                    <option value="">Select room type</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                    <option value="suite">Suite</option>
                  </Form.Control>
                </Form.Group>

                  <Form.Group controlId="formImages" className="mb-3">
                    <Form.Label>Upload Images (Max 3)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      {imageURLs.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Uploaded Preview ${index + 1}`}
                          width="30%"
                          style={{ borderRadius: "5px" }}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="mb-0">
                      <strong>Availability:</strong>{" "}
                      <span style={{ color: available ? "green" : "red" }}>
                        {available ? "Available" : "Unavailable"}
                      </span>
                    </p>
                    <Button
                      variant={available ? "danger" : "success"}
                      onClick={handleAvailabilityToggle}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      {available ? "Set Unavailable" : "Set Available"}
                    </Button>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {id ? "Update Listing" : "Add Listing"}
                  </Button>
                </ButtonGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const formControlStyle = {
  borderRadius: "5px",
  borderColor: "#007bff",
  boxShadow: "0 0 5px rgba(0, 123, 255, 0.3)"
};

export default AddListings;
