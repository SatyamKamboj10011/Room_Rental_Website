import { useEffect, useState } from "react";
import ListingsDataService from "./services/ListingsDataService"; // Your Firebase service
import { ButtonGroup, Form, Alert, Button } from "react-bootstrap";

function AddListings({ id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  // Handle form submission
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

      // Check if we are updating or adding a new listing
      if (id) {
        await ListingsDataService.updateListing(id, newListing);
        listingId = id;
        setMessage({ error: false, msg: "Listing updated successfully!" });
      } else {
        const docRef = await ListingsDataService.addListing(newListing);
        listingId = docRef.id;
        setMessage({ error: false, msg: "Listing added successfully!" });
      }

      await handleImageUpload(listingId); // Upload images and associate them with the listing
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }

    // Reset form fields
    setTitle("");
    setDescription("");
    setPrice("");
    setImage(null);
    setImage2(null);
    setImage3(null);
    setLocation("");
  };

  // Handle image upload to Firebase Storage
  const handleImageUpload = async (listingId) => {
    const imageUrls = [];

    // Upload each image to Firebase Storage and retrieve the download URL
    if (image) {
      const imageUrl = await ListingsDataService.uploadImage(listingId, image);
      imageUrls.push(imageUrl);
    }

    if (image2) {
      const imageUrl2 = await ListingsDataService.uploadImage(listingId, image2);
      imageUrls.push(imageUrl2);
    }

    if (image3) {
      const imageUrl3 = await ListingsDataService.uploadImage(listingId, image3);
      imageUrls.push(imageUrl3);
    }

    // Update the listing with the image URLs
    await ListingsDataService.updateListingImages(listingId, imageUrls);
  };

  // Handle editing an existing listing
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
        // Optionally, pre-fill the images if needed
      }
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }
  };

  // Fetch listing data when in edit mode
  useEffect(() => {
    if (id) {
      editHandler();
    }
  }, [id]);

  return (
    <>
      <Alert
        variant={message?.error ? "danger" : "success"}
        dismissible
        onClose={() => setMessage("")}
      >
        {message?.msg}
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image 1</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId="formImage2">
          <Form.Label>Image 2</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId="formImage3">
          <Form.Label>Image 3</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage3(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <ButtonGroup>
          <Button variant="primary" type="submit">
            {id ? "Update Listing" : "Add Listing"}
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}

export default AddListings;
