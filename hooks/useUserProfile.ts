import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

export function useUserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const ref = doc(db, "users", currentUser.uid);

    getDoc(ref).then(snapshot => {
      if (snapshot.exists()) {
        setUser(snapshot.data());
      }
    });
  }, []);

  return user;
}
