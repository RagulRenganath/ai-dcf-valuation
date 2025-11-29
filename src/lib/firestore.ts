import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function saveValuation(userId: string, payload: any) {
  const col = collection(db, "valuations");
  const docRef = await addDoc(col, {
    userId,
    createdAt: new Date().toISOString(),
    payload
  });
  return docRef.id;
}

export async function loadUserValuations(userId: string) {
  const col = collection(db, "valuations");
  const q = query(col, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

