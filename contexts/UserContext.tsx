"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebaseClient";
import { doc, onSnapshot } from "firebase/firestore";
import { User } from "@/model/UserModel";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setUser(null);
        return;
      }

      const userRef = doc(db, "users", authUser.uid);

      const unsubFirestore = onSnapshot(userRef, (snapshot) => {
        setUser({
          id: authUser.uid,
          email: authUser.email!,
          name: snapshot.data()?.name,
          surname: snapshot.data()?.surname,
          userType: snapshot.data()?.userType
        });
      });

      return unsubFirestore;
    });

    return unsubAuth;
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
