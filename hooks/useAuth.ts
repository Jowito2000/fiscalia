"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, loading };
}
