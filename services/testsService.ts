import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

// Tipo de usuario (puedes adaptarlo)
export interface User {
  id: string;
  name: string;
  createdAt: Date;
}

// Colección de Firestore
const usersCollection = collection(db, "users");

export async function fetchUsers(): Promise<User[]> {
  const snapshot = await getDocs(usersCollection);

  return snapshot.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      name: data.name,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate()
        : data.createdAt ?? new Date(),
    };
  });
}

export async function createUser(name: string): Promise<void> {
  if (!name.trim()) return;

  await addDoc(usersCollection, {
    name,
    createdAt: Timestamp.fromDate(new Date()),
  });
}

export async function updateUserName(id: string, newName: string): Promise<void> {
  const ref = doc(db, "users", id);
  await updateDoc(ref, { name: newName });
}

export async function deleteUserById(id: string): Promise<void> {
  const ref = doc(db, "users", id);
  await deleteDoc(ref);
}
