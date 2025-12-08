import { auth } from "@/firebase/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "@/firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { UserSchema } from "@/model/UserModel";

export async function registerUser(data: {
  name: string;
  surname: string;
  email: string;
  password: string;
  userType: "autonomo" | "freelance" | "empresa" | "particular";
}) {
  // Crear usuario en Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const uid = userCredential.user.uid;

  const parsed = UserSchema.parse({
    name: data.name,
    surname: data.surname,
    email: data.email,
    userType: data.userType,
    createdAt: new Date(),
  });

  // Guardar en Firestore
  await setDoc(doc(db, "users", uid), parsed);

  return userCredential;
}


export async function loginUser(email: string, password: string) {
  console.log("email:", email, typeof email);
  console.log("password:", password, typeof password);
  return await signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
  return signOut(auth);
}