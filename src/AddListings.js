import { useEffect, useState } from "react";
import ListingsDataService from "./services/ListingsDataService"; // Your Firebase service
import { ButtonGroup, Form, Alert, Button, Container, Row, Col, Card } from "react-bootstrap";
import { storage } from './firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Functions for image upload

function AddListings({ id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (title === "" || description === "" || price === "" || !image || !image2 || !image3 || location === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newListing = { title, description, price, location };

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
      }

      await handleImageUpload(listingId); // Upload images
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }

    setTitle("");
    setDescription("");
    setPrice("");
    setImage(null);
    setImage2(null);
    setImage3(null);
    setLocation("");
  };

  const handleImageUpload = async (listingId) => {
    const imageUrls = [];

    if (image) {
      const imageUrl = await uploadToFirebase(listingId, image, 'image1');
      imageUrls.push(imageUrl);
    }
    if (image2) {
      const imageUrl2 = await uploadToFirebase(listingId, image2, 'image2');
      imageUrls.push(imageUrl2);
    }
    if (image3) {
      const imageUrl3 = await uploadToFirebase(listingId, image3, 'image3');
      imageUrls.push(imageUrl3);
    }

    await ListingsDataService.updateListingImages(listingId, imageUrls); // Update Firestore with URLs
  };

  const uploadToFirebase = async (listingId, file, imageName) => {
    const imageRef = ref(storage, `listings/${listingId}/${imageName}`); // Define Firebase storage path
    await uploadBytes(imageRef, file); // Upload file
    const downloadUrl = await getDownloadURL(imageRef); // Get the download URL
    return downloadUrl;
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ListingsDataService.getListingById(id);
      if (docSnap) {
        const listingData = docSnap;
        setTitle(listingData.title);
        setDescription(listingData.description);
        setPrice(listingData.price);
        setLocation(listingData.location);
      }
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }
  };

  useEffect(() => {
    if (id) {
      editHandler();
    }
  }, [id]);

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

                {/* Image Upload Fields */}
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
