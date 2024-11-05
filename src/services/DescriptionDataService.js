import { db } from '../firebase'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';

class DescriptionDataService {
    getListingById = async (id) => {
        const listingDoc = doc(db, 'listings', id); // Ensure 'listings' is the correct collection name
        const listingSnapshot = await getDoc(listingDoc);
        if (listingSnapshot.exists()) {
            return { id: listingSnapshot.id, ...listingSnapshot.data() };
        } else {
            console.log('No such document!');
            return null;
        }
    };
}

export default new DescriptionDataService();
