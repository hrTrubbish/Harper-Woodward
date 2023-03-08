import { getFirestore } from 'firebase/firestore';
import { FirebaseApp } from '../../config/firebaseFE';

export const db = getFirestore(FirebaseApp);
