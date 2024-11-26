import { db } from '../firebase'; // Adjust the path
import { doc, getDoc } from 'firebase/firestore';

class BookingDataService {
    getBookingDetailsById = async (id) => {
        const bookingDoc = doc(db, 'listings', id); // 'listings' is your Firestore collection
        const bookingSnapshot = await getDoc(bookingDoc);
        if (bookingSnapshot.exists()) {
            return { id: bookingSnapshot.id, ...bookingSnapshot.data() };
        } else {
            console.log('No such document!');
            return null;
        }
    };
}

export default new BookingDataService();
