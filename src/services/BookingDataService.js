import { db } from './firebase'; // Adjust the path
import { doc, getDoc, addDoc, updateDoc, collection ,getDocs,query,where} from 'firebase/firestore';

class BookingDataService {

  // Fetch booking details by booking ID
  getBookingDetailsById = async (id) => {
    if (!id) throw new Error("Booking ID is required");

    try {
      const bookingDoc = doc(db, "bookings", id);
      const bookingSnapshot = await getDoc(bookingDoc);

      if (!bookingSnapshot.exists()) {
        throw new Error("No booking found with the provided ID");
      }

      return { id: bookingSnapshot.id, ...bookingSnapshot.data() };
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw new Error(error.message || "Error fetching booking details");
    }
  };

  // Fetch listing details by listing ID
  getListingById = async (listingId) => {
    if (!listingId) throw new Error("Listing ID is required");

    try {
      const listingDocRef = doc(db, "listings", listingId);
      const listingSnapshot = await getDoc(listingDocRef);

      if (!listingSnapshot.exists()) {
        throw new Error("No listing found with the provided ID");
      }

      return { id: listingSnapshot.id, ...listingSnapshot.data() };
    } catch (error) {
      console.error("Error fetching listing:", error);
      throw new Error(error.message || "Error fetching listing details");
    }
  };

  // Create a new booking and save it to the Firestore database
  createBooking = async (bookingData, listingId) => {
    if (!listingId || !bookingData) {
      throw new Error('Invalid booking data or listing ID');
    }

    try {
      const bookingCollection = collection(db, 'bookings');
      const docRef = await addDoc(bookingCollection, {
        ...bookingData,
        listingId,
        createdAt: new Date(),
      });
      console.log('Firestore - Booking created with ID:', docRef.id);
      return docRef.id; // Return the generated booking ID
    } catch (error) {
      console.error('Firestore - Error creating booking:', error);
      throw new Error('Booking creation failed');
    }
  };

  // Cancel a booking
  cancelBooking = async (bookingId) => {
    if (!bookingId) throw new Error("Booking ID is required");
    try {
      await updateDoc(doc(db, "bookings", bookingId), { cancelled: true });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw new Error("Error cancelling booking");
    }
  };

  // Fetch booking and listing data in parallel
  getBookingAndListing = async (bookingId, listingId) => {
    try {
      const [booking, listing] = await Promise.all([
        this.getBookingDetailsById(bookingId),
        this.getListingById(listingId)
      ]);
      return { ...booking, roomTitle: listing.title, roomLocation: listing.location };
    } catch (error) {
      console.error("Error fetching booking and listing:", error);
      throw new Error("Error fetching booking and listing");
    }
  };

// Fetch all bookings
getBookings = async () => {
  try {
    const bookingsCollection = collection(db, 'bookings');
    const snapshot = await getDocs(bookingsCollection);
    const bookingsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return bookingsList;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error('Error fetching bookings');
  }
};

getBookingsForListing = async (listingId) => {
  if (!listingId) throw new Error("Listing ID is required");
  
  try {
    const bookingsQuery = query(collection(db, "bookings"), where("listingId", "==", listingId));
    const querySnapshot = await getDocs(bookingsQuery);
    
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error(error.message || "Error fetching bookings for this listing");
  }
};

getEarningsForListing = async (listingId) => {
    if (!listingId) throw new Error("Listing ID is required");

    try {
      const bookingsQuery = query(collection(db, "bookings"), where("listingId", "==", listingId));
      const querySnapshot = await getDocs(bookingsQuery);
      
      // Map bookings to get their prices
      const bookings = querySnapshot.docs.map(doc => doc.data());
      
      // Calculate earnings based on bookings
      const totalEarnings = bookings.reduce((total, booking) => {
        const price = parseFloat(booking.totalPrice ?? booking.price) || 0; // Ensure price is a number
        return total + price;
      }, 0);

      return totalEarnings; // Return the total earnings for the listing
    } catch (error) {
      console.error("Error fetching earnings for the listing:", error);
      throw new Error(error.message || "Error fetching earnings for this listing");
    }
  };
}

export default new BookingDataService();
