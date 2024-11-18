import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting the listing ID from the URL
import ListingsDataService from "./services/ListingsDataService"; // Firebase service
import { ButtonGroup, Form, Alert, Button, Container, Row, Col, Card } from "react-bootstrap";
import { storage } from './firebase'; // Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage functions
import { useUserAuth } from "./context/UserAuthContext"; // Auth context

function AddListings() {
  const { id } = useParams(); // Get the listing ID from the URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const { user } = useUserAuth(); // Get the logged-in user

  useEffect(() => {
    if (id) {
      fetchListingData();
    }
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
        setExistingImages(listing.images || []); // Populate existing images
      } else {
        console.error("No listing found with the given ID.");
        setMessage({ error: true, msg: "Listing not found." });
      }
    } catch (error) {
      console.error("Error fetching listing data: ", error);
      setMessage({ error: true, msg: "Error fetching listing data." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !description || !price || !location) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newListing = {
      title,
      description,
      price,
      location,
      hostId: user?.uid, // Include the logged-in user's ID
    };

    try {
      let listingId;

      if (id) {
        await ListingsDataService.updateListing(id, newListing); // Update existing listing
        listingId = id;
        setMessage({ error: false, msg: "Listing updated successfully!" });
      } else {
        const docRef = await ListingsDataService.addListing(newListing); // Add new listing
        listingId = docRef.id;
        setMessage({ error: false, msg: "Listing added successfully!" });
      }

      await handleImageUpload(listingId); // Handle image upload
    } catch (error) {
      console.error("Error saving listing: ", error);
      setMessage({ error: true, msg: error.message });
    }
  };

  const handleImageUpload = async (listingId) => {
    const imageUrls = [...existingImages]; // Retain existing images

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

    await ListingsDataService.updateListingImages(listingId, imageUrls); // Update Firestore with new image URLs
  };

  const uploadToFirebase = async (listingId, file, imageName) => {
    const imageRef = ref(storage, `listings/${listingId}/${imageName}`);
    await uploadBytes(imageRef, file);
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header>{id ? "Update Listing" : "Add Listing"}</Card.Header>
            <Card.Body>
              <Alert
                variant={message?.error ? "danger" : "success"}
                show={!!message.msg}
                dismissible
                onClose={() => setMessage("")}
              >
                {message?.msg}
              </Alert>

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.valueAsNumber)}
                        placeholder="Enter the price per week"
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
                  />
                </Form.Group>

                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter the location"
                  />
                </Form.Group>

                {/* Existing Images */}
                <Row>
                  {existingImages.map((url, index) => (
                    <Col key={index} md={4}>
                      <img
                        src={url}
                        alt={`Listing Image ${index + 1}`}
                        className="img-fluid mb-3"
                      />
                    </Col>
                  ))}
                </Row>

                {/* New Image Upload Fields */}
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formImage1" className="mb-3">
                      <Form.Label>Image 1</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formImage2" className="mb-3">
                      <Form.Label>Image 2</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setImage2(e.target.files[0])}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formImage3" className="mb-3">
                      <Form.Label>Image 3</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setImage3(e.target.files[0])}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <ButtonGroup className="d-flex justify-content-between">
                  <Button variant="primary" type="submit">
                    {id ? "Update Listing" : "Add Listing"}
                  </Button>
                  <Button variant="secondary" onClick={() => window.location.reload()}>
                    Reset Form
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

export default AddListings;
