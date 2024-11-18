import { db } from '../firebase'; // Adjust the path
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

class BookingDataService {

    getBookingDetailsById = async (id) => {
        try {
          const bookingDoc = doc(db, "listings", id); // Replace 'listings' with 'bookings' if needed
          const bookingSnapshot = await getDoc(bookingDoc);
      
          if (!bookingSnapshot.exists()) {
            throw new Error("No document found with the provided ID");
          }
      
          return { id: bookingSnapshot.id, ...bookingSnapshot.data() };
        } catch (error) {
          console.error("Error fetching booking details:", error);
          throw error;
        }
      };
      

    // Create a new booking and save it to the Firestore database
    createBooking = async (bookingData) => {
        try {
            // 'bookings' is the Firestore collection where bookings are stored
            const bookingsCollection = collection(db, 'bookings');
            const docRef = await addDoc(bookingsCollection, bookingData);
            console.log('Booking successfully created with ID: ', docRef.id);
            return docRef.id; // Return the ID of the newly created booking
        } catch (error) {
            console.error('Error creating booking: ', error);
            throw new Error('Error creating booking');
        }
    };
}

export default new BookingDataService();
